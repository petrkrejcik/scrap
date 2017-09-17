const scrapper = require('../scrapper');

const website = {
	url: 'https://en.wikipedia.org/wiki/List_of_terrorist_incidents_in_August_2017'
}

scrapper.scrap(website)
.then(($) => {
	const rows = $('#terrorIncidents2017August tbody tr')
	let result = {}
	rows.map((i, row) => {
		let country = $(row).children().eq(4).text().split(',').pop().trim()
		if (result[country] >= 1) {
			result[country]++
		} else {
			result[country] = 1
		}
	})
	console.info(result);
})
.catch((err) => console.info('error', err))

