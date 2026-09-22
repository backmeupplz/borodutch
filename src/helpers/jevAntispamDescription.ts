import formatNumber from 'helpers/formatNumber'
import type { JevAntispamStats } from 'helpers/projectsData'

export default function jevAntispamDescription(
  stats?: Readonly<JevAntispamStats>
) {
  const completeStats =
    stats &&
    [
      stats.knownChatCount,
      stats.privateChatCount,
      stats.reachableCommunityCount,
      stats.combinedCommunityAudience,
      stats.successfulDeletionCount,
    ].every(function (value) {
      return typeof value === 'number' && Number.isFinite(value)
    })
  const liveNumbers: string | false = completeStats
    ? `Jev Antispam knows ${formatNumber(
        stats.knownChatCount
      )} chats, including ${formatNumber(
        stats.privateChatCount
      )} private chats, and currently reaches ${formatNumber(
        stats.reachableCommunityCount
      )} communities with ${formatNumber(
        stats.combinedCommunityAudience
      )} combined members and subscribers. It has deleted ${formatNumber(
        stats.successfulDeletionCount
      )} spam messages.`
    : false

  return [
    'Telegram anti-spam bot powered by the Jev model.',
    liveNumbers,
    'Try it [on Telegram](https://t.me/jev_antispam_bot). It is [open source](https://github.com/backmeupplz/jev_antispam_bot).',
  ]
}
