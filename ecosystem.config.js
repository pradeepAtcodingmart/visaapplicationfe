module.exports = {
  apps : [{
    name: 'visappalication  ',
    script: 'npm',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '139.59.63.110',
      ref  : 'origin/master',
      repo : 'https://github.com/pradeepAtcodingmart/visaapplicationfe.git',
      path : '/var/www/visaapplicationfe',
      'post-deploy' : 'npm install --production && npm run build && pm2 del visaapplicationfe || npm run production'
    }
  }
};
