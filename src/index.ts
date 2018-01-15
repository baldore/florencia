import * as puppeteer from 'puppeteer'

// TODO: Add this link via CLI
const link =
  'https://www.scribd.com/doc/50073955/Gentil-Montana-Obras-Para-Guitarra'
const timeout = 30000

async function getImages(link: string) {
  const browser = await puppeteer.launch({
    // headless: false,
    // devtools: true,
  })
  const page = await browser.newPage()

  await page.goto(link)
  await page.content()

  await page.evaluate(async function() {
    await new Promise((resolve, reject) => {
      const container = document.querySelector('.document_scroller')
      let currentScroll = 0

      if (!container) {
        return reject()
      }

      const scrollInterval = window.setInterval(() => {
        currentScroll += container.clientHeight / 2
        currentScroll = Math.min(container.scrollHeight, currentScroll)
        container.scrollTop += currentScroll

        if (currentScroll === container.scrollHeight) {
          window.clearInterval(scrollInterval)
          resolve()
        }
      }, 500)
    })
  })

  console.log('Looking for images inside the page')
  await page.waitFor(10000)

  const images = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.absimg'))
    const images = elements.map(img => img.getAttribute('src'))
    return images
  })

  await browser.close()

  return images
}

async function main() {
  try {
    console.log('Starting scrap')
    const images = await getImages(link)
    console.log('wiiii', images)
  } catch (e) {
    console.log(e.message)
  }
}

main()
