import { scrapImagesFrom } from './browser'
import { downloadImages } from './download'

const mkdirp = require('mkdirp-promise')

// TODO: Add this link via CLI
const link =
  'https://www.scribd.com/doc/50073955/Gentil-Montana-Obras-Para-Guitarra'
const destination = './downloads'

async function main() {
  try {
    console.log('Starting scrap')

    const images = await scrapImagesFrom(link)

    console.log(`${images.length} images found`)
    console.log('Downloading images...')

    await mkdirp(destination)
    await downloadImages(images, destination)

    console.log('Done!!! Enjoy!!!')
  } catch (e) {
    throw e
  }
}

main()
