const pg = require('easy-pg');
const config = require('../config');

const db = function() {
	var client;
	client = pg(config.db);
	client.on('ready', function() {});
	client.on('end', function() {
		console.info('db disconnected');
	});
	client.on('error', function(error) {
		console.info('db error', error);
		process.exit(1);
	});
	return client;
};

module.exports = db();
