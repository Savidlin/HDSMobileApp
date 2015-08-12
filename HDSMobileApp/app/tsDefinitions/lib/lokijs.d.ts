// TypeScript definitions for LokiJS 1.1.x (as of 2015-2-3)
// Project: http://lokijs.org/ (source code: https://github.com/techfort/LokiJS)

/**
 * LokiJS
 * @author Joe Minichino <joe.minichino@gmail.com>
 *
 * A lightweight document oriented javascript database
 */
 
/*
ltHelper(prop1, prop2, equal) => boolean;
gtHelper(prop1, prop2, equal) => boolean;
sortHelper(prop1, prop2, desc) => -1/0/1;

var fs = (typeof exports === 'object') ? require('fs') : false;

function clone(data, method) {
    var cloned = JSON.parse(JSON.stringify(data));
    return cloned;
}

function localStorageAvailable() {
    return ('localStorage' in window && window['localStorage'] !== null);
    return false;
}
*/


/** Loki: The main database class
 * @constructor
 * @param {string} filename - name of the file to be saved to
 * @param {object} options - config object
 */
interface Loki {
    collections: Collection<any>[];
    // db class is an EventEmitter
    prototype: LokiEventEmitter;

    // persistenceMethod: 'fs', 'localStorage', 'adapter'
    new (filename: string, options?: { env?: string; persistenceMethod?: string;
        adapter?: { loadDatabase: (fileName: string, func: (dbString: string) => void) => void; saveDatabase: (fileName: string, content: string, func: () => void) => void } }): Loki;

    /** configureOptions - allows reconfiguring database options
     * @param {object} options - configuration options to apply to loki db object
     * @param {boolean} initialConfig - (optional) if this is a reconfig, don't pass this
     */
    configureOptions(options: {
        env?: string; persistenceMethod?: string;
        adapter?: { loadDatabase: (fileName: string, func: (dbString: string) => void) => void; saveDatabase: (fileName: string, content: string, func: () => void) => void };
        autoload: any;
        autoloadCallback: (err: Error | string, data: any) => void;
        autosave: boolean;
        autosaveInterval: number
    }, initialConfig?: boolean): void;

    /** anonym() - shorthand method for quickly creating and populating an anonymous collection.
     *    This collection is not referenced internally so upon losing scope it will be garbage collected.
     *    Example : var results = new loki().anonym(myDocArray).find({'age': {'$gt': 30} });
     * @param {Array} docs - document array to initialize the anonymous collection with
     * @param {Array} indexesArray - (Optional) array of property names to index
     * @returns {Collection} New collection which you can query or chain
     */
    anonym(docs: any[], indexesArray?: { indices?: string[]; clone?: boolean; transactional?: boolean;
		asyncListeners?: boolean; disableChangesApi?: boolean }[]): Collection<any>;

    addCollection(name: string, options?: { indices?: string[]; clone?: boolean; transactional?: boolean;
		asyncListeners?: boolean; disableChangesApi?: boolean } ): Collection<any>;

    loadCollection(collection: Collection<any>): void;

    getCollection(collectionName: string): Collection<any>;

    listCollections(): { name: string; type: string; count: number }[];

    removeCollection(collectionName: string): void;

    getName(): string;

    /** serializeReplacer - used to prevent certain properties from being serialized (see 'replacer' function from JSON.stringify(value[, replacer [, string]])
     */
    serializeReplacer<T>(key, value: T): T;

    // toJson
    serialize(): string;
    // alias of serialize
    toJson(): string;

    /** loadJSON - inflates a loki database from a serialized JSON string
     * @param {string} serializedDb - a serialized loki database string
     * @param {object} options - apply or override collection level settings
     */
    loadJSON(serializedDb: string, options: { [index: string]: { inflate?: any/*loader(coll.data[j], obj);*/; proto?: any/*new(options[coll.name]['proto'])()*/ } });

    /** close(callback) - emits the close event with an optional callback. Does not actually destroy the db
     * but useful from an API perspective
     */
    close(callback: (...args) => void);

    /**---------------------+
    | Changes API           |
    +----------------------*/

    /** generateChangesNotification() - takes all the changes stored in each
     * collection and creates a single array for the entire database. If an array of names
     * of collections is passed then only the included collections will be tracked.
     * @param {array} optional array of collection names. No arg means all collections are processed.
     * @returns {array} array of changes
     * @see private method createChange() in Collection
     */
    generateChangesNotification(arrayOfCollectionNames?: string[]): { name: string; operation: string; obj: any/*?*/ }[];

    /** serializeChanges() - stringify changes for network transmission
     * @returns {string} string representation of the changes
     */
    serializeChanges(collectionNamesArray?: string[]): string;

    /** clearChanges() - clears all the changes in all collections.
     */
    clearChanges(): void;

    /**-----------------+
    | PERSISTENCE       |
    -------------------*/

    /** loadDatabase - Handles loading from file system, local storage, or adapter (indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     * @param {object} options - not currently used (remove or allow overrides?)
     * @param {function} callback - (Optional) user supplied async callback / error handler
     */
    loadDatabase(options, callback?: (err: Error | string, data) => void);

    /** saveDatabase - Handles saving to file system, local storage, or adapter (indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     * @param {object} options - not currently used (remove or allow overrides?)
     * @param {function} callback - (Optional) user supplied async callback / error handler
     */
    saveDatabase(callback?: (err: Error) => void);
    // alias
    save(callback?: (err: Error) => void);

    /** autosaveDirty - check whether any collections are 'dirty' meaning we need to save (entire) database
     * @returns {boolean} - true if database has changed since last autosave, false if not.
     */
    autosaveDirty(): boolean;

    /** autosaveClearFlags - resets dirty flags on all collections.
     *    Called from saveDatabase() after db is saved.
     */
    autosaveClearFlags();

    /** autosaveEnable - begin a javascript interval to periodically save the database.
     */
    autosaveEnable();

    /** autosaveDisable - stop the autosave interval timer.
     */
    autosaveDisable();

}
// end Loki interface




/** LokiEventEmitter is a minimalist version of EventEmitter. It enables any
 * constructor that inherits EventEmitter to emit events and trigger
 * listeners that have been added to the event through the on(event, callback) method
 * @constructor
 */
interface LokiEventEmitter {

    new (): LokiEventEmitter;

    /** @prop Events property is a hashmap, with each property being an array of callbacks
     */
    events: {};

    /** @prop asyncListeners - boolean determines whether or not the callbacks associated with each event
     * should happen in an async fashion or not
     * Default is false, which means events are synchronous
     */
    asyncListeners: boolean;

    /** @prop on(eventName, listener) - adds a listener to the queue of callbacks associated to an event
     * @returns {int} the index of the callback in the array of listeners for a particular event
     */
    on(eventName: string, listener: (...args) => void): number;

    /** @propt emit(eventName, varargs) - emits a particular event
     * with the option of passing optional parameters which are going to be processed by the callback
     * provided signatures match (i.e. if passing emit(event, arg0, arg1) the listener should take two parameters)
     * @param {string} eventName - the name of the event
     * @param {object} varargs - optional objects passed with the event
     */
    emit(eventName: string, ...varargs): void;

    /** @prop remove() - removes the listener at position 'index' from the event 'eventName'
     */
    removeListener(eventName: string, index: number): void;

}
// end interface LokiEventEmitter


interface LokiOps {
    $eq: (a, b) => boolean;
    $gt: (a, b) => boolean;
    $gte: (a, b) => boolean;
    $lt: (a, b) => boolean;
    $lte: (a, b) => boolean;
    $ne: (a, b) => boolean;
    $regex: (a, b) => boolean;
    $in: (a, b) => boolean;
    $contains: (a, b) => boolean;
}


/** Resultset class allowing chainable queries.  Intended to be instanced internally.
 *    Collection.find(), Collection.where(), and Collection.chain() instantiate this.
 *    Example:
 *    mycollection.chain().find({ 'doors' : 4 }).where(function(obj) { return obj.name === 'Toyota' }).data();
 * @constructor
 * @param {Collection} collection - The collection which this Resultset will query against.
 * @param {string} queryObj - Optional mongo-style query object to initialize resultset with.
 * @param {function} queryFunc - Optional javascript filter function to initialize resultset with.
 * @param {bool} firstOnly - Optional boolean used by collection.findOne().
 */
interface Resultset<E> {

    new (collection: Collection<E>, queryObj, queryFunc: (doc: E) => boolean, firstOnly?: boolean/* = false*/): Resultset<E>;

    /** toJSON() - Override of toJSON to avoid circular references
     */
    toJSON(): Resultset<E>;

    /** limit() - Allows you to limit the number of documents passed to next chain operation.
     *    A resultset copy() is made to avoid altering original resultset.
     * @param {int} qty - The number of documents to return.
     * @returns {Resultset} Returns a copy of the resultset, limited by qty, for subsequent chain ops.
     */
    limit(qty: number): Resultset<E>;

    /** offset() - Used for skipping 'pos' number of documents in the resultset.
     * @param {int} pos - Number of documents to skip; all preceding documents are filtered out.
     * @returns {Resultset} Returns a copy of the resultset, containing docs starting at 'pos' for subsequent chain ops.
     */
    offset(pos: number): Resultset<E>;

    /** copy() - To support reuse of resultset in branched query situations.
     * @returns {Resultset} Returns a copy of the resultset (set) but the underlying document references will be the same.
     */
    copy(): Resultset<E>;
    // add branch() as alias of copy()
    branch(): Resultset<E>;

    /** sort() - User supplied compare function is provided two documents to compare. (chainable)
     *    Example:
     *    rslt.sort(function(obj1, obj2) {
     *      if (obj1.name === obj2.name) return 0;
     *      if (obj1.name > obj2.name) return 1;
     *      if (obj1.name < obj2.name) return -1;
     *    });
     * @param {function} comparefun - A javascript compare function used for sorting.
     * @returns {Resultset} Reference to this resultset, sorted, for future chain operations.
     */
    sort(comparefun: (a: E, b: E) => number): Resultset<E>;

    /** simplesort() - Simpler, loose evaluation for user to sort based on a property name. (chainable)
     * @param {string} propname - name of property to sort by.
     * @param {bool} isdesc - (Optional) If true, the property will be sorted in descending order
     * @returns {Resultset} Reference to this resultset, sorted, for future chain operations.
     */
    simplesort(propname: string, isdesc?: boolean/* = false*/): Resultset<E>;

    /** compoundeval() - helper method for compoundsort(), performing individual object comparisons
     * @param {array} properties - array of property names, in order, by which to evaluate sort order
     * @param {object} obj1 - first object to compare
     * @param {object} obj2 - second object to compare
     * @returns {integer} 0, -1, or 1 to designate if identical (sortwise) or which should be first
     */
    compoundeval(properties: any[]/*string | [isdesc: boolean, firstProp: string]*/, obj1, obj2): number;

    /** compoundsort() - Allows sorting a resultset based on multiple columns.
     *    Example : rs.compoundsort(['age', 'name']); to sort by age and then name (both ascending)
     *    Example : rs.compoundsort(['age', ['name', true]); to sort by age (ascending) and then by name (descending)
     * @param {array} properties - array of property names or subarray of [propertyname, isdesc] used evaluate sort order
     * @returns {Resultset} Reference to this resultset, sorted, for future chain operations.
     */
    compoundsort(properties: string |[boolean/*isdesc*/, string/*firstProp*/]): Resultset<E>;

    /** calculateRange() - Binary Search utility method to find range/segment of values matching criteria.
     *    this is used for collection.find() and first find filter of resultset/dynview
     *    slightly different than get() binary search in that get() hones in on 1 value,
     *    but we have to hone in on many (range)
     * @param {string} op - operation, such as $eq (currently supported Feb, 2015): '$eq', '$gt', '$gte', '$lt', '$lte'
     * @param {string} prop - name of property to calculate range for
     * @param {object} val - value to use for range calculation.
     * @returns {array} [start, end] index array positions
     */
    calculateRange(op: "$eq", prop: string, val: any): [number/*start*/, number/*end*/];
    calculateRange(op: "$gt", prop: string, val: any): [number/*start*/, number/*end*/];
    calculateRange(op: "$gte", prop: string, val: any): [number/*start*/, number/*end*/];
    calculateRange(op: "$lt", prop: string, val: any): [number/*start*/, number/*end*/];
    calculateRange(op: "$lte", prop: string, val: any): [number/*start*/, number/*end*/];
    calculateRange(op: string, prop: string, val: any): [number/*start*/, number/*end*/];


    /** findOr() - oversee the operation of OR'ed query expressions.
     *    OR'ed expression evaluation runs each expression individually against the full collection,
     *    and finally does a set OR on each expression's results.
     *    Each evaluation can utilize a binary index to prevent multiple linear array scans.
     * @param {array} expressionArray - array of expressions
     * @returns {Resultset} this resultset for further chain ops.
     */
    findOr(expressionArray: any[]): Resultset<E>;

    /** findAnd() - oversee the operation of AND'ed query expressions.
     *    AND'ed expression evaluation runs each expression progressively against the full collection,
     *    internally utilizing existing chained resultset functionality.
     *    Only the first filter can utilize a binary index.
     * @param {array} expressionArray - array of expressions
     * @returns {Resultset} this resultset for further chain ops.
     */
    findAnd(expressionArray: any[]): Resultset<E>;

    /** find() - Used for querying via a mongo-style query object.
     * @param {object} query - A mongo-style query object used for filtering current results.
     * @param {boolean} firstOnly - (Optional) Used by collection.findOne()
     * @returns {Resultset} this resultset for further chain ops.
     */
    find(query?, firstOnly?: boolean/* = false*/): Resultset<E>;

    /** where() - Used for filtering via a javascript filter function.
     * @param {function} filterFunc - A javascript function used for filtering current results by.
     * @returns {Resultset} this resultset for further chain ops.
     */
    where(filterFunc: (doc: E) => boolean): Resultset<E>;

    /** data() - Terminates the chain and returns array of filtered documents
     * @returns {array} Array of documents in the resultset
     */
    data(): E[];

    /** update() - used to run an update operation on all documents currently in the resultset.
     * @param {function} updateFunction - User supplied updateFunction(obj) will be executed for each document object.
     * @returns {Resultset} this resultset for further chain ops.
     */
    update(updateFunction: (doc: E) => void): Resultset<E>;

    /** remove() - removes all document objects which are currently in resultset from collection (as well as resultset)
     * @returns {Resultset} this (empty) resultset for further chain ops.
     */
    remove(): Resultset<E>;

    /** mapReduce() - data transformation via user supplied functions
     * @param {function} mapFunction - this function accepts a single document for you to transform and return
     * @param {function} reduceFunction - this function accepts many (array of map outputs) and returns single value
     * @returns The output of your reduceFunction
     */
	mapReduce<T, U>(mapFunction: (currentValue: E, index: number, array: E[]) => T,
		reduceFunction: (ary: T[]) => U): U;

}
// end interface Resultset


/** DynamicView class is a versatile 'live' view class which can have filters and sorts applied.
 *    Collection.addDynamicView(name) instantiates this DynamicView object and notifies it
 *    whenever documents are add/updated/removed so it can remain up-to-date. (chainable)
 *  Examples:
 *    var mydv = mycollection.addDynamicView('test');  // default is non-persistent
 *    mydv.applyWhere(function(obj) { return obj.name === 'Toyota'; });
 *    mydv.applyFind({ 'doors' : 4 });
 *    var results = mydv.data();
 */
interface DynamicView<E> {
    prototype: LokiEventEmitter;

	/**
	 * @constructor
     * @param {Collection} collection - A reference to the collection to work against
     * @param {string} name - The name of this dynamic view
     * @param {boolean} persistent - (Optional) If true, the results will be copied into an internal array for read efficiency or binding to.
	 */
    new (collection: Collection<E>, name: string, persistent?: boolean): DynamicView<E>;

    /** rematerialize() - intended for use immediately after deserialization (loading)
     *    This will clear out and reapply filterPipeline ops, recreating the view.
     *    Since where filters do not persist correctly, this method allows
     *    restoring the view to state where user can re-apply those where filters.
     * @param {Object} options - (Optional) allows specification of 'removeWhereFilters' option
     * @returns {DynamicView} This dynamic view for further chained ops.
     */
    rematerialize(options?: { removeWhereFilters?: any }): DynamicView<E>;

    /** branchResultset() - Makes a copy of the internal resultset for branched queries.
     *    Unlike this dynamic view, the branched resultset will not be 'live' updated,
     *    so your branched query should be immediately resolved and not held for future evaluation.
     * @returns {Resultset} A copy of the internal resultset for branched queries.
     */
    branchResultset(): Resultset<E>;

    /** toJSON() - Override of toJSON to avoid circular references
     */
    toJSON(): DynamicView<E>;

    /** applySort() - Used to apply a sort to the dynamic view
     * @param {function} comparefun - a javascript compare function used for sorting
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    applySort(comparefun: (a: E, b: E) => boolean): DynamicView<E>;

    /** applySimpleSort() - Used to specify a property used for view translation.
     * @param {string} propname - Name of property by which to sort.
     * @param {boolean} isdesc - (Optional) If true, the sort will be in descending order.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    applySimpleSort(propname: string, isdesc?: boolean/* = false*/): DynamicView<E>;

    /** applySortCriteria() - Allows sorting a resultset based on multiple columns.
     *    Example : dv.applySortCriteria(['age', 'name']); to sort by age and then name (both ascending)
     *    Example : dv.applySortCriteria(['age', ['name', true]); to sort by age (ascending) and then by name (descending)
     *    Example : dv.applySortCriteria(['age', true], ['name', true]); to sort by age (descending) and then by name (descending)
     * @param {array} properties - array of property names or subarray of [propertyname, isdesc] used evaluate sort order
     * @returns {DynamicView} Reference to this DynamicView, sorted, for future chain operations.
     */
    applySortCriteria(criteria: any[]): DynamicView<E>;

    /** startTransaction() - marks the beginning of a transaction.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    startTransaction(): DynamicView<E>;

    /** commit() - commits a transaction.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    commit(): DynamicView<E>;

    /** rollback() - rolls back a transaction.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    rollback(): DynamicView<E>;

    /** applyFind() - Adds a mongo-style query option to the DynamicView filter pipeline
     * @param {object} query - A mongo-style query object to apply to pipeline
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    applyFind(query: any): DynamicView<E>;

    /** applyWhere() - Adds a javascript filter function to the DynamicView filter pipeline
     * @param {function} filterFunc - A javascript filter function to apply to pipeline
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    applyWhere(filterFunc: (doc: E) => boolean): DynamicView<E>;

    /** data() - resolves and pending filtering and sorting, then returns document array as result.
     * @returns {array} An array of documents representing the current DynamicView contents.
     */
    data(): E[];

    /** evaluateDocument() - internal method for (re)evaluating document inclusion.
     *    Called by : collection.insert() and collection.update().
     * @param {int} objIndex - index of document to (re)run through filter pipeline.
     */
    evaluateDocument(objIndex: number): void;

    /** removeDocument() - internal function called on collection.delete()
     */
    removeDocument(objIndex: number): void;

    /** mapReduce() - data transformation via user supplied functions
     * @param {function} mapFunction - this function accepts a single document for you to transform and return
     * @param {function} reduceFunction - this function accepts many (array of map outputs) and returns single value
     * @returns The output of your reduceFunction
     */
    mapReduce<T, U>(mapFunction: (currentValue: E, index: number, array: E[]) => T,
		reduceFunction: (ary: T[]) => U): U;
}
// end interface DynamicView




/** Collection class that handles documents of same type
 * @constructor
 * @param {stirng} collection name
 * @param {array} array of property names to be indicized
 * @param {object} configuration object
 */
interface Collection<E> {
    name: string;
    data: E[];
    objType: string;
    dirty: boolean;
    // custom
    isDirty: boolean;

    prototype: LokiEventEmitter;

    new (name: string, options?: { indices?: string[]; clone?: boolean; transactional?: boolean;
		asyncListeners?: boolean; disableChangesApi?: boolean } ): Collection<E>;

    //getChanges(): { name: string; operation: string; obj: E/*?*/ }[];

    /**----------------------+
    | INDEXING               |
    +-----------------------*/

    /** Ensure binary index on a certain field
     */
    ensureIndex(property: string, force?: boolean): void;

    /** Ensure all binary indices
     */
    ensureAllIndexes(force?: boolean): void;

    flagBinaryIndexesDirty(): void;

    /** Rebuild idIndex
     */
    ensureId(): void;

    /** Rebuild idIndex async with callback - useful for background syncing with a remote server
     */
    ensureIdAsync(callback: () => void): void;

    /** Each collection maintains a list of DynamicViews associated with it
     */
    addDynamicView(name: string, persistent: boolean): DynamicView<E>;

    removeDynamicView(name: string): void;

    getDynamicView(name: string): DynamicView<E>;

    /** find and update: pass a filtering function to select elements to be updated
     * and apply the updatefunction to those elements iteratively
     */
    findAndUpdate(filterFunction: (obj: E) => boolean, updateFunction: (obj: E) => E): void;

    /** generate document method - ensure objects have id and objType properties
     * Come to think of it, really unfortunate name because of what document normally refers to in js.
     * that's why there's an alias below but until I have this implemented
     * @param {object} the document to be inserted (or an array of objects)
     * @returns document or documents (if array)
     */
    insert(doc: E): E;
    insert(doc: E[]): E;

    clear(): void;

    /** Update method
     */
    update(doc: E);

    /** Add object to collection
     */
    add(doc: E): E;

    /**
     * @param {Object} [query]: optional mongo style query object
     */
    removeWhere(query: (value: E) => boolean): void;
    removeWhere(query?): void;

    /** delete wrapped
     */
    remove(doc: number): void;
    remove(doc: number[]): void;
    remove(doc: E): void;
    remove(doc: E[]): void;


    /**--------------------+
    | Finding methods      |
    +---------------------*/

    /** Get by Id - faster than other methods because of the searching algorithm
     */
    get(id: string, returnPosition: boolean): E;
    get(id: number, returnPosition: boolean): E;
    get(id: string, returnPosition: boolean): [E, number];
    get(id: number, returnPosition: boolean): [E, number];

    /** Find one object by index property, by property equal to value
     * @param {Object} [query]: optional mongo style query object
     */
    findOne(query?): Resultset<E>;

    /** Chain method, used for beginning a series of chained find() and/or view() operations
     * on a collection.
     */
    chain(): Resultset<E>;

    /** Find method, api is similar to mongodb except for now it only supports one search parameter.
     * for more complex queries use view() and storeView()
     * @param {Object} [query]: optional mongo style query object
     */
    find(query?): Resultset<E>;

    /** Find object by unindexed field by property equal to value,
     * simply iterates and returns the first element matching the query
     */
    findOneUnindexed(prop: string, value: any): E;

    /** Transaction methods */

    /** start the transation */
    startTransaction(): void;

    /** commit the transation */
    commit(): void;

    /** roll back the transation */
    rollback(): void;

    // async executor. This is only to enable callbacks at the end of the execution.
    async(fun: () => void, callback: () => void): void;

    /** Create view function - filter
     */
    where(funcFilter: (obj) => boolean): Resultset<E>;

    /** Map Reduce
     */
    mapReduce(mapFunction: (value: any, index: number, array: any[]) => any, reduceFunction: (previousValue: any, currentValue: any, index: number, array: any[]) => any): any;

    no_op(): void;

}
// end interface Collection


declare var LokiConstructor: {
    new (filename: string, options?: { env?: string; persistenceMethod?: string;
        adapter?: { loadDatabase: (fileName: string, func: (dbString: string) => void) => void; saveDatabase: (fileName: string, content: string, func: () => void) => void } }): Loki;
}


declare module "lokijs" {
    export = LokiConstructor;
}
