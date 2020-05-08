const tcb = require('tcb-admin-node')
const app = tcb.init({
    env: '', //云开发环境名
    secretId: '', //腾讯云密钥 see https://console.cloud.tencent.com/cam/capi
    secretKey: ''
})
module.exports = app
