/**
 * Created by Yangwook Ryoo on 2/14/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Router} from 'express';
import jade from 'jade';
import fs from 'fs';

const router = new Router();

async function renderJade(req,res,next,location) {
  try {
    res.render(location);
  } catch (err) {
    next(err);
  }
}

async function renderWithBase(req, res, next, location) {
  try {
    const dir = req.app.get('views') + location;
    fs.readFile(dir, 'utf8', async (err, data) => {
        if (err) throw err;
        let fn =  jade.compile('extends ./base.jade\n' + data,
          {filename: dir});
        let html = fn({});
        res.send(html);
      });
  } catch (err) {
    next(err);
  }
}

router.route('/')
.post(async (req, res, next) => {
  renderJade(req, res, next, 'index');
}).get(async (req, res, next) => {
  renderWithBase(req, res, next, '/index.jade');
})
;

router.route('/summary')
.get(async (req, res, next) => {
  renderWithBase(req, res, next, '/summary.jade');
})
.post(async (req, res, next) => {
  renderJade(req, res, next, 'summary');
});

router.route('/timeline')
  .get(async (req, res, next) => {
  renderWithBase(req, res, next, '/timeline.jade');
})
.post(async (req, res, next) => {
  renderJade(req, res, next, 'timeline');
});

router.route('/contact')
.get(async (req, res, next) => {
  renderWithBase(req, res, next, '/contact.jade');
})
.post(async (req, res, next) => {
  renderJade(req, res, next, 'contact');
});

export {router as default};
