import * as puppeteer from 'puppeteer'

export async function scrapImagesFrom(link: string): Promise<string[]> {
  const browser = await puppeteer.launch()
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
