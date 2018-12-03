"use strict";

import { Client } from 'pg';

/**
 * Creates required tables and writes data to DB
 */
export default class DBConnector {
  constructor(config) {
    this._config = config;        
  }

  async init() {
    this._client = await this._connectToDB();
    await this._createTypesTable();
    await this._createEquipmentTable();
  }

  _connectToDB() {
    const client = new Client();
    client.connect();
    return client;
  }

  async _createTypesTable() {
    await this._createTable('types', this._config.default.schema.types);
  }

  async _createEquipmentTable() {  
    await this._createTable('equipment', this._config.default.schema.equipment);
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
      this._client.query(command, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}