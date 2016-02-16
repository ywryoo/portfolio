/**
 * Created by Yangwook Ryoo on 2/2/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import plan from 'flightplan';
import {PASS} from './tools/password';

const APPNAME = "Portfolio";
const USERNAME = 'ywryoo';
const HOST = 'ywryoo.dlinkddns.com';

// configuration
plan.target('server', [
  {
    host: HOST,
    username: USERNAME,
    password: PASS
  }
]);

function localTask(local) {
  local.log('Run gulp to build');
  local.exec('gulp startProduction');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('find . -name "package.json" -maxdepth 1 && find ./dist -type f', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + APPNAME);
}


function remoteTask(remote) {
  remote.log('Move folder to webroot');
  remote.exec('rm -rf /var/www/'+ APPNAME);
  remote.exec('cp -R /tmp/' + APPNAME + ' /var/www/'+ APPNAME);
  remote.exec('rm -rf /tmp/' + APPNAME);
  remote.exec('echo \' {\
  "apps" : [\
    {\
      "name"      : "' + APPNAME  + '",\
      "script"    : "/var/www/'+ APPNAME + '/dist/server.js",\
      "env": {\
        "COMMON_VARIABLE": "true",\
        "NODE_ENV": "production",\
        "NODE_PATH": "/var/www/' + APPNAME + '/dist"\
      },\
    }\
  ]}\' >> /var/www/'+ APPNAME + '/ecosystem.json');
  //remote.exec('ln -snf /var/www/'+ APPNAME + ' /var/www/'+ APPNAME);

  remote.log('Reload application');
  remote.exec('. ~/.nvm/nvm.sh  && ' +
    'nvm use 4.3.0 && ' +
    'cd /var/www/'+ APPNAME + ' && ' +
    'npm install --production && ' +
    'pm2 startOrReload /var/www/'+ APPNAME + '/ecosystem.json');
}

plan.local(localTask);
plan.remote(remoteTask);
