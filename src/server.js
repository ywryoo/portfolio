/**
 * Created by Yangwook Ryoo on 1/29/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import express from 'express'
import helmet from 'helmet'
import routes from './routes'

const server = express()

let port = process.env.NODE_ENV === 'production' ? 3000 : 4321

//use jade
server.set('view engine', 'pug')
//set view directory
server.set('views', process.env.NODE_PATH + '/content')
//defend basic attacks
server.use(helmet())
//static files
server.use(express.static(process.env.NODE_PATH + '/public')) //TODO add favicon, robots, etc.
//korean routes
server.use('/kr', routes)
//english routes
//server.use('/en', routes)

//error handler
server.use((err, req, res, next) => {
  console.error(err)
  res.render('500')
})

//route
server.get('/', (req, res, next) => {
  try {
    res.redirect(301, '/kr') //default lang = kr
  } catch (err) {
    next(err)
  }
})

//404 handler
server.use((req, res) => {
  res.render('404')
})

server.listen(port, () => {
  console.log('server listening on %d!', port)
})
