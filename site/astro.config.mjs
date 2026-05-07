// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

const site = process.env.SITE_URL ?? 'https://hackerx.app';

export default defineConfig({
  site,
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'HackerX',
      description: 'Ship UI 100x faster with Claude Code as your design partner.',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#0a0a0a' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: `${site}/og.png` },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
      ],
      customCss: ['./src/styles/global.css', './src/styles/theme.css'],
      components: {
        Footer: './src/components/Footer.astro',
        Hero: './src/components/Hero.astro',
        PageTitle: './src/components/PageTitle.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/zthebaron/hackerx',
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [{ autogenerate: { directory: '00-start-here' } }],
        },
        {
          label: 'Foundations',
          items: [{ autogenerate: { directory: '01-foundations' } }],
        },
        {
          label: 'Master Prompts',
          items: [{ autogenerate: { directory: '02-master-prompts' } }],
        },
        {
          label: 'UI/UX Vocabulary',
          items: [{ autogenerate: { directory: '03-ui-ux-vocabulary' } }],
        },
        {
          label: 'Modern UI Stack',
          items: [{ autogenerate: { directory: '04-modern-ui-stack' } }],
        },
        {
          label: 'Prompt Library',
          items: [{ autogenerate: { directory: '05-prompt-library' } }],
        },
        {
          label: 'Add-Ons',
          items: [{ autogenerate: { directory: '06-add-ons' } }],
        },
        {
          label: 'Skills',
          items: [{ autogenerate: { directory: '07-skills' } }],
        },
        {
          label: 'Demonstrations',
          items: [{ autogenerate: { directory: '08-demonstrations' } }],
        },
        {
          label: 'Samples',
          link: '/samples/',
          badge: { text: 'New', variant: 'success' },
        },
        {
          label: 'Workshops',
          items: [{ autogenerate: { directory: '09-workshops' } }],
        },
        {
          label: 'Philosophy',
          items: [{ autogenerate: { directory: '10-philosophy' } }],
        },
        {
          label: 'Final Operating System',
          items: [{ autogenerate: { directory: '11-final-operating-system' } }],
        },
        {
          label: 'Templates',
          items: [{ autogenerate: { directory: 'templates' } }],
        },
        {
          label: 'Blog',
          link: '/blog/',
        },
        {
          label: 'Network',
          link: '/links/',
        },
      ],
      lastUpdated: true,
      pagination: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
