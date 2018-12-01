import DBConnector from './dbConnector';
import should from 'should';
import { Client } from 'pg';

const config = {
  localDatabaseName: 'unit-test-database',
  schema: {
    types: [
      'id INT',
      'name VARCHAR(20)',
      'warrantyPeriodId INT',
      'warrantyPeriodName VARCHAR(20)',
      'warrantyPeriod TIMESTAMP'
    ],
    equipment: [
      'id INT',
      'name VARCHAR(20)',
      'price INT',
      'type SMALLINT'
    ]
  }
};
const dbConnector = new DBConnector(config);

/**
 * DB connector
 */
describe('DB connector', () => {
  let client;

  beforeAll(async () => {
    await dbConnector.init();
    client = await (new Client()).connect();
  });

  /**
   * DB connector#write
   */
  it('should store data to DB', async done => {
    await dbConnector.write('types', [{
        "id": "1",
        "name": "Первый тип",
        "warrantyPeriodByWarrantyPeriod": {
            "id": "1",
            "name": "Очень быстро",
            "period": "2018-10-17T17:09:01"
        }
    }, {
        "id": "2",
        "name": "Второй тип",
        "warrantyPeriodByWarrantyPeriod": {
            "id": "2",
            "name": "Быстро",
            "period": "2018-10-17T17:09:01"
        }
    }]);

    const storedTypes = await new Promise((resolve, reject) => {
      client.query('SELECT * FROM types', values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    await dbConnector.write('equipment', [{
        "id": "10",
        "name": "AMD Ryzen™ Threadripper™",
        "price": "160692",
        "type": "7"
    }, {
        "id": "11",
        "name": "AMD Ryzen 7 1800X",
        "price": "636200",
        "type": "7"
    }, {
        "id": "12",
        "name": "Intel® Core i7",
        "price": "615623",
        "type": "1"
    }]);

    const storedEquipment = await new Promise((resolve, reject) => {
      client.query('SELECT * FROM equipment', values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
});