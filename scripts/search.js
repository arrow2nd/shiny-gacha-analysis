'use strict'
const Twitter = require('twitter')
const Util = require('./util')
const Cred = require('../data/.cred.json')
const Idols = require('../data/idols.json')

/**
 * 全アイドルのガチャツイートを検索して結果を返す
 *
 * @returns 分析結果
 */
async function search() {
  const results = await Promise.all(
    Idols.map((name) => fetchGachaTweetsInfo(name))
  )

  return results
}

/**
 * ガチャのツイートを検索して分析結果を返す
 *
 * @param {String} idolName アイドル名
 * @returns ツイートの分析結果
 */
async function fetchGachaTweetsInfo(idolName) {
  const client = new Twitter(Cred)
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

module.exports = search
