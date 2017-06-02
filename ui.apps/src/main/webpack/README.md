# package.json

If the Maven build is run, it will automatically run "yarn run deploy" and do its front end magic.

However, if you want to run single scripts without having to run the full Maven build, you must install Yarn on your computer. Follow the steps here: https://yarnpkg.com/en/docs/install

If Yarn is installed, you can run:
* Run `yarn start` to run tests and bundle JavaScript and CSS files whenever a file is saved. IMPORTANT: Note that simply bundling those files doesn't deploy them into the AEM instance. For that you have to run a tool such as [AEM Front](https://www.npmjs.com/package/aem-front), or you run the Maven build.
* If you don't want to run tests but still watch file changes, run `yarn run build:watch`. Run AEM Front in parallel (see previous point).
* `yarn run deploy` is used by the Maven build and makes the code production-ready.
* To only run tests once, run `yarn test`.
