const PROXY_CONFIG = [
    {
        context: [
            "/totvs-rest",
            "/totvs-login"
        ],
        target: "http://gales:8180",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        autoRewrite: true,
        headers: {
            Authorization: "Basic c3VwZXJncDpzdXBlckAxMjM="
        }
    }, {
        context: [
            "/josso",
            "/dts/datasul-rest",
        ],
        target: "http://gales:8380",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        autoRewrite: true,
        headers: {
           // Authorization: "Basic c3VwZXI6c3N6a0AxMjM=" /* super sszk@123 */
            Authorization: "Basic MTM6MTM=" /* 13 13 */
        }
    },
   /* {
        context: [
            "/receivingParameters"
        ],
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        autoRewrite: true
    }*/
]

module.exports = PROXY_CONFIG;

