'use strict'
const Twitter = require('twitter')
const Util = require('./util')
const Cred = require('../data/.cred.json')
const Idols = require('../data/idols.json')

const client = new Twitter(Cred)

// 全てのアイドルのガチャ報告ツイートを分析して結果を返す
async function search(date) {
  const results = await Promise.all(
    Idols.map((name) => fetchGachaTweetsInfo(name, date))
  )

  return results
}

// ガチャ報告ツイートの分析結果を取得
async function fetchGachaTweetsInfo(idolName, date) {
  const dateStr = Util.formatDate(date)

  const param = {
    q: `${idolName}に出会ったよ！ since:${dateStr}_00:00:00_JST until:${dateStr}_23:59:59_JST filter:images -filter:retweets`,
    max_id: '',
    count: 100
  }

  // ツイート数を計算
  // ------
  // 一度に100件までしか取ってこれないので
  // 取得数が100件なら、一番古いツイートのidをmax_idに指定して
  // 取得数がなくなるまで繰り返す
  let statuses = {}
  let count = 0
  do {
    statuses = await searchTweets(param)

    const length = statuses.length
    if (!length) break

    const oldestTweet = statuses.slice(-1)[0]
    param.max_id = oldestTweet.id_str

    count += statuses.length
  } while (statuses.length >= 100)

  return {
    idolName: idolName,
    tweetsCount: count
  }
}

// ツイートを検索する
async function searchTweets(param) {
  const results = await client
    .get('search/tweets', param)
    .catch((err) => console.error(err))

  return results.statuses
}

module.exports = search
