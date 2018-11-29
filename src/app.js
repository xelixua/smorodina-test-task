import DataFetcher from './dataFetcher/dataFetcher';
import DBConnector from './dbConnector/dbConnector';
import { uniquilize } from './utils/dataUniquilizer';
import TimeGetter from './timeGetter/timeGetter';
import config from './config';
export default class Application {
  constructor() {
    this._dataFetcher = new DataFetcher(config);
    this._dbConnector = new DBConnector(config);
    this._timeGetter = new TimeGetter();
  }

  start() {
    let types = this._dataFetcher.getTypes();
    types = uniquilize(types);
    let equipment = this._dataFetcher.getEquipment();
    equipment = uniquilize(equipment);
    this._dbConnector.write('types', types);
    this._dbConnector.write('equipment', equipment);
  }
}