const config = {
  baseUrl: 'тестконнект.смородина.онлайн/challenges/be1',
  databases: [
    'db1',
    'db2'
  ],
  localDatabaseName: 'test',
  itemsCount: 10,
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

export default config;