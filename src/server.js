/**
 * Created by Yangwook Ryoo on 1/29/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import express from 'express';
import helmet from 'helmet';
import routes from './routes';

const server = express();

let port = process.env.NODE_ENV === 'production' ? 3000 : 4321;

//defend basic attacks
server.use(helmet());
//static files
server.use(express.static(process.env.NODE_PATH + '/public')); //TODO add favicon, robots, etc.
//content routes
server.use('/content', routes);

server.get('/', async (req, res, next) => {
  try{
    res.sendFile(process.env.NODE_PATH + '/public/index.html');
  } catch (err) {
    next(err);
  }
});

server.listen(port, () => {
  console.log('server listening on %d!', port);
});