import * as yargs from 'yargs'
import downloadImagesFromUrl from './download-images-from-url'

yargs
  .command(
    'run',
    'Choose the output directory for the images',
    {
      output: {
        alias: 'o',
        description: 'Output directory',
        demandOption: true,
      },
      url: {
        alias: 'u',
        description: 'Url to look for images',
        demandOption: true,
      },
    },
    async (argv: any) => {
      const { url, output } = argv
      await downloadImagesFromUrl(url, output)
    },
  )
  .demandCommand()
  .help().argv
