export default {
    srcDir: 'src/',
    plugins: [{ src: '@/plugins/calendar', mode: 'client'}, { src: '@/plugins/menu', mode: 'client'}],
    env: {
      baseURL: (process.env.NODE_ENV === 'production' ? './' : 'http://localhost:3000/')
    },
    components: true
  }