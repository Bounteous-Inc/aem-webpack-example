# package.json

If the Maven build is run, it will automatically run "yarn run deploy" and do its front end magic.

However, if you want to run single scripts without having to run the full Maven build, you must install Yarn on your computer. Follow the steps [here](https://yarnpkg.com/en/docs/install)

If Yarn is installed, you can execute:

* `yarn start` to run tests and bundle JavaScript and CSS files whenever a file is saved. IMPORTANT: Note that simply bundling those files doesn't deploy them into the AEM instance. For that you have to run a tool such as [AEM Front](https://www.npmjs.com/package/aem-front), or you run the Maven build.
* `yarn run build:watch` if you don't want to run tests but still watch file changes. Run AEM Front in parallel (see previous point).
* `yarn run deploy` to make the code production-ready usable by the Maven build.
* `yarn test` if you want to only run tests once.
