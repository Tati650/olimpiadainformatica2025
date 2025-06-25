const path = require('path');
const { QueryFile } = require('pg-promise');


function sql(file) {
  const fullPath = path.join(__dirname, '../models', file);
  return new QueryFile(fullPath, { minify: true });

  if (query.error) {
    console.error('Error en archivo SQL:', query.error);
  }
}

module.exports = sql;