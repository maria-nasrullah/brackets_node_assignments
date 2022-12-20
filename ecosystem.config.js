module.exports = {
  apps : [{
    script: './appointment_scheduling/app.js',
    watch: '.'
  }, {
    script: './assignment5/server.js',
    watch: ['./service-worker']
  },{
    script:'./assignment4/server.js',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
