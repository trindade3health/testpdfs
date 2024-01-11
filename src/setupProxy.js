const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/pdf',
    createProxyMiddleware({
      target: 'https://www.ufp.pt',
      changeOrigin: true,
      pathRewrite: {
        '^/pdf': '',
      },
    })
  );
};