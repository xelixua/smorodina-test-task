"use strict";

import uuidV4 from 'uuid/v4';
/**
 * Check time intervals
 */
export default class TimeGetter {
 constructor() {
   this._timestamps = {};
 }

 /**
  * Stores timestamp and returns it's idd
  * @returns {String} interval id
  */
 start() {
  const intervalId = uuidV4();
  this._timestamps[intervalId] = Date.now();
  return intervalId;
 }

 /**
  * Stops interval and returns its length
  * @param {String} watchId id of stopwatch
  * @returns {Number} interval length
  */
 stop(watchId) {
  const interval = Date.now() - this._timestamps[watchId];
  delete this._timestamps[watchId];
  return interval;
 }
}