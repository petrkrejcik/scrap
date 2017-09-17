// prvni request, kterej vrati cursor
// scroll request

// ulozit idcka uzivatelu
// fb-fans-ivcrnkladno
// 917 lajku
// userId


const {scrap, db} = require('../scrapper');

let originalUrl = `
https://www.facebook.com/ajax/pagelet/generic.php/BrowseScrollingSetPagelet?dpr=1&data=%7B%22view%22%3A%22list%22%2C%22encoded_query%22%3A%22%7B%5C%22bqf%5C%22%3A%5C%22likers(226911423997561)%5C%22%2C%5C%22browse_sid%5C%22%3Anull%2C%5C%22vertical%5C%22%3A%5C%22none%5C%22%2C%5C%22post_search_vertical%5C%22%3Anull%2C%5C%22intent_data%5C%22%3Anull%2C%5C%22filters%5C%22%3A[]%2C%5C%22has_chrono_sort%5C%22%3Afalse%2C%5C%22query_analysis%5C%22%3Anull%2C%5C%22subrequest_disabled%5C%22%3Afalse%2C%5C%22token_role%5C%22%3A%5C%22NONE%5C%22%2C%5C%22preloaded_story_ids%5C%22%3A[]%2C%5C%22extra_data%5C%22%3Anull%2C%5C%22disable_main_browse_unicorn%5C%22%3Afalse%2C%5C%22entry_point_scope%5C%22%3Anull%2C%5C%22entry_point_surface%5C%22%3Anull%2C%5C%22squashed_ent_ids%5C%22%3A[]%7D%22%2C%22encoded_title%22%3A%22WyJQZW9wbGUrd2hvK2xpa2UrIix7InRleHQiOiJBcmNod2FycyIsInVpZCI6MjI2OTExNDIzOTk3NTYxLCJ0eXBlIjoiYWN0aXZpdHkifV0%22%2C%22ref%22%3A%22unknown%22%2C%22logger_source%22%3A%22www_main%22%2C%22typeahead_sid%22%3A%22%22%2C%22tl_log%22%3Afalse%2C%22impression_id%22%3A%221c242f12%22%2C%22filter_ids%22%3A%7B%221015678360%22%3A1015678360%2C%221214709639%22%3A1214709639%2C%221449814520%22%3A1449814520%2C%221528087626%22%3A1528087626%2C%22100005964391117%22%3A100005964391117%7D%2C%22experience_type%22%3A%22grammar%22%2C%22exclude_ids%22%3Anull%2C%22browse_location%22%3A%22browse_location%3Abrowse%22%2C%22trending_source%22%3Anull%2C%22reaction_surface%22%3Anull%2C%22reaction_session_id%22%3Anull%2C%22ref_path%22%3A%22%2Fsearch%2F226911423997561%2Flikers%22%2C%22is_trending%22%3Afalse%2C%22topic_id%22%3Anull%2C%22place_id%22%3Anull%2C%22story_id%22%3Anull%2C%22callsite%22%3A%22browse_ui%3Ainit_result_set%22%2C%22has_top_pagelet%22%3Atrue%2C%22display_params%22%3A%7B%22crct%22%3A%22none%22%7D%2C%22cursor%22%3A%22AbpcJM_K1elJlMpiriS5aJ5ae6WB_slbQhog5QQdGQ_6OGS_wlQiPJKjkJuSGbCOaTgirbTMm5cosxuaxawu19PqhAN7n0IzxBymeFrHnPWVpdFGtU75o6c2qx-kTe0e_ZQg3xrmvjKAbEL-5kZ9BDKmqvRZ73xIjSxNoLXC66CMaGnRrC7eqBNm6pXmw7D35a8DYhiLDGIqE34lUzOdNqhlAFArWQ3K0trPIsPVIo8JcvUJv5Pw6rYz7x7d7reMa8qqeRFJZPfjL_g9OxnBQiWzt26JTQNICUHJVzRDH2H3J8-asuPT_W2eBPb5Yb1uNEUzTsQ_-oy5B1Mg42-pQdK0oJlGxFKGQYmph9pLWlyM71OQAAT2jDAI9_rkCsdMf7w%22%2C%22page_number%22%3A6%2C%22em%22%3Afalse%2C%22tr%22%3Anull%7D&__user=100001102995225&__a=1&__dyn=7AgNeyfyGmaxx2u6aOGeFxqeCwKAKGgS8zCC-C267UKezob4q2i5U4e2DiwEUW4UJi28rxuF8W49XDG4XzErDAxaFQ3uaVVojxCUSbAWCDxi5-78O5u5o5aayrgS2m4oqyU9omUmC-Ujyk6EvGi64i9CUmzpK5EG2ut5xq48a9Ef8Cu4rGUohESUK8Gm8z8O784a8CxK9yUvybx7yESbwgXiy6bzef_gqBx67byUmw&__af=h0&__req=18&__be=0&__pc=PHASED%3ADEFAULT&__rev=3284495&__spin_r=3284495&__spin_b=trunk&__spin_t=1504881362
`;
let originalUrlWithoutUser = `
https://www.facebook.com/ajax/pagelet/generic.php/BrowseScrollingSetPagelet?dpr=1&data=%7B%22view%22%3A%22list%22%2C%22encoded_query%22%3A%22%7B%5C%22bqf%5C%22%3A%5C%22likers(226911423997561)%5C%22%2C%5C%22browse_sid%5C%22%3Anull%2C%5C%22vertical%5C%22%3A%5C%22none%5C%22%2C%5C%22post_search_vertical%5C%22%3Anull%2C%5C%22intent_data%5C%22%3Anull%2C%5C%22filters%5C%22%3A[]%2C%5C%22has_chrono_sort%5C%22%3Afalse%2C%5C%22query_analysis%5C%22%3Anull%2C%5C%22subrequest_disabled%5C%22%3Afalse%2C%5C%22token_role%5C%22%3A%5C%22NONE%5C%22%2C%5C%22preloaded_story_ids%5C%22%3A[]%2C%5C%22extra_data%5C%22%3Anull%2C%5C%22disable_main_browse_unicorn%5C%22%3Afalse%2C%5C%22entry_point_scope%5C%22%3Anull%2C%5C%22entry_point_surface%5C%22%3Anull%2C%5C%22squashed_ent_ids%5C%22%3A[]%7D%22%2C%22encoded_title%22%3A%22WyJQZW9wbGUrd2hvK2xpa2UrIix7InRleHQiOiJBcmNod2FycyIsInVpZCI6MjI2OTExNDIzOTk3NTYxLCJ0eXBlIjoiYWN0aXZpdHkifV0%22%2C%22ref%22%3A%22unknown%22%2C%22logger_source%22%3A%22www_main%22%2C%22typeahead_sid%22%3A%22%22%2C%22tl_log%22%3Afalse%2C%22impression_id%22%3A%221c242f12%22%2C%22filter_ids%22%3A%7B%221015678360%22%3A1015678360%2C%221214709639%22%3A1214709639%2C%221449814520%22%3A1449814520%2C%221528087626%22%3A1528087626%2C%22100005964391117%22%3A100005964391117%7D%2C%22experience_type%22%3A%22grammar%22%2C%22exclude_ids%22%3Anull%2C%22browse_location%22%3A%22browse_location%3Abrowse%22%2C%22trending_source%22%3Anull%2C%22reaction_surface%22%3Anull%2C%22reaction_session_id%22%3Anull%2C%22ref_path%22%3A%22%2Fsearch%2F226911423997561%2Flikers%22%2C%22is_trending%22%3Afalse%2C%22topic_id%22%3Anull%2C%22place_id%22%3Anull%2C%22story_id%22%3Anull%2C%22callsite%22%3A%22browse_ui%3Ainit_result_set%22%2C%22has_top_pagelet%22%3Atrue%2C%22display_params%22%3A%7B%22crct%22%3A%22none%22%7D%2C%22cursor%22%3A%22AbpcJM_K1elJlMpiriS5aJ5ae6WB_slbQhog5QQdGQ_6OGS_wlQiPJKjkJuSGbCOaTgirbTMm5cosxuaxawu19PqhAN7n0IzxBymeFrHnPWVpdFGtU75o6c2qx-kTe0e_ZQg3xrmvjKAbEL-5kZ9BDKmqvRZ73xIjSxNoLXC66CMaGnRrC7eqBNm6pXmw7D35a8DYhiLDGIqE34lUzOdNqhlAFArWQ3K0trPIsPVIo8JcvUJv5Pw6rYz7x7d7reMa8qqeRFJZPfjL_g9OxnBQiWzt26JTQNICUHJVzRDH2H3J8-asuPT_W2eBPb5Yb1uNEUzTsQ_-oy5B1Mg42-pQdK0oJlGxFKGQYmph9pLWlyM71OQAAT2jDAI9_rkCsdMf7w%22%2C%22page_number%22%3A6%2C%22em%22%3Afalse%2C%22tr%22%3Anull%7D&__a=1&__dyn=7AgNeyfyGmaxx2u6aOGeFxqeCwKAKGgS8zCC-C267UKezob4q2i5U4e2DiwEUW4UJi28rxuF8W49XDG4XzErDAxaFQ3uaVVojxCUSbAWCDxi5-78O5u5o5aayrgS2m4oqyU9omUmC-Ujyk6EvGi64i9CUmzpK5EG2ut5xq48a9Ef8Cu4rGUohESUK8Gm8z8O784a8CxK9yUvybx7yESbwgXiy6bzef_gqBx67byUmw&__af=h0&__req=18&__be=0&__pc=PHASED%3ADEFAULT&__rev=3284495&__spin_r=3284495&__spin_b=trunk&__spin_t=1504881362
`;
let myUrl = `
https://www.facebook.com/ajax/pagelet/generic.php/BrowseScrollingSetPagelet?__a=1&data%5Bview%5D=list&data%5Bencoded_query%5D%5Bbqf%5D=likers%28226911423997561%29&data%5Bencoded_query%5D%5Bbrowse_sid%5D=&data%5Bencoded_query%5D%5Bvertical%5D=none&data%5Bencoded_query%5D%5Bpost_search_vertical%5D=&data%5Bencoded_query%5D%5Bintent_data%5D=&data%5Bencoded_query%5D%5Bhas_chrono_sort%5D=false&data%5Bencoded_query%5D%5Bquery_analysis%5D=&data%5Bencoded_query%5D%5Bsubrequest_disabled%5D=false&data%5Bencoded_query%5D%5Btoken_role%5D=NONE&data%5Bencoded_query%5D%5Bextra_data%5D=&data%5Bencoded_query%5D%5Bdisable_main_browse_unicorn%5D=false&data%5Bencoded_query%5D%5Bentry_point_scope%5D=&data%5Bencoded_query%5D%5Bentry_point_surface%5D=&data%5Bencoded_title%5D=WyJQZW9wbGUrd2hvK2xpa2UrIix7InRleHQiOiJBcmNod2FycyIsInVpZCI6MjI2OTExNDIzOTk3NTYxLCJ0eXBlIjoiYWN0aXZpdHkifV0&data%5Bref%5D=unknown&data%5Blogger_source%5D=www_main&data%5Btypeahead_sid%5D=&data%5Btl_log%5D=false&data%5Bimpression_id%5D=1c242f12&data%5Bfilter_ids%5D%5B1015678360%5D=1015678360&data%5Bfilter_ids%5D%5B1214709639%5D=1214709639&data%5Bfilter_ids%5D%5B1449814520%5D=1449814520&data%5Bfilter_ids%5D%5B1528087626%5D=1528087626&data%5Bfilter_ids%5D%5B100005964391117%5D=100005964391117&data%5Bexperience_type%5D=grammar&data%5Bexclude_ids%5D=&data%5Bbrowse_location%5D=browse_location%3Abrowse&data%5Btrending_source%5D=&data%5Breaction_surface%5D=&data%5Breaction_session_id%5D=&data%5Bref_path%5D=%2Fsearch%2F226911423997561%2Flikers&data%5Bis_trending%5D=false&data%5Btopic_id%5D=&data%5Bplace_id%5D=&data%5Bstory_id%5D=&data%5Bcallsite%5D=browse_ui%3Ainit_result_set&data%5Bhas_top_pagelet%5D=true&data%5Bdisplay_params%5D%5Bcrct%5D=none&data%5Bcursor%5D=AbpcJM_K1elJlMpiriS5aJ5ae6WB_slbQhog5QQdGQ_6OGS_wlQiPJKjkJuSGbCOaTgirbTMm5cosxuaxawu19PqhAN7n0IzxBymeFrHnPWVpdFGtU75o6c2qx-kTe0e_ZQg3xrmvjKAbEL-5kZ9BDKmqvRZ73xIjSxNoLXC66CMaGnRrC7eqBNm6pXmw7D35a8DYhiLDGIqE34lUzOdNqhlAFArWQ3K0trPIsPVIo8JcvUJv5Pw6rYz7x7d7reMa8qqeRFJZPfjL_g9OxnBQiWzt26JTQNICUHJVzRDH2H3J8-asuPT_W2eBPb5Yb1uNEUzTsQ_-oy5B1Mg42-pQdK0oJlGxFKGQYmph9pLWlyM71OQAAT2jDAI9_rkCsdMf7w&data%5Bpage_number%5D=6&data%5Bem%5D=false&data%5Btr%5D=
`;
const defaultCursor = "AboPa_gQopiAK0uMVTcntMBdJ_Z1wmjHyRlTZOkhxPIxvXXLSKAIMbl7TJH-I3x8uTl4aC-h9pDdIjzK-eSOgGmB_lN5hZe58_1bHRRYwbGgL1tKWPt9sx16SKxgSFyV8-iQoZmXUl8_V6PbRIzvpHkSTEBQ0IwuSSfXEywmmi9AcL11H5zej5ruIctQRK6ZxPR2_VIA_1xOUKfBbe2P0RirqGpg7C4wKF86_j_L8XfcRbgsck3fDK_iJ1ne4TKLZeSYTAlsCw2ejceWU4KNuWU29ENn7_BbOkcyK29vPcHGw1pPhKLIPDCSux-wxVJlmrnpOwOopEfZxgmfb8orLGH0eA6kLt-JsDRbqvIb66pe-kzv4Q_EvQCcmbTYiJFBLu4";
const defaultPage = 2;

let data = {
	"view": "list",
    "encoded_query":
    {
    	"bqf":"likers(226911423997561)",
	    "browse_sid":null,
	    "vertical":"none",
	    "post_search_vertical":null,
	    "intent_data":null,
	    "filters":[],
	    "has_chrono_sort":false,
	    "query_analysis":null,
	    "subrequest_disabled":false,
	    "token_role":"NONE",
	    "preloaded_story_ids":[],
	    "extra_data":null,
	    "disable_main_browse_unicorn":false,
	    "entry_point_scope":null,
	    "entry_point_surface":null,
	    "squashed_ent_ids":[]
	},

    "encoded_title": "WyJQZW9wbGUrd2hvK2xpa2UrIix7InRleHQiOiJBcmNod2FycyIsInVpZCI6MjI2OTExNDIzOTk3NTYxLCJ0eXBlIjoiYWN0aXZpdHkifV0",

    "ref": "unknown",

    "logger_source": "www_main",
    "typeahead_sid": "",
    "tl_log": false,
    "impression_id": "8d0f93be",
    "filter_ids":
    {
        "1015678360": 1015678360,
        "1214709639": 1214709639,
        "1449814520": 1449814520,
        "1528087626": 1528087626,
        "100005964391117": 100005964391117
    },
    "experience_type": "grammar",
    "exclude_ids": null,
    "browse_location": "browse_location:browse",
    "trending_source": null,
    "reaction_surface": null,
    "reaction_session_id": null,
    "ref_path": "/search/226911423997561/likers",
    "is_trending": false,
    "topic_id": null,
    "place_id": null,
    "story_id": null,
    "callsite": "browse_ui:init_result_set",
    "has_top_pagelet": true,
    "display_params":
    {
        "crct": "none"
    },
    "cursor": "AboPa_gQopiAK0uMVTcntMBdJ_Z1wmjHyRlTZOkhxPIxvXXLSKAIMbl7TJH-I3x8uTl4aC-h9pDdIjzK-eSOgGmB_lN5hZe58_1bHRRYwbGgL1tKWPt9sx16SKxgSFyV8-iQoZmXUl8_V6PbRIzvpHkSTEBQ0IwuSSfXEywmmi9AcL11H5zej5ruIctQRK6ZxPR2_VIA_1xOUKfBbe2P0RirqGpg7C4wKF86_j_L8XfcRbgsck3fDK_iJ1ne4TKLZeSYTAlsCw2ejceWU4KNuWU29ENn7_BbOkcyK29vPcHGw1pPhKLIPDCSux-wxVJlmrnpOwOopEfZxgmfb8orLGH0eA6kLt-JsDRbqvIb66pe-kzv4Q_EvQCcmbTYiJFBLu4",
    "page_number": 2,
    "em": false,
    "tr": null
};

let urlParams = {
	__a: 1,
	data: JSON.stringify(data),
};


const getOptions = (cursor, page) => {
	return {
		url: 'https://www.facebook.com/ajax/pagelet/generic.php/BrowseScrollingSetPagelet',
		// url: originalUrlWithoutUser,
		headers: {
			referef: 'https://www.facebook.com/search/699206000188443/likers',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
		},
		qs: {
			__a: 1,
			data: JSON.stringify({
				"view": "list",
			    "encoded_query": "{\"bqf\":\"likers(699206000188443)\",\"browse_sid\":null,\"vertical\":\"none\",\"post_search_vertical\":null,\"intent_data\":null,\"filters\":[],\"has_chrono_sort\":false,\"query_analysis\":null,\"subrequest_disabled\":false,\"token_role\":\"NONE\",\"preloaded_story_ids\":[],\"extra_data\":null,\"disable_main_browse_unicorn\":false,\"entry_point_scope\":null,\"entry_point_surface\":null,\"squashed_ent_ids\":[]}",
			    "encoded_title": "WyJQZW9wbGUrd2hvK2xpa2UrIix7InRleHQiOiJBcmNod2FycyIsInVpZCI6MjI2OTExNDIzOTk3NTYxLCJ0eXBlIjoiYWN0aXZpdHkifV0",
			    "ref": "unknown",
			    "logger_source": "www_main",
			    "typeahead_sid": "",
			    "tl_log": false,
			    "impression_id": "8d0f93be",
			    "filter_ids":
			    {
			        "1015678360": 1015678360,
			        "1214709639": 1214709639,
			        "1449814520": 1449814520,
			        "1528087626": 1528087626,
			        "100005964391117": 100005964391117
			    },
			    "experience_type": "grammar",
			    "exclude_ids": null,
			    "browse_location": "browse_location:browse",
			    "trending_source": null,
			    "reaction_surface": null,
			    "reaction_session_id": null,
			    "ref_path": "/search/699206000188443/likers",
			    "is_trending": false,
			    "topic_id": null,
			    "place_id": null,
			    "story_id": null,
			    "callsite": "browse_ui:init_result_set",
			    "has_top_pagelet": true,
			    "display_params":
			    {
			        "crct": "none"
			    },
			    "cursor": cursor,
			    "page_number": page,
			    "em": false,
			    "tr": null
			}),
		},
	};
	// useQuerystring: true,
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


const scroll = (cursor, page) => {
	console.info('scrapping...', page, cursor);
	scrap(getOptions(cursor, page))
	.then((html) => {
		console.info('got page', page);
		storeIds(getIds(html));
		let {nextCursor, nextPage} = getCursor(html);
		if (!nextCursor || !nextPage) {
			console.info('terminate', nextCursor, nextPage);
			return;
		}
		setTimeout(scroll.bind(null, nextCursor, nextPage), 5000);
		return
	})
	.catch((err) => console.info('error', err));
};

scroll(defaultCursor, defaultPage);

