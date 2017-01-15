/**
 * Created by Yangwook Ryoo on 2/14/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Router} from 'express'

const router = new Router()

function renderPug(req,res,next,location,opt) {
  try {
    res.render(location,{title:opt})
  } catch (err) {
    next(err)
  }
}

router.route('/')
.post((req, res, next) => {
  renderPug(req, res, next, 'index')
}).get((req, res, next) => {
  renderPug(req, res, next, 'base', 'Portfolio')
})


router.route('/summary')
.get((req, res, next) => {
  renderPug(req, res, next, 'base', '소개')
})
.post((req, res, next) => {
  renderPug(req, res, next, 'summary')
})

router.route('/timeline')
  .get((req, res, next) => {
  renderPug(req, res, next, 'base', '타임라인')
})
.post((req, res, next) => {
  renderPug(req, res, next, 'timeline')
})

router.route('/contact')
.get((req, res, next) => {
  renderPug(req, res, next, 'base', '연락처')
})
.post((req, res, next) => {
  renderPug(req, res, next, 'contact')
})

export {router as default}
