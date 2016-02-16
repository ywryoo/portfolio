/**
 * Created by Yangwook Ryoo on 2/14/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Router} from 'express';
import bodyParser from 'body-parser';

const router = new Router();

//json
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
  try {
    res.render('index');
  } catch (err) {
    next(err);
  }
});

export {router as default};