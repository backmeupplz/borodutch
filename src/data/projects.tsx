import { BodyText, Link } from 'components/Text'
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
        link: 'https://spark.ru/startup/voicy/blog/19008/kak-zapustit-proekt-v-odinochku/',
        name: 'Spark: Личный опыт: как запустить проект в одиночку',
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
      return (
        <>
          <BodyText>
            Voicy is a Telegram bot that converts speech to text from any voice
            messages and audio files it receives. This is one of my favorite pet
            projects. It supports over 100 languages and works with either Wit
            or Google speech recognition neural networks.
          </BodyText>
          <BodyText>
            Voicy is currently installed at{' '}
            {formatNumber(voicy.stats.chatCount)} chats, recognized{' '}
            {formatNumber(voicy.stats.voiceCount)} voice messages resulting in{' '}
            {(voicy.stats.duration / 60 / 60 / 24 / 365).toFixed(2)} years of
            speech.
          </BodyText>
          <BodyText>
            If you see that the average response delay is too high — it's
            probably Telegram servers not giving the bot fresh updates, it
            happens from time to time. It's{' '}
            <Link url="https://github.com/backmeupplz/voicy">open source</Link>.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { voicy },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Number of new chats per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(voicy.stats.chatDailyStats),
        },
        {
          title: 'Number of messages received per day',
          data: messageStatsToLabelsAndDatasets(voicy.stats.messageStats),
        },
        {
          title: 'Number of voice messages recognized per hour vs hours ago',
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
        name: 'Market Watch',
        link: 'https://www.marketwatch.com/press-release/borodutch-labs-nikita-kolmogorov-sells-shieldy-with-20m-users-to-1inch-network-in-the-largest-telegram-bot-deal-so-far-2021-06-05',
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
      return (
        <>
          <BodyText>
            Anti-spam Telegram bot that stops 99.99% of annoying spammers by
            asking users to go through a very simple captcha-like process and
            restricting newcomers to only being able to send text (no media).
            Completely free and{' '}
            <Link url="https://github.com/1inch/shieldy">open source</Link>.
          </BodyText>
          <BodyText>
            Shieldy is used by {formatNumber(shieldy.chatCount)} chats. It got
            acquired by 1inch Network in June 2021.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { shieldy },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Number of new chats per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(shieldy.chatDaily),
        },
      ]
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
      return (
        <>
          <BodyText>
            Telegram votekick bot. Allows to fight spammers or introduce
            democracy to chats by allowing users to vote for kicking specific
            members. Completely free and{' '}
            <Link url="https://github.com/backmeupplz/banofbot">
              open source
            </Link>
            .
          </BodyText>
          <BodyText>
            Banofbot was used to create {formatNumber(banofbot.requestCount)}{' '}
            votekick requests in {formatNumber(banofbot.chatCount)} chats.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { banofbot },
      } = useSnapshot(baseProjectsData)
      return [
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
      return (
        <>
          <BodyText>
            Telegram raffle bot that allows channel and group admins to execute
            raffles with prizes among chat members or channel subscribers.
            Completely free and{' '}
            <Link url="https://github.com/backmeupplz/randymbot">
              open source
            </Link>
            .
          </BodyText>
          <BodyText>
            Randy was used in {formatNumber(randym.chatCount)} chats to execute{' '}
            {formatNumber(randym.raffleCount)} raffles.
          </BodyText>
        </>
      )
    },
  },
  {
    title: 'Dosu',
    code: 'dosu',
    link: 'https://dosu.io',
    description: () => {
      return (
        <>
          <BodyText>
            Pseudoanonymous platform to share your thoughts with the world.
            Secure, legal, free from hate speech. More info in the{' '}
            <Link url="https://invest.borodutch.com/55m-users-voicy-is-on-sale/">
              blog post
            </Link>
            .
          </BodyText>
        </>
      )
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
      return (
        <>
          <BodyText>
            Todorant is the only todo manager you will ever need again. It
            doesn't just help you to keep track of tasks, it manages them for
            you. Based on "Getting Things Done", "Willpower" and "Eat That Frog"
            books.
          </BodyText>
          <BodyText>
            Users on Todorant created {formatNumber(todorant.db.todoCount)}{' '}
            todos.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { todorant },
      } = useSnapshot(baseProjectsData)
      return [
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
      return (
        <>
          <BodyText>
            This bot deletes all nude pictures so that groups don't get banned
            by Telegram for explicit content. Simply add it to a group, give it
            admin rights to delete messages and you are done! Completely free
            and{' '}
            <Link url="https://github.com/backmeupplz/DeleteNudesBot">
              open source
            </Link>
            .
          </BodyText>
          <BodyText>
            DeleteNudesBot protects {formatNumber(deletenudesbot.chatCount)}{' '}
            chats.
          </BodyText>
        </>
      )
    },
  },
  {
    title: 'Feedr',
    code: 'feedr',
    link: 'https://feedr.chat',
    description: () => {
      const {
        projectsData: { feedr },
      } = useSnapshot(baseProjectsData)
      return (
        <>
          <BodyText>
            Feedr is a simple multi-channel support desk. Feedr users configured{' '}
            {feedr.db.botCount} bots.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { feedr },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Number of new users per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(feedr.db.userDaily),
        },
        {
          title: 'Number of new bots per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(feedr.db.botDaily),
        },
      ]
    },
  },
  {
    title: 'Golden Borodutch',
    code: 'goldenBorodutch',
    link: 'https://t.me/golden_borodutch',
    description: () => {
      const {
        projectsData: { goldenBorodutch },
      } = useSnapshot(baseProjectsData)
      return (
        <>
          <BodyText>
            It's my personal micro-blog with{' '}
            {formatNumber(goldenBorodutch.subCount)} subscribers. Nothing
            special, just some thoughts about business, IT, development, book
            reviews, lifestyle facts, etc. Careful: it's in Russian. If you want
            to read my long reads in English, here's{' '}
            <Link url="https://blog.borodutch.com">
              a link to my English blog
            </Link>
            .
          </BodyText>
        </>
      )
    },
  },
  {
    title: 'Check my text bot',
    code: 'speller',
    link: 'https://t.me/check_my_text_bot',
    description: () => {
      return (
        <>
          <BodyText>
            Spellcheck Telegram bot. Just add it to your channel, active in
            private messages and get notified of any typos you post! Completely
            free and{' '}
            <Link url="https://github.com/backmeupplz/check_my_text_bot">
              open source
            </Link>
            .
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { checkMyTextBot },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Number of new users per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(checkMyTextBot.userDaily),
        },
      ]
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
      return (
        <>
          <BodyText>
            Telegram clicker-bot with internal currency and fancy duels. It's
            like cookie clicker, but in Telegram and with competitive element.
            Completely free and{' '}
            <Link url="https://github.com/backmeupplz/tlgcoin">
              open source
            </Link>
            .
          </BodyText>
          <BodyText>
            TLGCoin users mined {formatNumber(tlgcoin.coinsCount)} coins.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { tlgcoin },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Number of new users per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(tlgcoin.userDaily),
        },
      ]
    },
  },
  {
    title: 'Borodutch',
    code: 'borodutch',
    link: 'https://borodutch.com',
    description: () => {
      return (
        <>
          <BodyText>
            This is this website! Quite spectacular that you can check the
            requests to it as well in 21st century, right? Don't expect it to
            have many hits though as it's mainly visited by myself to check on
            the projects metrics.
          </BodyText>
          <BodyText>
            It's open source. Here's the code for{' '}
            <Link url="https://github.com/backmeupplz/borodutch">
              the website
            </Link>{' '}
            and for{' '}
            <Link url="https://github.com/backmeupplz/borodutch-stats">
              the stats server
            </Link>
          </BodyText>
        </>
      )
    },
  },
  {
    title: 'Temply',
    code: 'temply',
    link: 'https://t.me/temply_bot',
    description: () => {
      const {
        projectsData: { temply },
      } = useSnapshot(baseProjectsData)
      return (
        <>
          <BodyText>
            Inline Telegram bot allowing users to create varios text templates
            an quickly use them later. Pretty useful for support workers as well
            as channel administrators. Completely free and{' '}
            <Link url="https://github.com/backmeupplz/temply">open source</Link>
            .
          </BodyText>
          <BodyText>
            Temply users created {formatNumber(temply.templatesCount)}{' '}
            templates.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { temply },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Number of new users per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(temply.userDaily),
        },
      ]
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
      return (
        <>
          <BodyText>
            Freelance market as a Telegram bot with a twist. Instead of
            releasing the job to all the candidates on the platform, employers
            pick freelancers they like and freelancers only see employers'
            profiles if they get accepted. Completely free and{' '}
            <Link url="https://github.com/arbeitbot">open source</Link>.
          </BodyText>
          <BodyText>
            ArbeitBot users created {formatNumber(arbeitbot.jobCount)} jobs.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { arbeitbot },
      } = useSnapshot(baseProjectsData)
      return [
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
    },
  },
  {
    title: 'Localizer',
    code: 'localizer',
    link: 'https://localizer.dev',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/localizer',
        name: 'Product Hunt: Localizer',
      },
    ],
    description: () => {
      return (
        <>
          <BodyText>
            A free open-source self-hosted crowd-translating service. Check out
            examples at{' '}
            <Link url="https://localize.todorant.com">
              localize.todorant.com
            </Link>{' '}
            and{' '}
            <Link url="https://localize.borodutch.com">
              localize.borodutch.com
            </Link>
            . It is also{' '}
            <Link url="https://github.com/backmeupplz/localizer-backend">
              open source
            </Link>
            .
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { localizer },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Localizer.dev visits',
          data: cloudflareStatsToLabelsAndDatasets(localizer),
        },
      ]
    },
  },
  {
    title: 'Post Your Startup',
    code: 'postyourstartup',
    link: 'https://postyourstartup.com',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/post-your-startup',
        name: 'Product Hunt: Post Your Startup',
      },
    ],
    description: () => {
      return (
        <>
          <BodyText>
            A list of over 120 places to post your startup. I went through{' '}
            <Link url="https://www.placestopostyourstartup.com">
              placestopostyourstartup.com
            </Link>
            , posted Todorant everywhere and left notes along the way. You can
            sort and filter the result any way you want. It is also{' '}
            <Link url="https://github.com/backmeupplz/postyourstartup">
              open source
            </Link>
            .
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { postyourstartup },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Postyourstartup.com visits',
          data: cloudflareStatsToLabelsAndDatasets(postyourstartup),
        },
      ]
    },
  },
  {
    title: 'Mamkin Trade',
    code: 'mt',
    link: 'https://mamkin.trade',
    publications: [
      {
        link: 'https://www.producthunt.com/posts/mamkin-trade',
        name: 'Product Hunt: Mamkin Trade',
      },
      {
        link: 'https://vc.ru/dev/68012-kak-ya-zapustil-simulyator-torgov-kriptoy-mamkin-treyder-za-dve-nedeli',
        name: 'VC: Как я запустил симулятор торгов криптой «Мамкин Трейдер» за две недели',
      },
    ],
    description: () => {
      return (
        <>
          <BodyText>
            Mamkin Trade is a crypto and stocks virtual trading platform,
            officially declared to be safe for your mental health. Completely
            free and{' '}
            <Link url="https://github.com/mamkin-trade">open source</Link>.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { mt },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Number of new users per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(mt.userDaily),
        },
        {
          title: 'Number of new orders per day vs days ago',
          data: dailyStatsToLabelsAndDatasets(mt.orderDaily),
        },
      ]
    },
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
        link: 'https://coinnewsnation.com/2018/08/this-app-makes-it-super-easy-to-write-smart-contracts-for-ethereum/',
        name: 'CoinNews Nation: This app makes it super easy to write smart contracts for Ethereum',
      },
      {
        link: 'https://www.chepicap.com/en/news/2745/new-fondu-app-lets-users-create-ethereum-smart-contracts-more-easily.html',
        name: 'Chepicap: New Fondu app lets users create Ethereum smart contracts more easily',
      },
      {
        link: 'https://cryptodaily.co.uk/2018/08/building-your-own-cryptocurrency-on-the-ethereum-blockchain-just-got-easier',
        name: 'CryptoDaily: Building Your Own Cryptocurrency On The Ethereum Blockchain Just Got Easier',
      },
    ],
    description: () => {
      return (
        <>
          <BodyText>
            ERC-20 Ethereum smart-contract builder. Completely free and{' '}
            <Link url="https://github.com/backmeupplz/fondu">open source</Link>.
            Hosted on the GitHub Pages.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { fondu },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Fondu.io visits',
          data: cloudflareStatsToLabelsAndDatasets(fondu),
        },
      ]
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
    description: () => {
      return (
        <>
          <BodyText>
            A simple webpage that has two pages: one just shows "Please, no"
            text, another also shows a "Please, no" GIF. I use it when I can
            simply answer "Please, no" to particular things. Completely free and{' '}
            <Link url="https://github.com/backmeupplz/pleaseno">
              open source
            </Link>
            . Hosted on the GitHub Pages as well.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { pleaseno },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Pleaseno.me visits',
          data: cloudflareStatsToLabelsAndDatasets(pleaseno),
        },
      ]
    },
  },
  {
    title: 'ResetBot',
    code: 'resetbot',
    link: 'https://resetbot.com',
    description: () => {
      return (
        <>
          <BodyText>
            This website is intended to reset your Telegram bot getUpdates
            method. Useful, when bot updates get stuck for some unknown reason.{' '}
            <Link url="https://github.com/backmeupplz/reset-bot">
              Open source
            </Link>
            .
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { resetbot },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Resetbot.com visits',
          data: cloudflareStatsToLabelsAndDatasets(resetbot),
        },
      ]
    },
  },
  {
    title: 'Fix sleep',
    code: 'fixsleep',
    link: 'https://fixsleep.link',
    description: () => {
      return (
        <>
          <BodyText>
            A simple webpage with 17 rules on how to sleep better. I spent
            multiple years researching all the available literature and
            knowledge on why we sleep and how to improve the quality of sleep.
            I've built this short version with links to scientific papers to
            share with family and friends because not everybody likes reading
            long articles.
          </BodyText>
          <BodyText>
            Completely free and{' '}
            <Link url="https://github.com/backmeupplz/fixsleep">
              open source
            </Link>
            . Hosted on the GitHub Pages.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { fixsleep },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Fixsleep.link visits',
          data: cloudflareStatsToLabelsAndDatasets(fixsleep),
        },
      ]
    },
  },
  {
    title: 'Bot finder',
    code: 'botfinder',
    link: 'https://bot-finder.com',
    publications: [
      {
        link: 'https://vc.ru/tribuna/226020-eto-bot-rasshirenie-dlya-brauzera-pokazyvayushchee-bolshe-informacii-o-kommentatorah-na-vc-ru',
        name: 'VC: «Это бот?» — расширение для браузера, показывающее больше информации о комментаторах на vc.ru',
      },
    ],
    description: () => {
      return (
        <>
          <BodyText>
            A browser extension that allows you to see registration date,
            ratings, number of comments and published articles of commentators
            on vc.ru, TJournal and DTF. Fully{' '}
            <Link url="https://github.com/backmeupplz/bot-finder">
              open source
            </Link>
            .
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { botfinder },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Bot-finder.com visits',
          data: cloudflareStatsToLabelsAndDatasets(botfinder),
        },
      ]
    },
  },
  {
    title: 'Borodutch Club',
    code: 'borodutchclub',
    link: 'https://club.borodutch.com',
    description: () => {
      return (
        <>
          <BodyText>
            I tried joining many communities of people who launch their products
            to find the one where the quality of members is high. All of them
            start fine but then suffer from an influx of "wannabes".
          </BodyText>

          <BodyText>
            So I decided to start my closed community of product people who love
            to launch MVP's quickly and try out various business hypotheses. As
            usual, both the{' '}
            <Link url="https://github.com/backmeupplz/borodutch-club">
              frontend
            </Link>{' '}
            and the{' '}
            <Link url="https://github.com/backmeupplz/borodutch-club-backend">
              backend
            </Link>{' '}
            are open source.
          </BodyText>
        </>
      )
    },
  },
  {
    title: 'Magic pill',
    code: 'magicpill',
    link: 'https://magicpill.link',
    description: () => {
      return (
        <>
          <BodyText>
            A simple webpage listing benefits of reducing animal product intake
            based on scientific evidence. Just like with Fix sleep, I built this
            website to share it with people close to me. To save them time by
            researching this subject for them.
          </BodyText>
          <BodyText>
            Completely free and{' '}
            <Link url="https://github.com/backmeupplz/magicpill">
              open source
            </Link>
            . Hosted on the GitHub Pages.
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { magicpill },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Magicpill.link visits',
          data: cloudflareStatsToLabelsAndDatasets(magicpill),
        },
      ]
    },
  },
  {
    title: 'CommonCrypto',
    code: 'commoncrypto',
    link: 'https://commoncrypto.dev',
    description: () => {
      return (
        <>
          <BodyText>
            Free to use public API that provides all the tickers for 65+ crypto
            exchanges. I found the lack of such API disturbing so I created one.
            Feel free to use for any reason!
          </BodyText>
          <BodyText>
            Completely free and{' '}
            <Link url="https://github.com/Borodutch/commoncrypto-backend">
              open source
            </Link>
            .
          </BodyText>
        </>
      )
    },
    charts: () => {
      const {
        projectsData: { commoncrypto },
      } = useSnapshot(baseProjectsData)
      return [
        {
          title: 'Commoncrypto.dev visits',
          data: cloudflareStatsToLabelsAndDatasets(commoncrypto),
        },
      ]
    },
  },
  {
    title: 'Crypto Granny',
    code: 'cryptogranny',
    link: 'https://t.me/CryptoGrannyFree',
    description: () => {
      return (
        <>
          <BodyText>
            Automated alerts when there is enough difference in price between
            crypto exchanges (including decentralized exchanges) to make a few
            percents arbitraging coins between them. Supports the most popular
            exchanges and works 24/7.
          </BodyText>
        </>
      )
    },
  },
  {
    title: 'NFT ru',
    code: 'nftru',
    link: 'https://nft-ru.com',
    description: () => {
      return (
        <>
          <BodyText>
            Community of Russian-speaking NFT project founders without wannabes
            and constant noise from cofounder-seekers.
          </BodyText>
        </>
      )
    },
  },
  {
    title: 'Is Bot Down',
    code: 'isbotdown',
    link: 'https://isbotdown.com',
    description: () => {
      return (
        <>
          <BodyText>
            A Telegram-bot uptime checker. Notifies users when their bots go
            down and come back up again.
          </BodyText>
        </>
      )
    },
  },
]

export default projects