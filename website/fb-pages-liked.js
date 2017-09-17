// prvni request, kterej vrati cursor
// scroll request


const {scrap, db} = require('../scrapper');

const defaultCursor = "AbrcdYxmwO7zdvXU4CIo7v8YwfQ-eojJKoaMeH5OctIc5MS9YslQ9znOUf3zEpxxkrEmb__nAdgxT-ocNsQJtzdkLT7HjNhlgWcXsZQUcjUJ5T6ShKpQhYhe-x6Dst04C1vWOyTQyKAiNLD0nXilJ2_EvzPz-umsoJhBNdwrSlQD0S1759fZPtxzrtOiRQaouJElGZkchAvIHhxN3YOshtBU8n6Y9LtZo4Sd3PrvH3DdNwJEWzao-iCY9v-JgnSZCSIaAHNI9X8GbdmGOxf0M0bXhKKjFwjNHEXitPPDht7uQIIYYNEhM-SOD08REyTxkau2ZOC3ZFaiX3meWcpeYOK2sNnL3cQG80HJybuKKoMDrMSOTrLYdH6r1rfugskBNhYwHAOhY8-gA-AaUbdzA6qy";
const defaultPage = 2;

const getOptions = (cursor, page) => {
	return {
		url: 'https://www.facebook.com/ajax/pagelet/generic.php/BrowseScrollingSetPagelet',
		// url: originalUrlWithoutUser,
		headers: {
			referef: 'https://www.facebook.com/search/699206000188443/pages-liked',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
		},
		qs: {
			__a: 1,
			data: JSON.stringify({
				"view":"list","encoded_query":"{\"bqf\":\"pages-liked(536133109)\",\"browse_sid\":null,\"vertical\":\"none\",\"post_search_vertical\":null,\"intent_data\":null,\"filters\":[],\"has_chrono_sort\":false,\"query_analysis\":null,\"subrequest_disabled\":false,\"token_role\":\"NONE\",\"preloaded_story_ids\":[],\"extra_data\":null,\"disable_main_browse_unicorn\":false,\"entry_point_scope\":null,\"entry_point_surface\":null,\"squashed_ent_ids\":[]}",
				"encoded_title":"WyJQYWdlcytsaWtlZCtieSsiLHsidGV4dCI6Ik1pY2hhbCtLYVx1MDAyNUM1XHUwMDI1QTFwXHUwMDI1QzNcdTAwMjVBMXJlayIsInVpZCI6NTM2MTMzMTA5LCJ0eXBlIjoidXNlciJ9XQ","ref":"see_more","logger_source":"www_main","typeahead_sid":"0.8334816192995576","tl_log":false,"impression_id":"c7dd71b6","filter_ids":{"453323164845130":453323164845130,"1700037180282876":1700037180282876,"246235652414705":246235652414705,"915273515289737":915273515289737,"273042116146395":273042116146395,"226911423997561":226911423997561,"1684123748509128":1684123748509128},"experience_type":"grammar","exclude_ids":null,"browse_location":"browse_location:browse","trending_source":null,"reaction_surface":null,"reaction_session_id":null,"ref_path":"/search/536133109/pages-liked","is_trending":false,"topic_id":null,"place_id":null,"story_id":null,"callsite":"browse_ui:init_result_set","has_top_pagelet":true,"display_params":{"crct":"none"},
				"cursor":cursor,
				"page_number":page,
				"em":false,"tr":null
			}),
		},
	};
	// useQuerystring: true,
}

const getIds = (input) => {
	var r = /id&quot;:(\d+),/g;
	// var r = /raw_id&quot;:(\d+),/g;
	// var r = /entity_id=(\d+)/g;
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


let result = {

};

const storeIds = (ids) => {
	return new Promise((resolve, reject) => {
		if (ids.length === 0) {
			console.info('empty result');
			reject('empty result');
			return
		}
		ids.forEach((id) => {
			if (result[id]) {
				result[id] = result[id] + 1;
			} else {
				result[id] = 1;
			}
		});
		resolve(true);
		// rows.forEach()
		// db.updateOne('fb_liked_pages_ivcrnkladno', query, 'id = $1 AND user_id = $2', where, function(err, res) {
		// 	if (err) {
		// 		return reject(err);
		// 	}
		// 	if (!res) {
		// 		db.insert('fb_liked_pages_ivcrnkladno', rows, (err, res) => {
		// 			if (err) {
		// 				console.info('store error:', rows, err.detail);
		// 				reject(err);
		// 				return;
		// 			}
		// 			let {id} = res[0];
		// 			resolve(id);
		// 		});
		// 	}
		// 	return resolve(res.id.toString());
		// });

		return
	});
};


const scroll = (cursor, page) => {
	console.info('scrapping...', page, cursor);
	console.info('result', result);
	scrap(getOptions(cursor, page))
	.then((html) => {
		console.info('got page', page);
		storeIds(getIds(html))
		.catch()
		.then((wasStored) => {
			let {nextCursor, nextPage} = getCursor(html);
			if (!nextCursor || !nextPage) {
				console.info('terminate', nextCursor, nextPage);
				return;
			}
			setTimeout(scroll.bind(null, nextCursor, nextPage), 5000);
			return
		});
	})
	.catch((err) => console.info('error', err));
};

scroll(defaultCursor, defaultPage);

