// TypeScript definitions for LokiJS' lokiIndexedAdapter 1.1.x (as of 2015-2-3)
// Project: http://lokijs.org/ (source code: https://github.com/techfort/LokiJS)

/** IndexedAdapter - Loki persistence adapter class for indexedDb.
 *    This class fulfills abstract adapter interface which can be applied to other storage methods
 *    Utilizes the included LokiCatalog app/key/value database for actual database persistence.
 * @param {string} appname - Application name context can be used to distinguish subdomains or just 'loki'
 */
interface IndexedAdapter {
    /*private app: string; // = 'loki';*/
    /*private catalog: LokiCatalog; */

    new (appname: string): IndexedAdapter;

    /** checkAvailability - used to check if adapter is available
     * @returns {boolean} true if indexeddb is available, false if not.
     */
    checkAvailability(): boolean;

    /** loadDatabase() - Retrieves a serialized db string from the catalog.
     * @param {string} dbname - the name of the database to retrieve.
     * @param {function} callback - callback should accept string param containing serialized db string.
     */
    loadDatabase(dbname: string, callback: (val: any) => void);
    // alias
    loadKey(dbname: string, callback: (val: any) => void);

    /** saveDatabase() - Saves a serialized db to the catalog.
     * @param {string} dbname - the name to give the serialized database within the catalog.
     * @param {string} dbstring - the serialized db string to save.
     * @param {function} callback - (Optional) callback passed obj.success with true or false
     */
    saveDatabase(dbname: string, dbstring: string, callback: (res: { success: boolean }) => void);
    // alias
    saveKey(dbname: string, dbstring: string, callback: (res: { success: boolean }) => void);

    /** deleteDatabase() - Deletes a serialized db from the catalog.
     * @param {string} dbname - the name of the database to delete from the catalog.
     */
    deleteDatabase(dbname: string);
    // alias
    deleteKey(dbname: string);

    /** getDatabaseList() - Retrieves object array of catalog entries for current app.
     * @param {function} callback - should accept array of database names in the catalog for current app.
     */
    getDatabaseList(callback: (names: string[]) => void): void;
    // alias
    getKeyList(callback: (names: string[]) => void): void;

    /** getCatalogSummary - allows retrieval of list of all keys in catalog along with size
     * @param {function} callback - (Optional) callback to accept result array.
     */
    getCatalogSummary(callback: (res: { app: string; key: string; size: number }[]) => void): void;

} // end IndexedAdapter


/** LokiCatalog - underlying App/Key/Value catalog persistence
 *    This non-interface class implements the actual persistence.
 *    Used by the IndexedAdapter class.
 */
interface LokiCatalog {
    db: IDBDatabase /* from IndexedDb */;

    new (callback: (arg: LokiCatalog) => void): LokiCatalog;

    initializeLokiCatalog(callback: (arg: LokiCatalog) => void): void;

    getAppKey(app: string, key: string, callback: (res: { id: number; val?: any; success?: boolean }) => void);

    getAppKeyById<T>(id: string, callback: (result: any, data: T) => void, data: T): void;

    setAppKey(app: string, key: string, val, callback: (res: { success: boolean }) => void);

    deleteAppKey(id: string, callback: (res: { success?: boolean }) => void);

	/**
	 * @param app value passed to IndexedDb {@link IDBKeyRange#only()}
	 */
    getAppKeys(app, callback: (data: any[]) => void): void;

    // Hide 'cursoring' and return array of { id: id, key: key }
    getAllKeys(callback: (data: any[]) => void): void;
}


// global adapter - returned at end as IndexedAdapter constructor
declare var lokiIndexedAdapter: {
    new (appname: string): IndexedAdapter;
}


declare module "lokiIndexedAdapter" {
    export = lokiIndexedAdapter;
}
