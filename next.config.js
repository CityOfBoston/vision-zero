module.exports = {
  exportTrailingSlash: true,
  assetPrefix: '.',
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
    };
  },
};
