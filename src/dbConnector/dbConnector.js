import { Client } from 'pg';

/**
 * Creates required tables and writes data to DB
 */
export default class DBConnector {
  constructor(config) {
    this._init();
    this._connectToDB();
    this._config = config;
  }

  _init() {
    this._createDatabase();
  }

  _connectToDB() {
    const client = new Client();
    this._client = await client.connect();
  }

  _createDatabase() {
    return this._performQuery(`CREATE DATABASE ${config.localDatabaseName}`);
  }  

  _createTypesTable() {
    return this._createTable('types', config.schema.types);
  }

  _createEquipmentTable() {  
    return this._createTable('equipment', config.schema.equipment);
  };

  _createTable(name, rows) {    
    const command = `CREATE TABLE IF NOT EXISTS ${name} (${rows.join(',')});`;
    return this._performQuery(command);
  }

/**
 * Writes data to table
 * @param {String} tableName table name
 * @param {Object} rows data to write to table
 * @returns {Array<Promise>} returns array of promises which will be resolved when data will be written
 */
  write(tableName, rows) {
    return Promise.all(rows.map(row => {
      const fields = Object.keys(row);
      const values = Object.values(row);
      const templatesString = fields.map((value, index) => '$' + index).join(',');
      const command = `INSERT INTO ${tableName}(${fields}) VALUES(${templatesString})`;
      return this._performQuery(command, values);
    }));    
  }

  _performQuery (command, values) {
    return new Promise((resolve, reject) => {
      client.query(command, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}