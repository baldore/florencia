const download = require('image-downloader')

export function downloadImages(imagesUrls: string[], dest: string) {
  const downloads = imagesUrls.map(url => download.image({ url, dest }))
  return Promise.all(downloads)
}
