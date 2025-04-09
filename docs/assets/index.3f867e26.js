var O=Object.defineProperty;var z=(e,o,s)=>o in e?O(e,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[o]=s;var S=(e,o,s)=>(z(e,typeof o!="symbol"?o+"":o,s),s);import{c as E,j as H,a as G,F as U,l as _,p as C,f as A,L as T,u as r,s as R,R as j,S as q}from"./vendor.3905a8cd.js";const V=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const m of c.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function s(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerpolicy&&(c.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?c.credentials="include":n.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(n){if(n.ep)return;n.ep=!0;const c=s(n);fetch(n.href,c)}};V();const a=E,B=[["#F09819","#EDDE5D","#F09819"],["rgb(236, 72, 153)","rgb(239, 68, 68)","rgb(245, 158, 11)"],["rgb(165, 180, 252)","rgb(192, 132, 252)"],["rgb(110, 231, 183)","rgb(59, 130, 246)","rgb(147, 51, 234)"],["rgb(110, 231, 183)","rgb(252, 211, 77)","rgb(249, 168, 212)"],["rgb(167, 243, 208)","rgb(52, 211, 153)","rgb(16, 185, 129)"],["rgb(147, 197, 253)","rgb(167, 243, 208)","rgb(252, 211, 77)"],["rgb(252, 211, 77)","rgb(220, 38, 38)"],["rgb(251, 113, 133)","rgb(217, 70, 239)","rgb(99, 102, 241)"],["rgb(251, 113, 133)","rgb(253, 186, 116)"],["rgb(153, 246, 228)","rgb(217, 249, 157)"],["rgb(139, 92, 246)","rgb(253, 186, 116)"]],p=B[Math.floor(Math.random()*B.length)],t=H,l=G,g=U,D=a("bg-gradient-to-tr","from-accent-start",p.length>2?"via-accent-via":void 0,"to-accent-end","text-transparent","bg-clip-text"),W=({children:e})=>t("span",{className:D,children:e}),J=a("text-white","text-lg","opacity-60","font-semibold"),Y=({children:e})=>t("p",{className:J,children:e}),K=a(D,"font-bold","text-4xl","md:text-7xl","py-8"),Q=({children:e})=>t("p",{className:K,children:e}),X=a(D,"font-bold","text-2xl","md:text-3xl","pt-4","pb-4"),$=({children:e})=>t("p",{className:X,children:e}),Z=a("text-white","font-bold","text-4xl","opacity-80"),ee=({children:e})=>t("p",{className:Z,children:e}),te=a("text-white","font-medium","text-3xl","opacity-50","pb-4"),oe=({children:e})=>t("p",{className:te,children:e}),se=a("text-white","opacity-80","mb-4"),f=({children:e})=>t("p",{className:se,children:e}),ne=a(D),b=({url:e,children:o})=>t("a",{className:ne,href:e,rel:"noopener noreferrer",target:"_blank",children:o}),ae=a(D),re=({children:e,onClick:o})=>t("button",{className:ae,onClick:o,children:e}),ie=a("text-white","text-2xl"),ce=({children:e})=>t("p",{className:ie,children:e}),le=a("text-white","text-xl","mb-2"),ue=({children:e})=>t("p",{className:le,children:e}),de=a("text-white","opacity-50"),he=({children:e})=>t("p",{className:de,children:e}),pe=a("text-white","opacity-80","text-lg","text-center","my-8"),me=({children:e})=>t("p",{className:pe,children:e}),ge=e=>a("relative",e?"pb-2":void 0),be=a("absolute","inset-0","w-full","h-full","bg-gradient-to-t","from-black","via-transparent"),fe=a("absolute","bottom-0","w-full","flex","flex-row","items-end","justify-center");function ye(){const[e,o]=_(!1);return l("div",{className:ge(!e),children:[t($,{children:"My story"}),t(f,{children:"Hi there! My name is Nikita, and I'm a serial product launcher. I'm half developer, half entrepreneur."}),l(f,{children:["I started as an iOS developer. Over the years, I've mastered backend, frontend, Android, React Native development, management, hiring, consulting, public speaking, and other soft skills. You can find my up-to-date tech stack in"," ",t(b,{url:"https://templates.borodutch.com",children:"the list of my code templates"}),"."]}),e?l(g,{children:[t(f,{children:"My mission is to bring value to the people around me. If I see a pain point, I try to fix it as soon as possible. Aside from my main tech stack, programming languages I use include Python, Ruby, Objective-C, Java, C, C++, Assembly, Bash, Groovy, Dart, JavaScript, Solidity, Circom, and some R. I host all of my servers on dedicated instances in the cloud running various Linux distros (mainly Debian based). I build hardware solutions for fun based on Raspberry Pi's and connect much random stuff to its GPIO. I'm fluent in Vue, React, and Angular. I'm fond of AI, ML, web3, and social. As per databases, I favor MongoDB (and PostgreSQL when it just has to be relational) on the server and WatermelonDB locally \u2014 always trying to be a step ahead of the current tech."}),t(f,{children:"Please, find my contacts, the list of the products I'm most proud of with some of their stats, and the list of publications on this page. Cheers!"})]}):l(g,{children:[t("div",{className:be}),t("div",{className:fe,children:t(re,{onClick:()=>o(!0),children:"Show more"})})]})]})}function we(){return l(g,{children:[t($,{children:"I wrote a book!"}),l(f,{children:["Can't wait to tell you this \u2014 I finally co-authored and published a book! You can buy it on"," ",t(b,{url:"https://book.bdut.ch",children:"the book's website"})," or"," ",t(b,{url:"https://a.co/d/8ALfLVd",children:"on Amazon"}),". Curious about how I got from zero to a published author? Check out"," ",t(b,{url:"https://blog.borodutch.com/heres-how-i-published-my-book",children:"my blog post"})," ","where I describe the process!"]}),t(ye,{}),t($,{children:"Ways to contribute"}),l(f,{children:["In case you want, you can always become a sponsor of my work on"," ",t(b,{url:"https://github.com/sponsors/backmeupplz",children:"my GitHub Sponsor profile"})," ","or on"," ",t(b,{url:"https://www.buymeacoffee.com/borodutch",children:"my Buy Me a Coffee profile"}),". I fund all of my projects personally, and the donations help me a lot to keep the products free and open. Thank you."]})]})}var M="https://stats.borodutch.com";const P=C({userCount:A(`${M}/count`).then(e=>e.json())}),ke=a(),v=({icon:e,url:o})=>t("div",{className:ke,children:t("a",{href:o,children:t("img",{src:`images/${e}.svg`,alt:e})})}),ve=e=>a("animate-pulse","rounded-full","bg-gradient-to-tr","from-accent-start",p.length>2?"via-accent-via":void 0,"to-accent-end",e?"h-2":"h-4",e?"w-full":"w-24","my-3"),w=({line:e})=>t("div",{className:ve(e)});function d(e){return e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g," "):""}const xe=a("flex","flex-row","justify-center","flex-wrap","items-center","gap-12"),De=a("flex","flex-col","flex-1"),Ne=a("relative","overflow-hidden"),Ce=a("w-72","h-72","sm:w-96","sm:h-96","rounded-full","bg-gradient-to-tr",p.length>2?"via-accent-via":void 0,"from-accent-start","to-accent-end"),$e=a("absolute","inset-x-0","inset-y-4"),Te=a("absolute","inset-0"),Ie=a("flex","flex-row","mt-4","space-x-4","mb-2");function Se(){const e=r(P);return t(ee,{children:d(e.userCount.count)})}function Ae(){return l("div",{className:xe,children:[l("div",{className:De,children:[t(Y,{children:"borodutch.eth"}),t(Q,{children:"Nikita Kolmogorov"}),t(T,{fallback:t(w,{}),children:t(Se,{})}),t(oe,{children:"people used my apps today"}),l(f,{children:["Updated daily. Curious how I calculated this number? Check out the code"," ",t(b,{url:"https://github.com/backmeupplz/borodutch-stats/blob/master/src/helpers/userCount.ts",children:"here"}),". Careful: it's not the prettiest code I've written."]}),l("div",{className:Ie,children:[t(v,{icon:"telegram",url:"https://t.me/borodutch"}),t(v,{icon:"github",url:"https://github.com/backmeupplz"}),t(v,{icon:"linkedin",url:"https://www.linkedin.com/in/nikitakolmogorov"}),t(v,{icon:"email",url:"mailto:n@borodutch.com"}),t(v,{icon:"facebook",url:"https://fb.me/borodutch"}),t(v,{icon:"twitter",url:"https://twitter.com/backmeupplz"})]})]}),l("div",{className:Ne,children:[t("div",{className:Ce}),t("div",{className:$e,children:t("img",{src:"/images/avatar.webp",alt:"avatar"})}),t("div",{className:Te,style:{background:"linear-gradient(170deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 90%)"}})]})]})}class je{makePersistent(){R(this,()=>{localStorage.setItem(this.constructor.name,JSON.stringify(this))});const o=localStorage.getItem(this.constructor.name);if(o){const s=JSON.parse(o);Object.assign(this,s)}return this}}class Be extends je{constructor(){super(...arguments);S(this,"opened",{})}}const N=C(new Be).makePersistent(),Me=a("bg-gray-900","hover:bg-gray-300","text-gray-50","hover:text-gray-700","py-2","px-4","rounded-xl","focus:outline-none","mx-1","flex-shrink-0"),L=({onClick:e,title:o})=>t("button",{className:Me,onClick:e,children:o}),u=C({projectsData:A(`${M}/stats`).then(e=>e.json())}),Pe=({title:e,data:o})=>t("div",{className:"flex flex-col justify-items-stretch items-stretch w-full",children:t(j,{title:e,type:"line",colors:[p[0]],axisOptions:{xAxisMode:"tick",yAxisMode:"tick",xIsSeries:1,shortenYAxisNumbers:1},lineOptions:{regionFill:1,hideDots:1},height:200,data:o,tooltipOptions:{formatTooltipY:s=>d(s)}})});function Le(e){const o=[...e.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];if(!o.length)return e;const s=[];for(let i=o.length-1;i>=0;i--){const n=o[i];if(!n.index)continue;const c=e.substr(n.index+n[0].length);c&&(s.push(t(g,{children:c})),e=e.substr(0,n.index+n[0].length)),s.push(t(b,{url:n[2],children:n[1]})),e=e.substr(0,n.index),i===0&&s.push(t(g,{children:e}))}return s.reverse()}const Fe=({description:e})=>{const o=e.filter(s=>!!s);return t(g,{children:o.map((s,i)=>t(f,{children:Le(s)},i))})},Oe=a("flex","flex-col","border","border-opacity-25","p-4","rounded-xl"),ze=a("flex","flex-row","justify-between","items-start","mb-4"),Ee=a("flex","flex-col"),He=a("list-inside","list-disc"),Ge=a("flex","flex-row","flex-wrap","items-stretch","justify-center"),Ue=a("flex","flex-col","items-center","w-full","md:w-1/2"),_e=({project:e})=>{var n,c,m,I;const o=r(N),s=o.opened[e.code],{projectsData:i}=r(u);return l("div",{className:Oe,children:[l("div",{className:ze,children:[l("div",{className:Ee,children:[t("a",{href:e.link,rel:"noopener noreferrer",target:"_blank",children:t(ce,{children:e.title})}),((n=i.userCountSeparate)==null?void 0:n[e.code])&&l(he,{children:[d(i.userCountSeparate[e.code])," users"]})]}),(((c=e.publications)==null?void 0:c.length)||((m=e.charts)==null?void 0:m.call(e).length))&&t(L,{onClick:()=>{N.opened[e.code]=!N.opened[e.code]},title:o.opened[e.code]?"Hide stats":"Show stats"})]}),t(Fe,{description:e.description()}),s&&e.charts&&t("div",{className:Ge,children:e.charts().map(y=>t("div",{className:Ue,children:t(Pe,{title:y.title,data:y.data})},y.title))}),s&&((I=e.publications)==null?void 0:I.length)&&l(g,{children:[t(ue,{children:"Publications"}),t(W,{children:t("ul",{className:He,children:e.publications.map(y=>t("li",{children:t(b,{url:y.link,children:y.name})},y.name))})})]})]})};function Re(e){const o=new Date;return o.setDate(o.getDate()-e),o}function k(e){e.pop();const o=[],s=[];for(let i=0;i<e.length;i++)o.push(Re(e.length-i).toLocaleDateString()),s.push(e[i]);return{labels:o,datasets:[{values:s}]}}var x=C({showMoreData:!1});function h(e){const o=r(x),s=[],i=[];for(const{_id:n,count:c}of o.showMoreData?e:e.slice(e.length-30))!n||(s.push(`${n}`),i.push(c));return{labels:s,datasets:[{values:i}]}}function qe(e){const o=r(x);e.pop();const s=[],i=[];for(const{date:n,count:c}of o.showMoreData?e:e.slice(e.length-30))!n||(s.push(new Date(n).toLocaleDateString()),i.push(c));return{labels:s,datasets:[{values:i}]}}function Ve(e){const o=r(x),s=[],i=[],n=Object.keys(e).map(c=>parseInt(c,10));for(const c of o.showMoreData?n:n.slice(n.length-100)){const m=new Date(+c*1e3);s.push(`${m.toLocaleDateString()} ${m.toLocaleTimeString()}`),i.push(e[c])}return{labels:s,datasets:[{values:i}]}}const F=[{title:"$eggs",code:"eggs",link:"https://warpcast.com/warpcastadmin.eth/0x5ff68a23",description:()=>["$eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs $eggs"]},{title:"Voicy",code:"voicy",link:"https://t.me/voicybot",publications:[{link:"https://www.producthunt.com/posts/voicy",name:"Product Hunt: Voicy"},{link:"https://habr.com/ru/post/316824/",name:"Habr: \u0420\u0435\u0446\u0435\u043F\u0442 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0431\u043E\u0442\u0430 \u043F\u043E\u0434 Telegram"},{link:"https://vc.ru/flood/21082-telegram-bot-growth",name:"VC: \u041A\u0435\u0439\u0441 \u0438\u0437 \u0420\u043E\u0441\u0441\u0438\u0438: \u041A\u0430\u043A \u043C\u044B \u0431\u0435\u0437 \u0431\u044E\u0434\u0436\u0435\u0442\u0430 \u0440\u0430\u0441\u043A\u0440\u0443\u0442\u0438\u043B\u0438 \u0434\u0432\u0430 Telegram-\u0431\u043E\u0442\u0430 \u0434\u043E 17 500 \u0447\u0430\u0442\u043E\u0432"}],description:()=>{const{projectsData:{voicy:e}}=r(u);return["Voicy is a Telegram bot that converts speech to text from any voice messages and audio files it receives. This is one of my favorite pet projects. It supports over 100 languages and works with either Wit or Google speech recognition neural networks.",!!e&&`Voicy is currently installed at ${d(e.stats.chatCount)} chats, recognized ${d(e.stats.voiceCount)} voice messages resulting in ${(e.stats.duration/60/60/24/365).toFixed(2)} years of
              speech.`,"If the average response delay is too high \u2014 it's probably because Telegram servers are not giving the bot fresh updates. It happens from time to time. It's [open source](https://github.com/backmeupplz/voicy)."]},charts:()=>{const{projectsData:{voicy:e}}=r(u);return e?[{title:"Number of new chats per day vs days ago",data:h(e.stats.chatDailyStats)},{title:"Number of messages received per day",data:qe(e.stats.messageStats)},{title:"Number of voice messages recognized per hour vs hours ago",data:h(e.stats.hourlyStats)},{title:"Response time in seconds",data:Ve(e.stats.responseTime)},{title:"Voicybot.com visits",data:k(e.cloudflare)}]:[]}},{title:"Shieldy",code:"shieldy",link:"https://t.me/shieldy_bot",publications:[{link:"https://www.producthunt.com/posts/shieldy",name:"Product Hunt: Shieldy"},{link:"https://blog.borodutch.com/shieldy-got-acquired-by-1inch-exchange/",name:"Shieldy got acquired by 1inch Network"},{name:"Business Wire",link:"https://www.businesswire.com/news/home/20210605005015/en/Borodutch-Labs%E2%80%99-Nikita-Kolmogorov-Sells-Shieldy-with-20M-Users-to-1inch-Network-in-the-Largest-Telegram-Bot-Deal-so-Far"},{name:"Financial Post",link:"https://financialpost.com/pmn/press-releases-pmn/business-wire-news-releases-pmn/borodutch-labs-nikita-kolmogorov-sells-shieldy-with-20m-users-to-1inch-network-in-the-largest-telegram-bot-deal-so-far"},{name:"Financial Content",link:"https://markets.financialcontent.com/stocks/news/read?GUID=41432815"},{name:"Street Insider",link:"https://www.streetinsider.com/Business+Wire/Borodutch+Labs%E2%80%99+Nikita+Kolmogorov+Sells+Shieldy+with+20M+Users+to+1inch+Network+in+the+Largest+Telegram+Bot+Deal+so+Far/18524977.html"},{name:"Townhall Finance",link:"https://markets.financialcontent.com/townhall/news/read?GUID=41432815"},{name:"WRAL.com",link:"https://markets.financialcontent.com/wral/news/read?GUID=41432815"},{name:"yahoo!finance",link:"https://ca.finance.yahoo.com/news/borodutch-labs-nikita-kolmogorov-sells-160700214.html"}],description:()=>{const{projectsData:{shieldy:e}}=r(u);return["Anti-spam Telegram bot that stops 99.99% of annoying spammers by asking users to go through a straightforward captcha-like process and restricting newcomers to only being able to send text (no media). Completely free and [open source](https://github.com/1inch/shieldy).",!!e&&`Shieldy is used by ${d(e.chatCount)} chats. It got acquired by 1inch Network in June 2021.`]},charts:()=>{const{projectsData:{shieldy:e}}=r(u);return e?[{title:"Number of new chats per day vs days ago",data:h(e.chatDaily)}]:[]}},{title:"Banofbot",code:"banofbot",link:"https://t.me/banofbot",description:()=>{const{projectsData:{banofbot:e}}=r(u);return["Telegram votekick bot. Allows to fight spammers or introduce democracy to chats by enabling users to vote for kicking specific members \u2014 completely free and [open source](https://github.com/backmeupplz/banofbot).",!!e&&`Banofbot was used to create ${d(e.requestCount)} votekick requests in ${d(e.chatCount)} chats.`]},charts:()=>{const{projectsData:{banofbot:e}}=r(u);return e?[{title:"Number of new users per day vs days ago",data:h(e.userDaily)},{title:"Number of new chats per day vs days ago",data:h(e.chatDaily)},{title:"Number of new requests per day vs days ago",data:h(e.requestDaily)}]:[]}},{title:"Randy Marsh",code:"randy",link:"https://t.me/randymbot",description:()=>{const{projectsData:{randym:e}}=r(u);return["Telegram raffle bot that allows channel and group admins to execute raffles with prizes among chat members or channel subscribers. Completely free and [open source](https://github.com/backmeupplz/randymbot).",!!e&&`Randy was used in ${d(e.chatCount)} chats to execute ${d(e.raffleCount)} raffles.`]}},{title:"Todorant",code:"todorant",link:"https://todorant.com",description:()=>{const{projectsData:{todorant:e}}=r(u);return[`Todorant is the only todo manager you will ever need again. It doesn't just help you to keep track of tasks. It manages them for you. Based on "Getting Things Done," "Willpower," and "Eat That Frog" books.`,!!e&&`Users on Todorant created ${d(e.db.todoCount)} todos.`]},charts:()=>{const{projectsData:{todorant:e}}=r(u);return e?[{title:"Number of new users per day vs days ago",data:h(e.db.userDaily)},{title:"Number of new todos per day vs days ago",data:h(e.db.todoDaily)},{title:"Todorant.com visits",data:k(e.cloudflare)}]:[]}},{title:"Check my text bot",code:"speller",link:"https://t.me/check_my_text_bot",description:()=>["Spellcheck Telegram bot. Just add it to your channel, active in private messages, and get notified of any typos you post! Completely free and [open source](https://github.com/backmeupplz/check_my_text_bot)."],charts:()=>{const{projectsData:{checkMyTextBot:e}}=r(u);return e?[{title:"Number of new users per day vs days ago",data:h(e.userDaily)}]:[]}},{title:"TLGCoin",code:"tlgcoin",link:"https://t.me/tlgcoin_bot",description:()=>{const{projectsData:{tlgcoin:e}}=r(u);return["Telegram clicker-bot with internal currency and fancy duels. It's like the cookie clicker but in Telegram and with a competitive element. Completely free and [open source](https://github.com/backmeupplz/tlgcoin).",!!e&&`TLGCoin users mined ${d(e.coinsCount)} coins.`]},charts:()=>{const{projectsData:{tlgcoin:e}}=r(u);return e?[{title:"Number of new users per day vs days ago",data:h(e.userDaily)}]:[]}},{title:"Borodutch",code:"borodutch",link:"https://borodutch.com",description:()=>["This is this website! It is spectacular that you can also check its requests in the 21st century. Expect it to have a few hits, though, as it's mainly visited by myself to review the project metrics.","It's open source. Here's the code for [the website](https://github.com/backmeupplz/borodutch) and [the stats server](https://github.com/backmeupplz/borodutch-stats)"]},{title:"Temply",code:"temply",link:"https://t.me/temply_bot",description:()=>{const{projectsData:{temply:e}}=r(u);return["Inline Telegram bot that allows users to create various text templates and quickly use them later. Pretty useful for support workers as well as channel administrators. Completely free and [open source](https://github.com/backmeupplz/temply).",!!e&&`Temply users created ${d(e.templatesCount)} templates.`]},charts:()=>{const{projectsData:{temply:e}}=r(u);return e?[{title:"Number of new users per day vs days ago",data:h(e.userDaily)}]:[]}},{title:"CAS Ban Checker",code:"casBanChecker",link:"https://t.me/cas_ban_bot",description:()=>["Bot that checks whether a user is banned by [CAS](https://cas.chat). It is also [open source](https://github.com/backmeupplz/cas_ban_bot)."]},{title:"Fondu",code:"fondu",link:"https://fondu.io",publications:[{link:"https://www.producthunt.com/posts/fondu",name:"Product Hunt: Fondu"},{link:"https://www.bitrates.com/news/p/fondu-lets-anyone-write-ethereum-smart-contracts-no-programming-experience-needed",name:"Bitrates: Fondu Lets Anyone Write Ethereum Smart Contracts, No Programming Experience Needed"},{link:"https://thenextweb.com/hardfork/2018/08/07/smart-contracts-blockchain-ethereum/",name:"The New Web: This app makes writing Ethereum smart contracts super easy, perhaps too easy"},{link:"https://cryptodaily.co.uk/2018/08/building-your-own-cryptocurrency-on-the-ethereum-blockchain-just-got-easier",name:"CryptoDaily: Building Your Own Cryptocurrency On The Ethereum Blockchain Just Got Easier"}],description:()=>["ERC-20 Ethereum smart-contract builder. Completely free and [open source](https://github.com/backmeupplz/fondu). Hosted on the GitHub Pages."],charts:()=>{const{projectsData:{fondu:e}}=r(u);return e?[{title:"Fondu.io visits",data:k(e)}]:[]}},{title:"Please, no",code:"pleaseno",link:"https://pleaseno.me",publications:[{link:"https://www.producthunt.com/posts/please-no",name:"Product Hunt: Please, no"}],description:()=>['A simple webpage with two pages: one shows "Please, no" text, and another also shows a "Please, no" GIF. I use it when I can answer "Please, no" to particular things. Completely free and [open source](https://github.com/backmeupplz/pleaseno). Hosted on the GitHub Pages as well.'],charts:()=>{const{projectsData:{pleaseno:e}}=r(u);return e?[{title:"Pleaseno.me visits",data:k(e)}]:[]}},{title:"ResetBot",code:"resetbot",link:"https://resetbot.com",description:()=>["This website is intended to reset your Telegram bot getUpdates method. Useful when bot updates get stuck for some unknown reason. [Open source](https://github.com/backmeupplz/reset-bot)."],charts:()=>{const{projectsData:{resetbot:e}}=r(u);return e?[{title:"Resetbot.com visits",data:k(e)}]:[]}},{title:"Fix sleep",code:"fixsleep",link:"https://fixsleep.link",description:()=>["A simple webpage with 17 rules on how to sleep better. I spent multiple years researching all the available literature and knowledge on why we sleep and how to improve sleep quality. I've built this short version with links to scientific papers to share with family and friends because not everybody likes reading long articles.","Completely free and [open source](https://github.com/backmeupplz/fixsleep). Hosted on the GitHub Pages."],charts:()=>{const{projectsData:{fixsleep:e}}=r(u);return e?[{title:"Fixsleep.link visits",data:k(e)}]:[]}},{title:"Magic pill",code:"magicpill",link:"https://magicpill.link",description:()=>["A simple webpage listing benefits of reducing animal product intake based on scientific evidence. like with Fix Sleep, I built this website to share it with people close to me. To save them time by researching this subject for them.","Completely free and [open source](https://github.com/backmeupplz/magicpill). Hosted on the GitHub Pages."],charts:()=>{const{projectsData:{magicpill:e}}=r(u);return e?[{title:"Magicpill.link visits",data:k(e)}]:[]}},{title:"Is Bot Down",code:"isbotdown",link:"https://isbotdown.com",description:()=>["A Telegram-bot uptime checker. Notifies users when their bots go down and come back up again."]},{title:"Video Download Bot",code:"videoDownloadBot",link:"https://t.me/VideoDownloadBot",description:()=>["Telegram bot that allows users to download the video from any link.","I [acquired](https://t.me/borodutch_support/175) this bot in November 2021. It is [open source](https://github.com/Borodutch/VideoDownloadBot)."]},{title:"RemindMe",code:"remindme",link:"https://warpcast.com/remindme",description:()=>["Farcaster bot that reminds users about the casts after a time interval. It is [open source](https://github.com/backmeupplz/remindme)."]},{title:"Healthbot",code:"health",link:"https://warpcast.com/healthbot",description:()=>["Health bot on Farcaster that reminds people of good habits like straightening their backs. It is [open source](https://github.com/backmeupplz/health)."]}],We=a("pb-4","mx-4"),Je=a("flex","flex-col","gap-4"),Ye=a("flex","flex-row","justify-between","items-center");function Ke(){return t(g,{children:Array(F.length).fill(null).map((e,o)=>l("div",{className:We,children:[t(w,{}),t(w,{line:!0}),t(w,{line:!0}),t(w,{line:!0}),t(w,{line:!0})]},o))})}function Qe(){const e=r(N),o=r(x);return l(g,{children:[l("div",{className:Ye,children:[t($,{children:"Projects"}),(!o.showMoreData||Object.keys(e.opened).length>0)&&t(L,{onClick:()=>{x.showMoreData?N.opened={}:x.showMoreData=!0},title:o.showMoreData?"Hide all stats":"Chart more data"})]}),t(T,{fallback:t(Ke,{}),children:t("div",{className:Je,children:F.map(s=>t(_e,{project:s},s.code))})})]})}const Xe=a("container","mx-auto","pb-10","max-w-5xl","pt-4","px-4","bg-black"),Ze=({children:e})=>t("div",{className:Xe,style:{"--accent-start":p[0],"--accent-via":p.length>2?p[1]:"#FFF","--accent-end":p[p.length>2?2:1]},children:e});function et(){const e=r(P);return t(j,{title:"How many people used my apps",type:"line",colors:[p[0]],axisOptions:{xAxisMode:"tick",yAxisMode:"tick",xIsSeries:1,shortenYAxisNumbers:1},lineOptions:{regionFill:1,hideDots:1},height:200,data:{labels:e.userCount.history.map(o=>new Date(+o[0]).toLocaleDateString()),datasets:[{values:e.userCount.history.map(o=>+o[1])}]},tooltipOptions:{formatTooltipY:o=>d(o)}})}const tt=a("mt-12");function ot(){return t("div",{className:tt,children:t(T,{fallback:t(w,{}),children:t(et,{})})})}const st=()=>l(Ze,{children:[t(Ae,{}),t(ot,{}),t(we,{}),t(Qe,{}),t(me,{children:"Thanks for scrolling!"})]});q(t(st,{}),document.getElementById("root"));
