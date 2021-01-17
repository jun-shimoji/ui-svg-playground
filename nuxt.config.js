module.exports = {
    target: 'static',
    // router: {
    //   linkActiveClass: 'is-active',
    //   linkExactActiveClass: 'is-active-exact'
    // },
    link: [{
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Lato:400,700|Ramabhadra'
    }],
    build: {
      extend(config) {
        config.module.rules = config.module.rules.map(rule => {
          if (rule.loader === 'url-loader' && rule.test.toString().includes('svg')) {
            return {
              ...rule,
              test: /\.(png|jpe?g|gif)$/
            }
          }
          return rule
        })
  
        config.module.rules.push({
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        })
      }
    },
    buildModules: [
      '@nuxtjs/vuetify',
    ]    
  }