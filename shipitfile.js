module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  shipit.initConfig({
    default: {
      workspace: '/tmp/ ',
      deployTo: '/var/www/visaapplicationfe',
      repositoryUrl: 'https://github.com/pradeepAtcodingmart/visaapplicationfe',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa',
      branch : 'master',
      //shallowClone: true - в моем случае создавало проблемы
    },
    production: {
      servers: 'root@139.59.63.110'
    }
  });
  shipit.task('deploy:finish', function () {
    return shipit.remote('cd '+shipit.config.deployTo+'/current && yarn install --production')
      .then(function(res) {
        shipit.remote('cd '+shipit.config.deployTo+'/current && yarn build')
      }, function(err) {
        shipit.log(err);
      })
  });
};