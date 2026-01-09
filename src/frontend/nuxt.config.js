export default {
    srcDir: 'src',
    plugins: [{ src: '@/plugins/calendar', mode: 'client'}, { src: '@/plugins/menu', mode: 'client'}],
    env: {
        baseURL: (process.env.NODE_ENV === 'production' ? 'https://sergitopo.github.io/temperature-calendar' : 'http://localhost:3000/')
    },
    components: true,
    target: 'static',
    router: {
        base: '/',
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
    },
    generate: {
        routes: [
          '/2016',
          '/2017',
          '/2018',
          '/2019'
        ]
    }
}
  