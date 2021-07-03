'use strict'
const Idols = require('./data/idols.json')
const Search = require('./scripts/search')

main()

async function main() {
  const results = await Promise.all(Idols.map((name) => Search(name)))

  for (const result of results) {
    console.log(`${result.idolName} : ${result.tweetsCount}人が出会いました`)
  }
}
