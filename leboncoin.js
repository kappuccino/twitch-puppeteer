const puppeteer = require('puppeteer')

function debug(...args){
	console.log('🚀', args)
}

const url = 'https://www.leboncoin.fr/recherche/?category=9&regions=2&location=Blanquefort_33290&real_estate_type=3'

;(async () => { // ASYNC IFFY ):

	const options = {
		headless: false,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--enable-logging',
			'--v=1'
		]
	}

	debug('-- options', options)
	const browser = await puppeteer.launch(options)

	const page = await browser.newPage()
	await page.setViewport({width: 1280, height: 1280});

	debug('Open chrome with url', url)
	await page.goto(url, {waitUntil: 'networkidle2'})

	const data = await page.evaluate(() => {
		const offers = document.querySelectorAll('[itemtype="http://schema.org/Offer"]')

		return Array.from(offers)
			.slice(0, 2)
			.map(dom => {
				return {
					title: dom.querySelector('span [itemprop="name"]').innerText,
					image: dom.querySelector('span [itemprop="image"]').getAttribute('src'),
					price: dom.querySelector('span [itemprop="price"]').innerText
				}
			})

	})

	await browser.close()

	console.log('🔥', data)


})()
