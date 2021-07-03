'use strict'
const Search = require('./scripts/search')
const Plot = require('nodeplotlib')

main()

async function main() {
  const results = await Search()

  const chartData = {
    x: [],
    y: [],
    type: 'bar'
  }

  for (const result of results) {
    chartData.x.push(result.idolName)
    chartData.y.push(result.tweetsCount)
  }

  Plot.plot([chartData])
}
