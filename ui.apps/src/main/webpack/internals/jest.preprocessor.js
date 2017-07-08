const babelJest = require('babel-jest');

// We preprocess every file and remove parts that we can or must ignore for our tests
module.exports = {
  process(src, filename) {
    /*
     * This RegEx matches:
     * a) String starts with `require(` or `import `.
     * b) String contains `.scss` or `.css`.
     * c) String ends with `;`
     *
     * Example matches:

    require('./style.scss');
    import './index.scss';

     *
     */
    const regex = /(require|import)(\ |\().*\.s?css(.*?);/gm;
    return babelJest.process(src, filename)
      .replace(regex, '');
  }
};
