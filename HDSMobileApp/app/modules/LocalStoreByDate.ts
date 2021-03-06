﻿/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */

import LocalStore = require("./LocalStore");

/** LocalStoreByDate namespace
 * persistent storage interface for small objects or data blobs
 * @see LocalStore
 * @author multiple (Assaf, Benjamin)
 * @since 2015-2-16
 */
class LocalStoreByDate implements UniqueStoreI {
    private static defaultInst: LocalStoreByDate = new LocalStoreByDate(LocalStore.getDefaultInst());

    private localStoreInst: LocalStoreI;
    private removeRatio: number = 0.3; // when the local store gets too full, remove one-third of the timestamp entries
    private removalAttemptCount: number = 0;


    constructor(localStoreInst: LocalStoreI) {
        this.localStoreInst = localStoreInst;
    }


    public getItem(key: string, plainString?: boolean) {
        return this.localStoreInst.getItem(key, plainString);
    }


    public hasItem(key: string) {
        return this.localStoreInst.hasItem(key);
    }


    /** Add a new item to this storage object.
     * If storage has run out of space, old timestamped items are deleted
     * @return the key used for the new item
     */
    public addItem(value, plainString?: boolean): string {
        // work around for the granularity of Date.now() and the rollover issue with performance.now()
        var key = LocalStoreByDate.uniqueTimestamp() + "";
        try {
            this.localStoreInst.setItem(key, value, plainString);
        } catch (err) {
            var start = window.performance.now();

            var removeCount = LocalStoreByDate.removeOldItems(this.localStoreInst, this.removeRatio);
            this.removalAttemptCount++;

            var end = window.performance.now();
            this.localStoreInst.setItem(LocalStoreByDate.uniqueTimestamp() + "",
                "removed " + removeCount + " local store entries in " + Math.round(end - start) + " ms, because local store threw error: '" + err.message + "': " + JSON.stringify(err.stack));
        }
        return key;
    }


    public removeItem(key: string) {
        this.localStoreInst.removeItem(key);
    }


    public getKeys() {
        return this.localStoreInst.getKeys();
    }


    /** Given a {@link LocalStoreI} with integer based keys (not all keys must be integers),
     * remove {@code removePercentage} percent of the smallest integer keys
     * @param {Number} removePercentage: a value in the range [0.0, 1.0] that specifies the percentage of timestamped values to remove
     * @param {LocalStoreI} localStore: the local storage to remove old timestamped items from
     * @param {Number} [minItemsRemoved=1]: the minimum number of items to remove
     * @param {Number} [maxItemsRemoved=(localStore keys where key is Integer).length]: the maximum number of items to remove,
     * this defaults to the total number of integer based keys in {@code localStore}
     * @return {Number} the number of items removed from the {@code localStore}
     */
    private static removeOldItems(localStore: LocalStoreI, removePercentage: number, minItemsRemoved: number = 1, maxItemsRemoved?: number): number {
        var timestamps: number[] = [];
        // get a list of integer keys from the local store
        var itemKeys = localStore.getKeys();
        for (var i = 0, size = itemKeys.length; i < size; i++) {
            var val = parseInt(itemKeys[i]);
            if ((typeof val === "number" && isFinite(val) && Math.floor(val) === val)) {
                timestamps.push(val);
            }
        }
        // sort ascending
        timestamps.sort(function (a, b) { return a - b; });

        var timestampCount = timestamps.length;
        maxItemsRemoved = maxItemsRemoved === void 0 ? timestampCount : Math.min(timestampCount, maxItemsRemoved);
        var removeCount = Math.max(Math.min(Math.round(timestampCount * removePercentage), maxItemsRemoved), minItemsRemoved);
        // remove the oldest timestamped entries (always remove between [1, timestamps.length] entries)
        for (var i = 0; i < removeCount; i++) {
            localStore.removeItem(timestamps[i].toString());
        }

        return removeCount;
    }


    static getDefaultInst() {
        return LocalStoreByDate.defaultInst;
    }


    static uniqueTimestamp(): number {
        return Math.round((Date.now() + window.performance.now()) / 2 * 1000);
    }


    // very rough test functionality
    static test() {
        var storeDated = LocalStoreByDate.getDefaultInst();
        var str = new Array(10001).join("0,"); // (20k chars => 40k bytes)
        var newKeys = [];

        var tmp = 0;
        var tmpLoops = 0;
        var loops = 3;
        // add as many items as possible until a cleanup occurs multiple times to see that cleanup ratio is working correctly
        for (var i = 0; i < loops; i++) {
            var initialAttemptCount = storeDated.removalAttemptCount;
            var addCount = 0;
            // keep inserting items until the store encounters an error adding more items and attempts to remove old items
            while (storeDated.removalAttemptCount === initialAttemptCount) {
                // loop, waiting until addItem() returns a new key to ensure each new key is a unique entry
                var newKey = storeDated.addItem(str, true);
                while (newKey === newKeys[newKeys.length - 1]) {
                    // waste time waiting for the next millisecond so that addItem() returns a new key
                    for (var ii = 0; ii < 10000000; ii++) {
                        tmp += (ii % 2) == 0 ? 1 : -1;
                    }
                    newKey = storeDated.addItem(str, true);
                    tmpLoops++;
                }
                newKeys.push(newKey);
                addCount++;
            }
            // once the store encounters an error, log how many items were added
            console.log("test " + (i + 1) + " of " + loops + ". added: " + addCount + " entries of size " + str.length + " (total: " + (addCount * str.length) + " chars)");
        }

        // cleanup
        var itemsRemoved = 0;
        for (var i = 0, size = newKeys.length; i < size; i++) {
            if (storeDated.hasItem(newKeys[i])) {
                storeDated.removeItem(newKeys[i]);
                itemsRemoved++;
            }
        }
        console.log("cleaned up: removed " + itemsRemoved + " total test items (tmp loops " + tmpLoops + ", tmp 0 == " + tmp + ")");
    }

}


export = LocalStoreByDate;
