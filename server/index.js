const express = require('express')
const path = require('path')

const app = express()
// app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '159caf90e7c5407898217a6d9f87f5a9',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello traceability')


let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student was added succesfully', {author: 'Austin'})

    res.status(200).send(students)
})

app.use(rollbar.errorHandler())



// try {
//     noFunction ()
// } catch (error) {
//     console.error(error)
// }

// app.get('/api/error', (req,res) => {
    
// })






const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}`))