export default {
    srcDir: 'src/',
    plugins: [{ src: '@/plugins/calendar', mode: 'client'}, { src: '@/plugins/menu', mode: 'client'}],
    env: {
        baseURL: (process.env.NODE_ENV === 'production' ? 'https://sergitopo.github.io/temperature-calendar/client/page/' : 'http://localhost:3000/')
    },
    components: true,
    target: 'static',
    router: {
        base: process.env.NODE_ENV === 'production' ? '/temperature-calendar/client/page/' : '/'
    },
    build: {
        publicPath: '/assets/'
    },
    head: {
        titleTemplate: 'Calendari d\'anomalies tèrmiques',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Year temperatures anomalies' }
        ]
    }
  }
  