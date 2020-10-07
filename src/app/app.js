import angular from 'angular';

import '../style/app.css';
import moment from '../lib/proxy.moment';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor(moment) {
    this.url = 'https://github.com/preboot/angular-webpack';

    // console.log(window.moment.mask);
    // console.log(window.moment.version);

    // -----------------------
    var x = moment();
    console.log(`X has been accessed! ${x}`);

    //Simplificado

    console.log(x.mask);
    x.mask = 'asdfasdf';
    console.log([x.mask, x]);

    var y = moment(x);
    console.log([y.mask, y]);

    var p = moment(y);
    console.log([p.mask, p]);
    // -----------------------

    // console.log(moment('2020-10-06 13:12:21', 'xpto'));

    console.log(moment('2020-10-06 13:12:21', 'xpto').mask);

    // -----------------------

    console.log(moment().mask);
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .constant('moment', moment)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;