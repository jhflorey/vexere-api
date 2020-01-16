const { pathStations, pathStationsId, definitionStation, definitionStations } = require('./stations');

const keys = require('../../config/index');

module.exports = {
  swagger: '2.0',
  host: keys.host,
  basePath: '/api',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/stations': pathStations,
    '/stations/{staionId}': pathStationsId
  },
  definitions: {
    Station: definitionStation,
    Stations: definitionStations
  }
}