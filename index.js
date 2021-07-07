'use strict'
const Search = require('./scripts/search')
const Plot = require('nodeplotlib')

main()

async function main() {
  const date = new Date()
  const results = await Search(date)

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
