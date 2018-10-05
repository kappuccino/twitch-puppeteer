const puppeteer = require('puppeteer')
const request = require('request')
const fs = require('fs')

function debug(...args){
	console.log('🚀', args)
}

const url = 'http://www.ansamble-et-moi.fr/mon-ecole/item/sivom-haut-medoc'

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

	const pdfUrl = await page.evaluate(() => {
		const url = document.querySelector('.box_docs a').getAttribute('href')

		const {protocol, hostname} = document.location
		return `${protocol}//${hostname}${url}`
	})

	await browser.close()

	console.log('🔥', pdfUrl)

	request(pdfUrl).pipe(fs.createWriteStream('./cantine.pdf'))

})()