/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // 中国风典雅配色
        xuan: '#f7f3ea',      // 宣纸底
        paper: '#fbf8f0',     // 纸白
        ink: '#2b2622',       // 墨
        inklight: '#5c544c',  // 淡墨
        zhu: '#9e2b25',       // 朱红
        zhulight: '#c0433c',  // 朱红亮
        dai: '#3a4a4d',       // 黛青
        jin: '#b08d4c',       // 金
        cloud: '#ece4d4',     // 云灰
      },
      fontFamily: {
        song: ['"Noto Serif SC"', '"Songti SC"', '"SimSun"', 'serif'],
        kai: ['"KaiTi"', '"STKaiti"', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 1px 2px rgba(43,38,34,0.06), 0 8px 24px rgba(43,38,34,0.08)',
      },
      backgroundImage: {
        'paper-texture':
          "radial-gradient(circle at 20% 20%, rgba(176,141,76,0.05) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(158,43,37,0.04) 0, transparent 45%)",
      },
    },
  },
  plugins: [],
};
