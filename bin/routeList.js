const app = require('../app')
const listEndpoints = require('express-list-endpoints')
let Table = require('cli-table');

// instantiate
let table = new Table({
    head: ['METHOD', 'PATH', 'MIDDLEWARES'],
    colWidths: [25, 50, 50],
    rows: listEndpoints(app).map(v => [v.methods, v.path, v.middlewares])
});

console.log(table.toString());