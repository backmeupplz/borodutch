import { projectsData as baseProjectsData } from 'helpers/projectsData'
import { useSnapshot } from 'valtio'
import Project from 'models/Project'
import cloudflareStatsToLabelsAndDatasets from 'helpers/cloudflareStatsToLabelsAndDatasets'
import dailyStatsToLabelsAndDatasets from 'helpers/dailyStatsToLabelsAndDatasets'
import formatNumber from 'helpers/formatNumber'
import messageStatsToLabelsAndDatasets from 'helpers/messageStatsToLabelsAndDatasets'
import responseTimeToLabelsAndDatasets from 'helpers/responseTimeToLabelsAndDatasets'

const projects: Project[] = [
  {
    title: '$eggs',
    code: 'eggs',
    link: 'https://warpcast.com/warpcastadmin.eth/0x5ff68a23',
    description: () => [
      '$eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs',
    ],
  },
  {
    title: 'Voicy',
    code: 'voicy',
    link: 'https://t.me/voicybot',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/voicy',
        name: 'Product Hunt: Voicy',
      },
      {
        link: 'https://habr.com/ru/post/316824/',
        name: 'Habr: Рецепт разработки бота под Telegram',
      },
      {
        link: 'https://vc.ru/flood/21082-telegram-bot-growth',
        name: 'VC: Кейс из России: Как мы без бюджета раскрутили два Telegram-бота до 17 500 чатов',
      },
    ],
    description: () => {
      const {
        projectsData: { voicy },
      } = useSnapshot(baseProjectsData)
      return [
        'Voicy is a Telegram bot that converts speech to text from any voice messages and audio files it receives. This is one of my favorite pet projects. It supports over 100 languages and works with either Wit or Google speech recognition neural networks.',
        !!voicy &&
          `Voicy is currently installed at ${formatNumber(
            voicy.stats.chatCount
          )} chats, recognized ${formatNumber(
            voicy.stats.voiceCount
          )} voice messages resulting in ${(
            voicy.stats.duration /
            60 /
            60 /
            24 /
            365
          ).toFixed(2)} years of
              speech.`,
        "If the average response delay is too high — it's probably because Telegram servers are not giving the bot fresh updates. It happens from time to time. It's [open source](https://github.com/backmeupplz/voicy).",
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
              title: 'Response time in seconds',
              data: responseTimeToLabelsAndDatasets(voicy.stats.responseTime),
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
    title: 'Shieldy',
    code: 'shieldy',
    link: 'https://t.me/shieldy_bot',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/shieldy',
        name: 'Product Hunt: Shieldy',
      },
      {
        link: 'https://blog.borodutch.com/shieldy-got-acquired-by-1inch-exchange/',
        name: 'Shieldy got acquired by 1inch Network',
      },
      {
        name: 'Business Wire',
        link: 'https://www.businesswire.com/news/home/20210605005015/en/Borodutch-Labs%E2%80%99-Nikita-Kolmogorov-Sells-Shieldy-with-20M-Users-to-1inch-Network-in-the-Largest-Telegram-Bot-Deal-so-Far',
      },
      {
        name: 'Financial Post',
        link: 'https://financialpost.com/pmn/press-releases-pmn/business-wire-news-releases-pmn/borodutch-labs-nikita-kolmogorov-sells-shieldy-with-20m-users-to-1inch-network-in-the-largest-telegram-bot-deal-so-far',
      },
      {
        name: 'Financial Content',
        link: 'https://markets.financialcontent.com/stocks/news/read?GUID=41432815',
      },
      {
        name: 'Street Insider',
        link: 'https://www.streetinsider.com/Business+Wire/Borodutch+Labs%E2%80%99+Nikita+Kolmogorov+Sells+Shieldy+with+20M+Users+to+1inch+Network+in+the+Largest+Telegram+Bot+Deal+so+Far/18524977.html',
      },
      {
        name: 'Townhall Finance',
        link: 'https://markets.financialcontent.com/townhall/news/read?GUID=41432815',
      },
      {
        name: 'WRAL.com',
        link: 'https://markets.financialcontent.com/wral/news/read?GUID=41432815',
      },
      {
        name: 'yahoo!finance',
        link: 'https://ca.finance.yahoo.com/news/borodutch-labs-nikita-kolmogorov-sells-160700214.html',
      },
    ],
    description: () => {
      const {
        projectsData: { shieldy },
      } = useSnapshot(baseProjectsData)
      return [
        'Anti-spam Telegram bot that stops 99.99% of annoying spammers by asking users to go through a straightforward captcha-like process and restricting newcomers to only being able to send text (no media). Completely free and [open source](https://github.com/1inch/shieldy).',
        !!shieldy &&
          `Shieldy is used by ${formatNumber(
            shieldy.chatCount
          )} chats. It got acquired by 1inch Network in June 2021.`,
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
    title: 'Banofbot',
    code: 'banofbot',
    link: 'https://t.me/banofbot',
    description: () => {
      const {
        projectsData: { banofbot },
      } = useSnapshot(baseProjectsData)
      return [
        'Telegram votekick bot. Allows to fight spammers or introduce democracy to chats by enabling users to vote for kicking specific members — completely free and [open source](https://github.com/backmeupplz/banofbot).',
        !!banofbot &&
          `Banofbot was used to create ${formatNumber(
            banofbot.requestCount
          )} votekick requests in ${formatNumber(banofbot.chatCount)} chats.`,
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
        'Telegram raffle bot that allows channel and group admins to execute raffles with prizes among chat members or channel subscribers. Completely free and [open source](https://github.com/backmeupplz/randymbot).',
        !!randym &&
          `Randy was used in ${formatNumber(
            randym.chatCount
          )} chats to execute ${formatNumber(randym.raffleCount)} raffles.`,
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
        'Todorant is the only todo manager you will ever need again. It doesn\'t just help you to keep track of tasks. It manages them for you. Based on "Getting Things Done," "Willpower," and "Eat That Frog" books.',
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
    title: 'DeleteNudesBot',
    code: 'deletenudesbot',
    link: 'https://t.me/DeleteNudesBot',
    description: () => {
      const {
        projectsData: { deletenudesbot },
      } = useSnapshot(baseProjectsData)
      return [
        "This bot deletes all nude pictures so that groups don't get banned by Telegram for explicit content. Simply add it to a group, give it admin rights to delete messages and you are done! Completely free and [open source](https://github.com/backmeupplz/DeleteNudesBot).",
        !!deletenudesbot &&
          `DeleteNudesBot protects ${formatNumber(
            deletenudesbot.chatCount
          )} chats.`,
      ]
    },
  },
  {
    title: 'Check my text bot',
    code: 'speller',
    link: 'https://t.me/check_my_text_bot',
    description: () => [
      'Spellcheck Telegram bot. Just add it to your channel, active in private messages, and get notified of any typos you post! Completely free and [open source](https://github.com/backmeupplz/check_my_text_bot).',
    ],
    charts: () => {
      const {
        projectsData: { checkMyTextBot },
      } = useSnapshot(baseProjectsData)
      return checkMyTextBot
        ? [
            {
              title: 'Number of new users per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(checkMyTextBot.userDaily),
            },
          ]
        : []
    },
  },
  {
    title: 'TLGCoin',
    code: 'tlgcoin',
    link: 'https://t.me/tlgcoin_bot',
    description: () => {
      const {
        projectsData: { tlgcoin },
      } = useSnapshot(baseProjectsData)
      return [
        "Telegram clicker-bot with internal currency and fancy duels. It's like the cookie clicker but in Telegram and with a competitive element. Completely free and [open source](https://github.com/backmeupplz/tlgcoin).",
        !!tlgcoin &&
          `TLGCoin users mined ${formatNumber(tlgcoin.coinsCount)} coins.`,
      ]
    },
    charts: () => {
      const {
        projectsData: { tlgcoin },
      } = useSnapshot(baseProjectsData)
      return tlgcoin
        ? [
            {
              title: 'Number of new users per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(tlgcoin.userDaily),
            },
          ]
        : []
    },
  },
  {
    title: 'Borodutch',
    code: 'borodutch',
    link: 'https://borodutch.com',
    description: () => [
      "This is this website! It is spectacular that you can also check its requests in the 21st century. Expect it to have a few hits, though, as it's mainly visited by myself to review the project metrics.",
      "It's open source. Here's the code for [the website](https://github.com/backmeupplz/borodutch) and [the stats server](https://github.com/backmeupplz/borodutch-stats)",
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
        'Inline Telegram bot that allows users to create various text templates and quickly use them later. Pretty useful for support workers as well as channel administrators. Completely free and [open source](https://github.com/backmeupplz/temply).',
        !!temply &&
          `Temply users created ${formatNumber(
            temply.templatesCount
          )} templates.`,
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
    title: 'ArbeitBot',
    code: 'arbeitBot',
    link: 'https://t.me/arbeit_bot',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/arbeitbot',
        name: 'Product Hunt: ArbeitBot',
      },
      {
        link: 'https://habr.com/ru/post/310434/',
        name: 'Habr: Как мы написали фриланс-биржу для Telegram',
      },
      {
        link: 'https://spark.ru/startup/arbeitbot/blog/18257/kak-arbeitbot-poluchil-pervie-1250-ustanovok',
        name: 'Spark: Как ArbeitBot получил первые 1250 установок',
      },
      {
        link: 'https://vc.ru/flood/21082-telegram-bot-growth',
        name: 'VC: Кейс из России: Как мы без бюджета раскрутили два Telegram-бота до 17 500 чатов',
      },
      {
        link: 'https://vc.ru/tribuna/19537-arbeitbot',
        name: 'VC: Arbeitbot — бесплатная фриланс-биржа в Telegram',
      },
    ],
    description: () => {
      const {
        projectsData: { arbeitbot },
      } = useSnapshot(baseProjectsData)
      return [
        "Freelance market as a Telegram bot with a twist. Instead of releasing the job to all the candidates on the platform, employers pick freelancers they like, and freelancers only see employers' profiles if they get accepted. Completely free and [open source](https://github.com/arbeitbot).",
        !!arbeitbot &&
          `ArbeitBot users created ${formatNumber(arbeitbot.jobCount)} jobs.`,
      ]
    },
    charts: () => {
      const {
        projectsData: { arbeitbot },
      } = useSnapshot(baseProjectsData)
      return arbeitbot
        ? [
            {
              title: 'Number of new users per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(arbeitbot.userDaily),
            },
            {
              title: 'Number of new jobs per day vs days ago',
              data: dailyStatsToLabelsAndDatasets(arbeitbot.jobDaily),
            },
            {
              title: 'ArbeitBot.com visits',
              data: cloudflareStatsToLabelsAndDatasets(arbeitbot.website),
            },
          ]
        : []
    },
  },
  {
    title: 'CAS Ban Checker',
    code: 'casBanChecker',
    link: 'https://t.me/cas_ban_bot',
    description: () => [
      'Bot that checks whether a user is banned by [CAS](https://cas.chat). It is also [open source](https://github.com/backmeupplz/cas_ban_bot).',
    ],
  },
  {
    title: 'Fondu',
    code: 'fondu',
    link: 'https://fondu.io',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/fondu',
        name: 'Product Hunt: Fondu',
      },
      {
        link: 'https://www.bitrates.com/news/p/fondu-lets-anyone-write-ethereum-smart-contracts-no-programming-experience-needed',
        name: 'Bitrates: Fondu Lets Anyone Write Ethereum Smart Contracts, No Programming Experience Needed',
      },
      {
        link: 'https://thenextweb.com/hardfork/2018/08/07/smart-contracts-blockchain-ethereum/',
        name: 'The New Web: This app makes writing Ethereum smart contracts super easy, perhaps too easy',
      },
      {
        link: 'https://cryptodaily.co.uk/2018/08/building-your-own-cryptocurrency-on-the-ethereum-blockchain-just-got-easier',
        name: 'CryptoDaily: Building Your Own Cryptocurrency On The Ethereum Blockchain Just Got Easier',
      },
    ],
    description: () => [
      'ERC-20 Ethereum smart-contract builder. Completely free and [open source](https://github.com/backmeupplz/fondu). Hosted on the GitHub Pages.',
    ],
    charts: () => {
      const {
        projectsData: { fondu },
      } = useSnapshot(baseProjectsData)
      return fondu
        ? [
            {
              title: 'Fondu.io visits',
              data: cloudflareStatsToLabelsAndDatasets(fondu),
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
      'A simple webpage with two pages: one shows "Please, no" text, and another also shows a "Please, no" GIF. I use it when I can answer "Please, no" to particular things. Completely free and [open source](https://github.com/backmeupplz/pleaseno). Hosted on the GitHub Pages as well.',
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
  {
    title: 'ResetBot',
    code: 'resetbot',
    link: 'https://resetbot.com',
    description: () => [
      'This website is intended to reset your Telegram bot getUpdates method. Useful when bot updates get stuck for some unknown reason. [Open source](https://github.com/backmeupplz/reset-bot).',
    ],
    charts: () => {
      const {
        projectsData: { resetbot },
      } = useSnapshot(baseProjectsData)
      return resetbot
        ? [
            {
              title: 'Resetbot.com visits',
              data: cloudflareStatsToLabelsAndDatasets(resetbot),
            },
          ]
        : []
    },
  },
  {
    title: 'Fix sleep',
    code: 'fixsleep',
    link: 'https://fixsleep.link',
    description: () => [
      "A simple webpage with 17 rules on how to sleep better. I spent multiple years researching all the available literature and knowledge on why we sleep and how to improve sleep quality. I've built this short version with links to scientific papers to share with family and friends because not everybody likes reading long articles.",
      'Completely free and [open source](https://github.com/backmeupplz/fixsleep). Hosted on the GitHub Pages.',
    ],
    charts: () => {
      const {
        projectsData: { fixsleep },
      } = useSnapshot(baseProjectsData)
      return fixsleep
        ? [
            {
              title: 'Fixsleep.link visits',
              data: cloudflareStatsToLabelsAndDatasets(fixsleep),
            },
          ]
        : []
    },
  },
  {
    title: 'Borodutch Club',
    code: 'borodutchclub',
    link: 'https://club.borodutch.com',
    description: () => [
      'I tried many communities of people who launched their products to find one where the quality of members is high. All of them start OK but then suffer from an influx of "wannabes."',
      'So I started my closed community of product people who love to launch MVPs quickly and try out various business hypotheses. As usual, both the [frontend](https://github.com/backmeupplz/borodutch-club) and the [backend](https://github.com/backmeupplz/borodutch-club-backend) are open source.',
    ],
  },
  {
    title: 'Magic pill',
    code: 'magicpill',
    link: 'https://magicpill.link',
    description: () => [
      'A simple webpage listing benefits of reducing animal product intake based on scientific evidence. like with Fix Sleep, I built this website to share it with people close to me. To save them time by researching this subject for them.',
      'Completely free and [open source](https://github.com/backmeupplz/magicpill). Hosted on the GitHub Pages.',
    ],
    charts: () => {
      const {
        projectsData: { magicpill },
      } = useSnapshot(baseProjectsData)
      return magicpill
        ? [
            {
              title: 'Magicpill.link visits',
              data: cloudflareStatsToLabelsAndDatasets(magicpill),
            },
          ]
        : []
    },
  },
  {
    title: 'Crypto Granny',
    code: 'cryptogranny',
    link: 'https://t.me/CryptoGrannyFree',
    description: () => [
      'Automated alerts when there is enough difference in price between crypto exchanges (including decentralized exchanges) to make a few percent arbitraging coins between them. Supports the most popular exchanges and works 24/7.',
    ],
  },
  {
    title: 'Is Bot Down',
    code: 'isbotdown',
    link: 'https://isbotdown.com',
    description: () => [
      'A Telegram-bot uptime checker. Notifies users when their bots go down and come back up again.',
    ],
  },
  {
    title: 'Video Download Bot',
    code: 'videoDownloadBot',
    link: 'https://t.me/VideoDownloadBot',
    description: () => [
      'Telegram bot that allows users to download the video from any link.',
      'I [acquired](https://t.me/borodutch_support/175) this bot in November 2021. It is [open source](https://github.com/Borodutch/VideoDownloadBot).',
    ],
  },
  {
    title: 'RemindMe',
    code: 'remindme',
    link: 'https://warpcast.com/remindme',
    description: () => [
      'Farcaster bot that reminds users about the casts after a time interval. It is [open source](https://github.com/backmeupplz/remindme).',
    ],
  },
  {
    title: 'Essay',
    code: 'essay',
    link: 'https://warpcast.com/essay',
    description: () => [
      'Farcaster bot that unwraps threads into screenshot essays. It is [open source](https://github.com/backmeupplz/essay).',
    ],
  },
  {
    title: 'MintIt',
    code: 'mintit',
    link: 'https://warpcast.com/mintit',
    description: () => [
      'A fun bot on Farcaster that mints casts as NFTs on Polygon. It is [open source](https://github.com/backmeupplz/mintit-backend).',
    ],
  },
  {
    title: 'ChatGPT Farcaster',
    code: 'chatgpt',
    link: 'https://warpcast.com/gpt',
    description: () => [
      'ChatGPT connected straight to Farcaster. It is [open source](https://github.com/backmeupplz/farcaster-chatgpt).',
    ],
  },
  {
    title: 'Health',
    code: 'health',
    link: 'https://warpcast.com/healthbot',
    description: () => [
      'Health bot on Farcaster that reminds people of good habits like straightening their backs. It is [open source](https://github.com/backmeupplz/health).',
    ],
  },
  {
    title: 'Farcantasy',
    code: 'farcantasy',
    link: 'https://farcantasy.xyz',
    description: () => [
      'NFT trading card game with Farcaster users as cards. [It](https://github.com/BigWhaleLabs/farcantasy-metadata) [is](https://github.com/BigWhaleLabs/farcantasy-frontend) fully [open source](https://github.com/BigWhaleLabs/farcantasy-contract).',
    ],
  },
]

export default projects
