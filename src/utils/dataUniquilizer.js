"use strict";

const uniquilize = function (results) {
  const allValues = {};
  results.forEach(dbValues => {
    dbValues.forEach(value => {
      allValues[value.id] = value;
    })
  });

  return Object.values(allValues);
}

export default { uniquilize };