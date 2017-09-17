const scrapper = require('../scrapper');

const website = {
	url: 'https://en.wikipedia.org/wiki/Islam_by_country'
}

scrapper.scrap(website)
.then(($) => {
	const rows = $('table.sortable tbody tr')
	let result = {}
	rows.map((i, row) => {
		let country = $(row).children('td').first().children('a').last().text()
		let number = $(row).children('td').eq(1).text()
		if (country) {
			result[country] = number
		}})
	console.info(result);
})
.catch((err) => console.info('error', err))

