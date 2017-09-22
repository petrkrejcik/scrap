const {scrap, db} = require('../scrapper');

const places = [
	'Dub letní u Pusté Polomi',
	'Okres Ostrava-město',
	'Důl Sviadnov',
	'Krásná (okres Frýdek-Místek)',
	'Lomná (přítok Lubiny)',
	'Letiště Leoše Janáčka Ostrava',
	'Hory (Valašská Bystřice)',
	'Janovice (Starý Jičín)',
	'Loučka (okres Vsetín)',
];

const getOptions = (place) => {
	return {
		url: 'https://cs.wikipedia.org/w/api.php',
		headers: {},
		qs: {
			action: 'query',
			format: 'json',
			list: 'geosearch',
			gspage: place,
			gsradius: 10000,
			// gslimit: 2
			gslimit: 'max',
		}
	};
};

const storePlace = (result) => {
	let row = {page_id: result.pageid};
	db.insert('wiki_near_beskydy', row, (err) => {
		if (err) {
			console.info('store error:', err.detail);
			return;
		}
	});
};

const getPlace = (place) => {
	return new Promise(function(resolve) {
		scrap(getOptions(place))
			.then((json) => {
				let result = JSON.parse(json);
				if (result.error) {
					console.info('Error not found - ', place);
					return resolve();
				}
				result.query.geosearch.forEach(storePlace);
				console.info('Loaded - ', place, ' - ', result.query.geosearch.length, 'x');
				resolve();
			})
			.catch((err) => console.info('error', err));
	});
};

places.reduce((promise, place) => {
	return promise.then(getPlace.bind(null, place));
}, Promise.resolve());

