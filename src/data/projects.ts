import { projectsData as baseProjectsData } from 'helpers/projectsData'
import { useSnapshot } from 'valtio'
import Project from 'models/Project'
import cloudflareStatsToLabelsAndDatasets from 'helpers/cloudflareStatsToLabelsAndDatasets'
import dailyStatsToLabelsAndDatasets from 'helpers/dailyStatsToLabelsAndDatasets'
import formatNumber from 'helpers/formatNumber'
import messageStatsToLabelsAndDatasets from 'helpers/messageStatsToLabelsAndDatasets'

const projects: Project[] = [
  {
    title: 'Pigeon',
    code: 'pigeon',
    link: 'https://pigeon.trade',
    description: () => [
      'AI trading assistant for the places people already talk: Telegram, WhatsApp, Discord, Messenger, Farcaster, Base App, XMTP, X, Reddit, Slack, and phone.',
      'It can trade stocks, crypto, ETFs, memecoins, smart contracts, Polymarket, Ostium, Hyperliquid, and more without installing a new app.',
    ],
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
        !!voicy &&
          `Voicy is installed in ${formatNumber(
            voicy.stats.chatCount
          )} chats and has recognized ${formatNumber(
            voicy.stats.voiceCount
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
    title: 'Symphony',
    code: 'symphony',
    link: 'https://github.com/backmeupplz/symphony',
    description: () => [
      'Agentic development runner that watches Kaneo, routes each task to the right repo, starts Codex in an isolated workspace, and keeps validation and PR handoff explicit.',
      'This is the boring delivery loop behind the current projects.',
    ],
  },
  {
    title: 'Friday',
    code: 'friday',
    link: 'https://t.me/frdy_bot',
    description: () => [
      'Telegram bot that searches the web and streams AI answers live. It uses grammY, Fireworks AI, and a self-hosted SearXNG setup.',
      "It's [open source](https://github.com/backmeupplz/telegram-ai-searcher).",
    ],
  },
  {
    title: 'Omens',
    code: 'omens',
    link: 'https://github.com/backmeupplz/omens',
    description: () => [
      'AI-filtered X feed for getting signal from noisy timelines without doomscrolling the raw feed.',
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
        !!banofbot &&
          `Banofbot has handled ${formatNumber(
            banofbot.requestCount
          )} votekick requests in ${formatNumber(banofbot.chatCount)} chats.`,
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
        !!randym &&
          `Randy has run ${formatNumber(
            randym.raffleCount
          )} raffles in ${formatNumber(randym.chatCount)} chats.`,
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
        !!todorant &&
          `Users on Todorant created ${formatNumber(
            todorant.db.todoCount
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
        !!shieldy &&
          `Shieldy is used by ${formatNumber(shieldy.chatCount)} chats.`,
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
      'This website: simple profile, current projects, recent writing, and lightweight stats first.',
      "It's open source: [website](https://github.com/backmeupplz/borodutch), [stats server](https://github.com/backmeupplz/borodutch-stats).",
    ],
  },
]

export default projects
