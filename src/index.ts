import { scrapImagesFrom } from './browser'

// TODO: Add this link via CLI
const link =
  'https://www.scribd.com/doc/50073955/Gentil-Montana-Obras-Para-Guitarra'

async function main() {
  try {
    console.log('Starting scrap')
    const images = await scrapImagesFrom(link)
    console.log('wiiii', images)
  } catch (e) {
    console.log(e.message)
  }
}

main()
