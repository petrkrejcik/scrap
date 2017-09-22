// const fs = require('fs');
const request = require('request');
// require('request-debug')(request);
const db = require('./lib/db');


const requestUrl = (options) => {
	return new Promise(function(resolve, reject) {
		request(options, (error, response, html) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(html);
			}
		});
	});
};
// var store = function() {
// 	console.log('storing');
// 	fs.writeFile('output.json', JSON.stringify(values, null, 4), function(err){
//      console.log('File successfully written! - Check your project directory for the output.json file');
//     })
// }

module.exports = {
	scrap: (options) => {
		return new Promise(function(resolve, reject) {
			requestUrl(options)
				.then(resolve)
				.catch(reject);
			return;
		});
	},
	// saveToCvs: (resultObject) => {
	// nazvy countries museji byt stejne pro mnozstvi muslimu v zemi
	// },
	db: db,
};