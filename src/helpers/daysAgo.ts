// Dependencies
import moment = require('moment')

export function daysAgo(numberOfDays: number) {
  const d = new Date()
  d.setDate(d.getDate() - numberOfDays)
  return moment(d).format('DD.MM')
}

export function daysAgoLong(numberOfDays: number) {
  const d = new Date()
  d.setDate(d.getDate() - numberOfDays)
  return moment(d).format('DD.MM.YYYY')
}

export function formatTime(date: Date) {
  return moment(date).format('hh:mm:ss')
}
