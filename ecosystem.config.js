module.exports = {
  apps : [{
    name: 'visappalication  ',
    script: 'npm',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'run start:production',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    // env: {
    //   NODE_ENV: 'development'
    // },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '139.59.63.110',
      ref  : 'origin/master',
      repo : 'git@github.com:pradeepAtcodingmart/visaapplicationfe.git',
      path : '/var/www/visaapplicationfe',
      'post-deploy' : 'yarn install && yarn build'
    }
  }
};
