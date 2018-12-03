import DataFetcher from './dataFetcher/dataFetcher';
import DBConnector from './dbConnector/dbConnector';
import { uniquilize } from './utils/dataUniquilizer';
import TimeGetter from './timeGetter/timeGetter';
import config from './config';
import constants from './constants';
export default class Application {
  constructor() {
    this._dataFetcher = new DataFetcher(config);
    this._dbConnector = new DBConnector(config);
    this._timeGetter = new TimeGetter();
  }

  async start() {
    if (!this._environmentVariablesValid()) {
      console.log(`${constants.requiredEnvironmentVariables.join(',')} environment variables required. Terminating`);
      return;
    }
    await this._dbConnector.init();
    let types = await this._dataFetcher.getTypes();
    types = uniquilize(types);
    let equipment = await this._dataFetcher.getEquipment();
    equipment = uniquilize(equipment);
    this._dbConnector.write('types', types);
    this._dbConnector.write('equipment', equipment);
  }

  _environmentVariablesValid() {
    return constants.requiredEnvironmentVariables.every(constant => constant);
  }
}