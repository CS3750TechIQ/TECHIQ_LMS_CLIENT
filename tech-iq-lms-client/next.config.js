const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/core',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/resource-timeline',
  '@fullcalendar/timeline',
  '@fullcalendar/timegrid',
]);

module.exports = withTM({
  // target: 'serverless',
  async rewrites() {
    return [
      // Do not rewrite API routes
      {
        source: '/api/:any*',
        destination: '/api/:any*',
      },
      // Rewrite everything else to use `pages/index`
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },
});
