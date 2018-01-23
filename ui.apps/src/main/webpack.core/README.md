# package.json

If the Maven build is run, it will automatically run "npm run production" and do its front end magic.

If you want to run single scripts without having to run the full Maven build, here are the most often used commands:

* `npm start` to run AEM Front and Webpack and keep it running in watch mode. Whenever a JavaScript or CSS file is saved, this script automatically compiles the code and pushes it into AEM. IMPORTANT: Note that AEM Front may push changes into AEM differently than the Maven build, possibly causing issues that are hard to debug.
* `npm run build:watch` if you only want to run Webpack's watcher without AEM Front.
* `npm run production` to make the code production-ready. This is the script the Maven build should run.
* `npm test` if you want to run tests.
