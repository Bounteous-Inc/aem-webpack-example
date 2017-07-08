const babel = require('babel-core');
const babelTransformPlugin = require('babel-plugin-transform-es2015-modules-commonjs');
const jestPreset = require('babel-preset-jest');

function processBabel(src, filename) {
  if (babel.util.canCompile(filename)) {
    src = babel.transform(src, {
      filename,
      plugins: [
        /**
        We have to require this plugin from this file because otherwise we get
        an error like `Cannot find module 'transform-es2015-modules-commonjs'`.
        Background: If Babel wants to resolve a file's dependencies,
        it traverses up the tree (as opposed to using process.cwd() as the
        starting directory). However, our Webpack folder isn't an ancestor
        in the hierarchy of test files, so it doesn't find it.
        */
        babelTransformPlugin
      ],
      presets: [
        jestPreset
      ],
      retainLines: true,
    }).code;
  }

  return src;
}

/*
 * Remove imports that match the following conditions:
 * a) String starts with `require(` or `import `.
 * b) String contains `.scss` or `.css`.
 * c) String ends with `;`
 *
 * Example matches:

require('./style.scss');
import './index.scss';

 * If we wouldn't remove those imports, Babel & Jest wouldn't know how to deal with them.
 */
function processImports(src) {
  const regex = /(require|import)(\ |\().*\.s?css(.*?);/gm;

  return src
    .replace(regex, '');
}

/**
 * We process every file before Jest does its magic.
 */
module.exports = {
  process(src, filename) {
    src = processBabel(src, filename);
    src = processImports(src);

    return src;
  },
};
