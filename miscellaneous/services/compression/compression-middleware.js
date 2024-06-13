const compression = require('compression');

const Compression = compression({
  level: 6, // Brotli compression level
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }

    if ((req.headers['user-agent']?.includes('Safari') && !req.headers['user-agent']?.includes('Chrome')) || req.headers['user-agent']?.includes('iPhone') || req.headers['user-agent']?.includes('iPad')) {
      return compression.filter(req, res, { method: 'gzip' });
    } else {
      return compression.filter(req, res)
    }

  },
  brotli: {
    quality: 6, // Brotli quality level
  },
})


module.exports = Compression