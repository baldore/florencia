import { scrapImagesFrom } from './browser'
import { downloadImages } from './download'

const mkdirp = require('mkdirp-promise')

export default async function downloadImagesFromUrl(
  url: string,
  destination: string,
) {
  try {
    console.log(`URL: ${url}`)
    console.log(`Downloading into: ${destination}`)
    console.log('Starting scrap')

    const images = await scrapImagesFrom(url)

    console.log(`${images.length} images found`)
    console.log('Downloading images...')

    await mkdirp(destination)
    await downloadImages(images, destination)

    console.log('Done!!! Enjoy!!! 🏴‍☠️')
  } catch (e) {
    throw e
  }
}
