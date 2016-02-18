/**
 * Created by Yangwook Ryoo on 2/14/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Router} from 'express';

const router = new Router();

async function renderJade(req,res,next,location,opt) {
  try {
    res.render(location,{title:opt});
  } catch (err) {
    next(err);
  }
}

router.route('/')
.post(async (req, res, next) => {
  renderJade(req, res, next, 'index');
}).get(async (req, res, next) => {
  renderJade(req, res, next, 'base', 'Portfolio');
})
;

router.route('/summary')
.get(async (req, res, next) => {
  renderJade(req, res, next, 'base', '소개');
})
.post(async (req, res, next) => {
  renderJade(req, res, next, 'summary');
});

router.route('/timeline')
  .get(async (req, res, next) => {
  renderJade(req, res, next, 'base', '타임라인');
})
.post(async (req, res, next) => {
  renderJade(req, res, next, 'timeline');
});

router.route('/contact')
.get(async (req, res, next) => {
  renderJade(req, res, next, 'base', '연락처');
})
.post(async (req, res, next) => {
  renderJade(req, res, next, 'contact');
});

export {router as default};
