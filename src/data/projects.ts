import { projectsData as baseProjectsData } from 'helpers/projectsData'
import { useSnapshot } from 'valtio'
import Project from 'models/Project'
import cloudflareStatsToLabelsAndDatasets from 'helpers/cloudflareStatsToLabelsAndDatasets'
import dailyStatsToLabelsAndDatasets from 'helpers/dailyStatsToLabelsAndDatasets'
import formatNumber from 'helpers/formatNumber'
import hasPositiveNumbers from 'helpers/hasPositiveNumbers'
import jevAntispamDescription from 'helpers/jevAntispamDescription'
import jevHistoryToLabelsAndDatasets from 'helpers/jevHistoryToLabelsAndDatasets'
import messageStatsToLabelsAndDatasets from 'helpers/messageStatsToLabelsAndDatasets'

const projects: Project[] = [
  {
    title: 'Veydrift',
    code: 'veydrift',
    link: 'https://veydrift.com',
    description: () => [
      'Onchain multiplayer space strategy game on Base, built around competing for planets and navigating a shared universe.',
    ],
  },
  {
    title: 'Plain Wallet',
    code: 'plainwallet',
    link: 'https://github.com/backmeupplz/plainwallet',
    description: () => [
      'Minimal open-source EVM wallet browser extension for Chrome and Firefox.',
    ],
  },
  {
    title: 'Jev Antispam',
    code: 'jevAntispam',
    link: 'https://t.me/jev_antispam_bot',
    description: () => {
      const {
        projectsData: { jevAntispam },
      } = useSnapshot(baseProjectsData)
      return jevAntispamDescription(jevAntispam)
    },
    charts: () => {
      const {
        projectsData: { jevAntispam },
      } = useSnapshot(baseProjectsData)
      const history = jevAntispam?.history
      return history?.length
        ? [
            {
              title: 'Number of chats vs days ago',
              data: jevHistoryToLabelsAndDatasets(history, 'knownChatCount'),
            },
            {
              title: 'Total messages processed vs days ago',
              data: jevHistoryToLabelsAndDatasets(
                history,
                'processedMessageCount'
              ),
            },
            {
              title: 'Total spam deleted vs days ago',
              data: jevHistoryToLabelsAndDatasets(
                history,
                'successfulDeletionCount'
              ),
            },
          ]
        : []
    },
  },
  {
    title: 'Voicy',
    code: 'voicy',
    link: 'https://t.me/voicybot',
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
    description: () => {
      const {
        projectsData: { voicy },
      } = useSnapshot(baseProjectsData)
      return [
        'Telegram voice-to-text bot with local worker infrastructure, stronger queues, and real Telegram Web QA in the development loop.',
        hasPositiveNumbers(voicy?.stats?.chatCount, voicy?.stats?.voiceCount) &&
          `Voicy is installed in ${formatNumber(
            voicy?.stats?.chatCount
          )} chats and has recognized ${formatNumber(
            voicy?.stats?.voiceCount
          )} voice messages.`,
        "It's [open source](https://github.com/backmeupplz/voicy).",
      ]
    },
    charts: () => {
      const {
        projectsData: { voicy },
      } = useSnapshot(baseProjectsData)
      return voicy
        ? [
            {
              title: 'Number of new chats per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(voicy.stats.chatDailyStats),
            },
            {
              title: 'Number of messages received per day',
              data: messageStatsToLabelsAndDatasets(voicy.stats.messageStats),
            },
            {
              title:
                'Number of voice messages recognized per hour vs hours ago',
              data: dailyStatsToLabelsAndDatasets(voicy.stats.hourlyStats),
            },
            {
              title: 'Voicybot.com visits',
              data: cloudflareStatsToLabelsAndDatasets(voicy.cloudflare),
            },
          ]
        : []
    },
  },
  {
    title: 'MyGround',
    code: 'myground',
    link: 'https://github.com/backmeupplz/myground',
    description: () => [
      'Self-hosting platform and home-server base for running useful services without handing the whole stack to a cloud provider.',
      'It is the infrastructure side of the current work: local services, private access, and deployable templates.',
    ],
  },
  {
    title: 'Banofbot',
    code: 'banofbot',
    link: 'https://t.me/banofbot',
    description: () => {
      const {
        projectsData: { banofbot },
      } = useSnapshot(baseProjectsData)
      return [
        'Telegram votekick bot for fighting spam and letting chats kick members by vote.',
        hasPositiveNumbers(banofbot?.requestCount, banofbot?.chatCount) &&
          `Banofbot has handled ${formatNumber(
            banofbot?.requestCount
          )} votekick requests in ${formatNumber(banofbot?.chatCount)} chats.`,
        "It's [open source](https://github.com/backmeupplz/banofbot).",
      ]
    },
    charts: () => {
      const {
        projectsData: { banofbot },
      } = useSnapshot(baseProjectsData)
      return banofbot
        ? [
            {
              title: 'Number of new users per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(banofbot.userDaily),
            },
            {
              title: 'Number of new chats per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(banofbot.chatDaily),
            },
            {
              title: 'Number of new requests per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(banofbot.requestDaily),
            },
          ]
        : []
    },
  },
  {
    title: 'Randy Marsh',
    code: 'randy',
    link: 'https://t.me/randymbot',
    description: () => {
      const {
        projectsData: { randym },
      } = useSnapshot(baseProjectsData)
      return [
        'Telegram raffle bot for channel and group admins.',
        hasPositiveNumbers(randym?.raffleCount, randym?.chatCount) &&
          `Randy has run ${formatNumber(
            randym?.raffleCount
          )} raffles in ${formatNumber(randym?.chatCount)} chats.`,
        "It's [open source](https://github.com/backmeupplz/randymbot).",
      ]
    },
  },
  {
    title: 'Todorant',
    code: 'todorant',
    link: 'https://todorant.com',
    description: () => {
      const {
        projectsData: { todorant },
      } = useSnapshot(baseProjectsData)
      return [
        'Todo manager built around the productivity system from my book. I no longer pitch it as the future of todo apps, but it is still part of my work and writing.',
        hasPositiveNumbers(todorant?.db?.todoCount) &&
          `Users on Todorant created ${formatNumber(
            todorant?.db?.todoCount
          )} todos.`,
      ]
    },
    charts: () => {
      const {
        projectsData: { todorant },
      } = useSnapshot(baseProjectsData)
      return todorant
        ? [
            {
              title: 'Number of new users per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(todorant.db.userDaily),
            },
            {
              title: 'Number of new todos per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(todorant.db.todoDaily),
            },
            {
              title: 'Todorant.com visits',
              data: cloudflareStatsToLabelsAndDatasets(todorant.cloudflare),
            },
          ]
        : []
    },
  },
  {
    title: 'Shieldy',
    code: 'shieldy',
    link: 'https://t.me/shieldy_bot',
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
    description: () => {
      const {
        projectsData: { shieldy },
      } = useSnapshot(baseProjectsData)
      return [
        'Telegram anti-spam bot I built and sold to 1inch Network. Keeping it here as a real project receipt, not as current day-to-day work.',
        hasPositiveNumbers(shieldy?.chatCount) &&
          `Shieldy is used by ${formatNumber(shieldy?.chatCount)} chats.`,
      ]
    },
    charts: () => {
      const {
        projectsData: { shieldy },
      } = useSnapshot(baseProjectsData)
      return shieldy
        ? [
            {
              title: 'Number of new chats per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(shieldy.chatDaily),
            },
          ]
        : []
    },
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
    description: () => {
      const {
        projectsData: { temply },
      } = useSnapshot(baseProjectsData)
      return [
        'Inline Telegram bot for saving reusable text templates and quickly inserting them later. Useful for support work, channel admins, and repeated replies.',
        hasPositiveNumbers(temply?.userCount, temply?.templatesCount) &&
          `Temply has ${formatNumber(
            temply?.userCount
          )} users who created ${formatNumber(
            temply?.templatesCount
          )} templates.`,
        "It's [open source](https://github.com/backmeupplz/temply).",
      ]
    },
    charts: () => {
      const {
        projectsData: { temply },
      } = useSnapshot(baseProjectsData)
      return temply
        ? [
            {
              title: 'Number of new users per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(temply.userDaily),
            },
          ]
        : []
    },
  },
  {
    title: 'Please, no',
    code: 'pleaseno',
    link: 'https://pleaseno.me',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/please-no',
        name: 'Product Hunt: Please, no',
      },
    ],
    description: () => [
      'A tiny webpage for answering with "Please, no" when that is the whole message.',
      "It's [open source](https://github.com/backmeupplz/pleaseno).",
    ],
    charts: () => {
      const {
        projectsData: { pleaseno },
      } = useSnapshot(baseProjectsData)
      return pleaseno
        ? [
            {
              title: 'Pleaseno.me visits',
              data: cloudflareStatsToLabelsAndDatasets(pleaseno),
            },
          ]
        : []
    },
  },
]

export default projects
