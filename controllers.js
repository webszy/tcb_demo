const logDB = require('./dbConfig')
const admin = require('tcb-admin-node')

const controllers = {
  GET: async function(event){
    let {page} = event.queryStringParameters
    if(!page){
      return {
        httpMethod:event.httpMethod,
        code:400,
        msg:'Need Params \'page\''
      }
    } else {
      page = parseInt(page)
      if(page-1<0){
        return{
          httpMethod:event.httpMethod,
          code:404,
          msg:'wrong page number'
        }
      }
      const data = await logDB.limit(100).skip((page-1)*100).get()
      admin.logger().log({data:JSON.stringify(data)})
      return data.data
    }
  },
  POST:async function(event){
    const info = JSON.parse(event.body)
    info.createTime = new Date().getTime()
    admin.logger().log({info})
    const Result = await logDB.add(info)
    return {
        id:Result.id
    }
  },
  DELETE:async function(event){
    const {id} = event.queryStringParameters
    admin.logger().log({id})
    if(!id){
      return {
        httpMethod:event.httpMethod,
        code:400,
        msg:'Need Params \'id\''
      }
    } else {
      const record = await logDB.doc(id).get()
      if(record.data.length>0){
        const result = await logDB.doc(id).remove()
        admin.logger().log({result})
        const {deleted} = result
        if(deleted){
          return {
            status:'success',
            deleted
          }
        }else{
          return {
            status:'failed',
            deleted
          }
        }
      } else {
        return {
          httpMethod:event.httpMethod,
          code:404,
          id,
          msg:'id not found'
        }
      }
    }
  },
}
module.exports = controllers
