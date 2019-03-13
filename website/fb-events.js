const {scrap, db} = require('../scrapper');

const queryUrl = `https://www.facebook.com/events/discover/query`;
const defaultCursor = '';
const defaultPage = 1;

const getOptions = (cursor, page) => {
	return {
		url: queryUrl,
		headers: {
			referef: 'https://www.facebook.com/search/699206000188443/likers',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
		},
		form: {
			suggestion_token: JSON.stringify({
				city: '110589025635590',
				time: 'today',
			}),
			cursor: cursor,
			timezone_id: 1,
			__user: 0,
			__a: 1,
			__dyn: '7AzHJ4zamaWxd2umeCExUR1ycCzScBypbGAdyeGBXheCGgjK2a6ES2N6xCahUKFGV8kGdBCyEgCCGEtyK8GEjACkwy48G5uF98SmjBXDmEgF3e7EC4GDV8-fGcgLAKi6UKmih4-9AZ4zogxu9AyAUOESegO8hqwVBxiVojDBDAx6czobGxlu7-i4bh42u4EiUxaUGrxjDQ2aF5x67kmdwBDK9zoGq3h6x6WBBKunxJu9iThTGiumpiboytBvwxki2a8AAyXwBz9paCzu9wgUgUkBzVbQipeSi7oBljmeyV8V3kdz9eazErJ16qaJ0CyUSh3-amdAKmbDzAUnyEqHDAyEO48auGxi8x6V98lCDybAK8J6Jd7xWbx24V8BeEKUKucx5394iiAXybxSiUhGFEG8Dy9Ex1aA26AbxScAUIwjihbCAyUK4Upy8pF0',
			__req: 1,
			__be: 0,
			__pc: 'PHASED:DEFAULT',
			dpr: 1,
			__rev: 4773439,
			lsd: 'AVpaqKVJ',
			jazoest: 2708,
		},
	};
}

const getIds = (input) => {
	// var r = /raw_id&quot;:(\d+),/g;
	var r = /entity_id=(\d+)/g;
	let ids = [];
	while ((m = r.exec(input)) != null) {
	  ids.push(m[1]);
	}
	return ids;
};

const getCursor = (input) => {
	var r = /\[\{\"cursor\":\"(.+)\",\"page_number\"\:(\d+),/g;
	while ((m = r.exec(input)) != null) {
		return {
			nextCursor: m[1],
			nextPage: parseInt(m[2]),
		};
	}
};

const storeIds = (ids) => {
	let rows = ids.map((id) => {
		return {fb_id: id};
	});
	return new Promise((resolve, reject) => {
		console.info('storing...', rows);
		db.insert('fb_fans_ivcrnkladno', rows, (err, res) => {
			if (err) {
				console.info('store error:', err.error);
				reject(err);
				return;
			}
			let {id} = res[0];
			resolve(id);
		});
		return
	});
};

const filterEvents = (events) => {
	return events.filter(({description, location}) => {
		const desc = description.toLowerCase()
		if (desc.includes('dance')) return false
		if (desc.includes('kurz')) return false
		if (desc.includes('ezoter')) return false
		if (desc.includes('mejdan')) return false
		if (desc.includes('party')) return false
		if (desc.includes('přednáš')) return false
		if (desc.includes('rock')) return false
		if (desc.includes('seminář')) return false
		if (desc.includes('školení')) return false
		if (desc.includes('night')) return false
		if (desc.includes('mindful')) return false
		if (desc.includes('yoga')) return false
		if (desc.includes('joga')) return false
		if (desc.includes('jóg')) return false
		if (!location.includes('Praha')) return false
		return true
	})
}


const scroll = (cursor, page) => {
	// console.info(`scrapping ${page}...`);
	scrap(getOptions(cursor, page))
	.then((html) => {
		const json = JSON.parse(html.substring(9))
		const {events, hasNextPage, paginationCursor: nextCursor} = json.payload.results[0]
		const filtered = filterEvents(events)
		filtered.forEach(({title, description}) => {
			console.info('👉', title, ' - ', description.substring(0, 50))
		})
		// storeIds(getIds(html));
		if (!hasNextPage) {
			console.info('terminate');
			return;
		}
		setTimeout(scroll.bind(null, nextCursor, page + 1), 500);
	})
	.catch((err) => console.info('error', err));
};

scroll(defaultCursor, defaultPage);

