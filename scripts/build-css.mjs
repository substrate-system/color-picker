import { readFileSync, writeFileSync } from 'node:fs'
import { transform } from 'lightningcss'

const minify = process.argv.includes('--minify')
const source = readFileSync('src/index.css')

const { code, map } = transform({
  filename: 'src/index.css',
  code: source,
  minify,
  sourceMap: true,
  drafts: {
    nesting: true
  }
})

const outFile = minify ? 'dist/index.min.css' : 'dist/index.css'

writeFileSync(outFile, code)
writeFileSync(`${outFile}.map`, map)
