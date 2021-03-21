const app = require('./index')
const port=process.env.PORT ||3000
// app.listen(port, (err) => { //comment out when running unit tests
//      if (err) throw err 
//      console.log(`Server running in http://localhost:${port}`)
// })
module.exports = app //uncomment when running unit tests 
