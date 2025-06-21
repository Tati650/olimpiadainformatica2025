const path = require('path');
const { QueryFile } = require('pg-promise');


function sql(file) {
  const fullPath = path.join(__dirname, '../consultas', file);
  return new QueryFile(fullPath, { minify: true });
}

module.exports = sql;