'use strict'

// 日付をフォーマットする
function formatDate(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

module.exports = { formatDate }
