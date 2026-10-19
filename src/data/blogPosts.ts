export interface BlogPost {
  title: string
  description: string
  link: string
  date: string
}

const blogPosts: BlogPost[] = [
  {
    title: 'I rebuilt Voicy with agents instead of rewriting it myself',
    description:
      'How I used Symphony, OpenClaw, Codex, a home server, Telegram Web QA, and a Windows GPU worker to revive Voicy as an agent-driven maintenance loop.',
    link: 'https://blog.borodutch.com/i-rebuilt-voicy-with-agents-instead-of-rewriting-it-myself/',
    date: '2026-05-07T17:58:06.000Z',
  },
  {
    title: 'Digital sovereignty in 2026, (in)complete guide',
    description:
      'An (in)complete guide on how to replace google, apple, msft with foss solutions and own your data',
    link: 'https://blog.borodutch.com/digital-sovereignty-in-2026-in-complete-guide/',
    date: '2026-02-22T23:52:19.000Z',
  },
  {
    title: "Everything I've learned about aeroponics (so far)",
    description:
      '3D-printed a vertical aeroponics tower: misted roots, 90% less water, fresh basil & tomatoes, saving big bucks (not really)',
    link: 'https://blog.borodutch.com/everything-ive-learned-about-aeroponics-so-far/',
    date: '2025-06-27T20:10:54.000Z',
  },
  {
    title: 'Humans must not apply',
    description:
      "I love AI; it's the most important invention of the century. It has already unlocked so much creativity and technical progress, and what's next is yet to be se...",
    link: 'https://blog.borodutch.com/humans-must-not-apply/',
    date: '2025-03-09T17:55:25.000Z',
  },
  {
    title: 'My 2024 wrap-up is free',
    description:
      "How 2024 affected my thinking, what I did 180 on, which books I've read are the best, and my plans for 2025",
    link: 'https://blog.borodutch.com/my-2024-wrap-is-free/',
    date: '2025-01-02T23:17:44.000Z',
  },
]

export default blogPosts
