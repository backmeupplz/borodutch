import {
  cloudflareSeries,
  countSeries,
  jevSeries,
  messageSeries,
  runningTotalSeries,
} from 'helpers/chartSeries'
import Project from 'models/Project'
import formatNumber from 'helpers/formatNumber'
import hasPositiveNumbers from 'helpers/hasPositiveNumbers'
import jevAntispamDescription from 'helpers/jevAntispamDescription'

const projects: Project[] = [
  {
    title: 'Veydrift',
    code: 'veydrift',
    link: 'https://veydrift.com',
    image: 'wide',
    description: ({ veydrift }) => [
      'Onchain multiplayer space strategy game on Base, built around competing for planets and navigating a shared universe.',
      hasPositiveNumbers(
        veydrift?.summary?.players,
        veydrift?.summary?.transactions,
        veydrift?.summary?.fleetMissions,
        veydrift?.summary?.battles
      ) &&
        `${formatNumber(
          veydrift?.summary?.players
        )} commanders have sent ${formatNumber(
          veydrift?.summary?.transactions
        )} onchain transactions, flown ${formatNumber(
          veydrift?.summary?.fleetMissions
        )} fleet missions and fought ${formatNumber(
          veydrift?.summary?.battles
        )} battles.`,
      'Live numbers on [stats.veydrift.com](https://stats.veydrift.com).',
    ],
    charts: ({ veydrift }) => {
      const daily = veydrift?.daily
      const total = veydrift?.summary
      return daily?.length && total
        ? [
            {
              title: 'Total onchain transactions',
              data: runningTotalSeries(
                daily,
                'transactions',
                total.transactions
              ),
            },
            {
              title: 'Total onchain events',
              data: runningTotalSeries(daily, 'events', total.events),
            },
            {
              title: 'Total fleet missions',
              data: runningTotalSeries(
                daily,
                'fleetMissions',
                total.fleetMissions
              ),
            },
            {
              title: 'Total battles',
              data: runningTotalSeries(daily, 'battles', total.battles),
            },
          ]
        : []
    },
  },
  {
    title: 'Plain Wallet',
    code: 'plainwallet',
    link: 'https://plainwallet.app',
    image: 'wide',
    description: () => [
      'Very minimal EVM wallet for Chrome, Firefox, Safari, Android, iPhone and Mac: about 1,400 lines of TypeScript you can read in an evening.',
      "It's [open source](https://github.com/backmeupplz/plainwallet).",
    ],
  },
  {
    title: 'Agentboard',
    code: 'agentboard',
    link: 'https://agentboard.win',
    image: 'wide',
    description: () => [
      'Tiny realtime kanban board for AI agents and the humans watching them: API keys for agents, markdown handoffs, file attachments and live updates.',
    ],
  },
  {
    title: 'ABS+',
    code: 'absplus',
    link: 'https://absplus.app',
    image: 'wide',
    description: () => [
      'Free, open-source Android app for Audiobookshelf. Stream or download audiobooks and podcasts, with synced listening progress.',
    ],
  },
  {
    title: 'Mesh+',
    code: 'meshplus',
    link: 'https://meshplus.app',
    image: 'wide',
    description: () => [
      'Free Android app for Meshtastic radios, so you can message your friends when there is no signal: private rooms, encrypted DMs, an SMS relay and firmware updates from your phone.',
      "It's [open source](https://github.com/backmeupplz/meshtastic-plus).",
    ],
  },
  {
    title: 'Jev Antispam',
    code: 'jevAntispam',
    link: 'https://t.me/jev_antispam_bot',
    image: 'icon',
    description: ({ jevAntispam }) => jevAntispamDescription(jevAntispam),
    charts: ({ jevAntispam }) => {
      const history = jevAntispam?.history
      return history?.length
        ? [
            {
              title: 'Chats',
              data: jevSeries(history, 'knownChatCount'),
            },
            {
              title: 'Total messages processed',
              data: jevSeries(history, 'processedMessageCount'),
            },
            {
              title: 'Total spam messages deleted',
              data: jevSeries(history, 'successfulDeletionCount'),
            },
          ]
        : []
    },
  },
  {
    title: 'Voicy',
    code: 'voicy',
    link: 'https://t.me/voicybot',
    image: 'icon',
    publications: [
      {
        link: 'https://blog.borodutch.com/i-rebuilt-voicy-with-agents-instead-of-rewriting-it-myself/',
        name: 'I rebuilt Voicy with agents instead of rewriting it myself',
      },
      {
        link: 'https://www.producthunt.com/posts/voicy',
        name: 'Product Hunt: Voicy',
      },
    ],
    description: ({ voicy }) => [
      'Telegram voice-to-text bot with local worker infrastructure, stronger queues, and real Telegram Web QA in the development loop.',
      hasPositiveNumbers(voicy?.stats?.chatCount, voicy?.stats?.voiceCount) &&
        `Voicy is installed in ${formatNumber(
          voicy?.stats?.chatCount
        )} chats and has recognized ${formatNumber(
          voicy?.stats?.voiceCount
        )} voice messages.`,
      "It's [open source](https://github.com/backmeupplz/voicy).",
    ],
    charts: ({ voicy }, showMore) =>
      voicy
        ? [
            {
              title: 'New chats per day',
              data: countSeries(voicy.stats.chatDailyStats, showMore),
            },
            {
              title: 'Messages received per day',
              data: messageSeries(voicy.stats.messageStats, showMore),
            },
            {
              title: 'Voice messages recognized per hour',
              data: countSeries(voicy.stats.hourlyStats, showMore, 'hour'),
            },
            {
              title: 'Voicybot.com visits per day',
              data: cloudflareSeries(voicy.cloudflare),
            },
          ]
        : [],
  },
  {
    title: 'MyGround',
    code: 'myground',
    link: 'https://myground.online',
    image: 'wide',
    description: () => [
      'Self-hosting platform and home-server base for running useful services without handing the whole stack to a cloud provider.',
      'It is the infrastructure side of the current work: local services, private access, and deployable templates.',
      "It's [open source](https://github.com/backmeupplz/myground).",
    ],
  },
  {
    title: 'Banofbot',
    code: 'banofbot',
    link: 'https://t.me/banofbot',
    image: 'icon',
    description: ({ banofbot }) => [
      'Telegram votekick bot for fighting spam and letting chats kick members by vote.',
      hasPositiveNumbers(banofbot?.requestCount, banofbot?.chatCount) &&
        `Banofbot has handled ${formatNumber(
          banofbot?.requestCount
        )} votekick requests in ${formatNumber(banofbot?.chatCount)} chats.`,
      "It's [open source](https://github.com/backmeupplz/banofbot).",
    ],
    charts: ({ banofbot }, showMore) =>
      banofbot
        ? [
            {
              title: 'New users per day',
              data: countSeries(banofbot.userDaily, showMore),
            },
            {
              title: 'New chats per day',
              data: countSeries(banofbot.chatDaily, showMore),
            },
            {
              title: 'New votekick requests per day',
              data: countSeries(banofbot.requestDaily, showMore),
            },
          ]
        : [],
  },
  {
    title: 'Randy Marsh',
    code: 'randy',
    link: 'https://t.me/randymbot',
    image: 'icon',
    description: ({ randym }) => [
      'Telegram raffle bot for channel and group admins.',
      hasPositiveNumbers(randym?.raffleCount, randym?.chatCount) &&
        `Randy has run ${formatNumber(
          randym?.raffleCount
        )} raffles in ${formatNumber(randym?.chatCount)} chats.`,
      "It's [open source](https://github.com/backmeupplz/randymbot).",
    ],
  },
  {
    title: 'Todorant',
    code: 'todorant',
    link: 'https://todorant.com',
    image: 'icon',
    description: ({ todorant }) => [
      'Todo manager built around the productivity system from my book. I no longer pitch it as the future of todo apps, but it is still part of my work and writing.',
      hasPositiveNumbers(todorant?.db?.todoCount) &&
        `Users on Todorant created ${formatNumber(
          todorant?.db?.todoCount
        )} todos.`,
    ],
    charts: ({ todorant }, showMore) =>
      todorant
        ? [
            {
              title: 'New users per day',
              data: countSeries(todorant.db.userDaily, showMore),
            },
            {
              title: 'New todos per day',
              data: countSeries(todorant.db.todoDaily, showMore),
            },
            {
              title: 'Todorant.com visits per day',
              data: cloudflareSeries(todorant.cloudflare),
            },
          ]
        : [],
  },
  {
    title: 'Shieldy',
    code: 'shieldy',
    link: 'https://t.me/shieldy_bot',
    image: 'icon',
    publications: [
      {
        link: 'https://blog.borodutch.com/shieldy-got-acquired-by-1inch-exchange/',
        name: 'Shieldy got acquired by 1inch Network',
      },
      {
        link: 'https://www.producthunt.com/posts/shieldy',
        name: 'Product Hunt: Shieldy',
      },
    ],
    description: ({ shieldy }) => [
      'Telegram anti-spam bot I built and sold to 1inch Network. Keeping it here as a real project receipt, not as current day-to-day work.',
      hasPositiveNumbers(shieldy?.chatCount) &&
        `Shieldy is used by ${formatNumber(shieldy?.chatCount)} chats.`,
    ],
    charts: ({ shieldy }, showMore) =>
      shieldy
        ? [
            {
              title: 'New chats per day',
              data: countSeries(shieldy.chatDaily, showMore),
            },
          ]
        : [],
  },
  {
    title: 'Borodutch.com',
    code: 'borodutch',
    link: 'https://borodutch.com',
    description: () => [
      'This website. The future is now, old man',
      "It's open source: [website](https://github.com/backmeupplz/borodutch), [stats server](https://github.com/backmeupplz/borodutch-stats).",
    ],
  },
  {
    title: 'Temply',
    code: 'temply',
    link: 'https://t.me/temply_bot',
    image: 'icon',
    description: ({ temply }) => [
      'Inline Telegram bot for saving reusable text templates and quickly inserting them later. Useful for support work, channel admins, and repeated replies.',
      hasPositiveNumbers(temply?.userCount, temply?.templatesCount) &&
        `Temply has ${formatNumber(
          temply?.userCount
        )} users who created ${formatNumber(
          temply?.templatesCount
        )} templates.`,
      "It's [open source](https://github.com/backmeupplz/temply).",
    ],
    charts: ({ temply }, showMore) =>
      temply
        ? [
            {
              title: 'New users per day',
              data: countSeries(temply.userDaily, showMore),
            },
          ]
        : [],
  },
]

export default projects
