import TimeGetter from './timeGetter';
import should from 'should';

const timeGetter = new TimeGetter();

/**
 * Time getter
 */
describe('Time getter', () => {

  /**
   * Time getter#start
   */
  it('should start time interval and return intervalId', () => {
    const intervalId = timeGetter.start();
    should(typeof intervalId).be.exactly('string');
  });

  /**
   * Time getter#stop
   */
  it('should stop interval and return interval length', done => {
    const intervalId = timeGetter.start();
    setTimeout(() => {
      const length = timeGetter.stop(intervalId);
      should(typeof length).be.exactly('number');
      should(length > 5000).be.exactly(true);
    }, 5000);
  });
});