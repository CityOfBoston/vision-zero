module.exports = {
  assetPrefix: '.',
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
    };
  },
};
