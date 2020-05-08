// 返回输入参数
// docs https://cloud.tencent.com/document/product/876/19369
const controllers = require('./controllers')
const admin = require('tcb-admin-node')

exports.main = async (event) => {
    admin.logger().log(event)
    const {httpMethod} = event
    if(httpMethod === 'OPTIONS'){
        return 204
    }
    let obj = null
    try {
      obj = await controllers[httpMethod](event)
    } catch (error) {
       return {
           code:500,
           msg:error
       }
    }
    if(obj.msg){
        return obj
    }
    admin.logger().log({obj:JSON.stringify(obj)})
    return {code:200,data:obj}
}
