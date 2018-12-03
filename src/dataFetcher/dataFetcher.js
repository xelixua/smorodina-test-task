"use strict";
require("babel-polyfill");

import fetch  from 'node-fetch';

/**
 * Fetches data from API
 */
export default class DataFetcher {
  constructor (config) {
    this._config = config;
  }

  /**
   * Makes request to get types
   * @returns {Promire<Array<Objet>} promises which with be resolved with request data
   */
  getTypes() {
    const requests = this._config.default.databases.map(database => this._fetchAllData('getTypes', database));
    return Promise.all(requests);
  }

  /**
   * Makes request to get equipment
   * @returns {Promire<Array<Objet>} promises which with be resolved with request data
   */
  getEquipment() {
    const requests = this._config.default.databases.map(database => this._fetchAllData('getEquipment', database));
    return Promise.all(requests);
  }

  async _fetchAllData(method, database) {
    let hasNextPage = true;
    let items = [];
    const opts = {
      method,
      first: this._config.default.itemsCount
    };
    while (hasNextPage) {
      let result = await this._fetch(opts, database);
      result = await result.json();
      items = items.concat(result.items);
      hasNextPage = result.hasNextPage;
      opts.after = result.lastItemCursor;      
    }

    return items;
  }
  
  _fetch(params, database) {
    const options = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    };

    params = Object.keys(params).reduce((url, param, index) => {
      if (index) {
        url += '&';
      } else {
        url += '?';
      }
      url += `${param}=${params[param]}`;
      return url;
    }, '');


    return fetch(`https://${this._config.default.baseUrl}/${database}/${params}`, options);
  }
}