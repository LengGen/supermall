module.exports = {
    configureWebpack: {
        resolve: {
            // extensions:[],
            alias: {
                // 配置别名   默认别名： '@':'src'
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}
