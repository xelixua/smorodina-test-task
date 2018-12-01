import DataFetcher from './dataFetcher';
import should from 'should';

const config = {
  baseUrl: 'тестконнект.смородина.онлайн/challenges/be1',
  databases: [
    'db1',
    'db2'
  ],
  localDatabaseName: 'test',
  itemsCount: 10
};
const dataFetcher = new DataFetcher(config);

/**
 * DataFetcher
 */
describe('Data fetcher', () => {

  /**
   * DataFetcher#getTypes
   */  
  it('should get types', async () => {
    const types = await dataFetcher.getTypes();
    console.log('types', types);
    types.should.be.instanceof(Array);
    types.length.should.not.equal(0);

    const sample = types[1];
    should.exist(sample.id);
    should(typeof sample.id === 'string').be.exactly(true);
    sample.name.should.exist();
    should(typeof sample.name === 'string').be.exactly(true);
    should.exist(sample.warrantyPeriodByWarrantyPeriod);
    should(typeof sample.warrantyPeriodByWarrantyPeriod === 'object').be.exactly(true);
    should.exist(sample.warrantyPeriodByWarrantyPeriod.id);
    should(typeof sample.warrantyPeriodByWarrantyPeriod.id === 'string').be.exactly(true);
    should.exist(sample.warrantyPeriodByWarrantyPeriod.name);
    should(typeof sample.warrantyPeriodByWarrantyPeriod.name === 'string').be.exactly(true);
    should.exist(sample.warrantyPeriodByWarrantyPeriod.period);
    should(typeof sample.warrantyPeriodByWarrantyPeriod.period === 'string').be.exactly(true);
  });

  /**
   * DataFetcher#getEquipment
   */
  it('should get equipment', async () => {
    const equipment = await dataFetcher.getEquipment();
    console.log('equipment', equipment);
    equipment.should.be.instanceof(Array);
    equipment.length.should.not.equal(0);

    const sample = equipment[0];    
    should.exist(sample.id);
    should(typeof sample.id === 'string').be.exactly(true);
    should.exist(sample.name);
    should(typeof sample.name === 'string').be.exactly(true);
    should.exist(sample.price);
    should(typeof sample.price === 'string').be.exactly(true);
    should.exist(sample.type);
    should(typeof sample.type === 'string').be.exactly(true);
  });
});