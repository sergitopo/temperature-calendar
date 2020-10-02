export default {
    srcDir: 'src/',
    plugins: [{ src: '@/plugins/calendar', mode: 'client'}, { src: '@/plugins/menu', mode: 'client'}],
    env: {
      baseURL: (process.env.NODE_ENV === 'production' ? './' : 'http://localhost:3000/')
    },
    mode: 'spa',
    components: true,
    target: 'static',
    router: {
      base: process.env.NODE_ENV === 'production' ? '/temperature-calendar/client/page/' : '/'
    },
    build: {
      publicPath: '/assets/'
    }
  }