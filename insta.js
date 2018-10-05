const puppeteer = require('puppeteer')
const username = 'mkbhd'
const url = `https://www.instagram.com/${username}/`

;(async () => {

	const options = {
		headless: false,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--enable-logging',
			'--v=1'
		]
	}

	const browser = await puppeteer.launch(options)

	const page = await browser.newPage()

	await page.goto(url, {waitUntil: 'networkidle2'})

	let links = await page.$$eval(`a[href$="taken-by=${username}"]`, links => {
		return links.map((link) => link.href)
	});

	links = links.slice(0,3)

	async function image(url){
		await page.goto(url, {waitUntil: 'networkidle2'})
		return await page.$eval(`img[decoding="auto"]`, item => item.src)
	}

	const data = []
	for await(let link of links){
		const src = await image(link)
		data.push(src)
	}

	console.log(data)

	//await browser.close()


})()