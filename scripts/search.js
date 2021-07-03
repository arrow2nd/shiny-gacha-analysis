'use strict'
const Twitter = require('twitter')
const Util = require('./util')
const Cred = require('../data/.cred.json')

const client = new Twitter(Cred)

async function fetchGachaTweetsInfo(idolName) {
  const nowDate = Util.formatDate(new Date())

  const param = {
    q: `${idolName}に出会ったよ！ since:${nowDate}_00:00:00_JST filter:images -filter:retweets`,
    count: 100
  }

  // ツイートを検索
  const results = await client
    .get('search/tweets', param)
    .catch((err) => console.error(err))

  const statuses = results.statuses

  return {
    idolName: idolName,
    tweetsCount: statuses.length
  }
}

module.exports = fetchGachaTweetsInfo
