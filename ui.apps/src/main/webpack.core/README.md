# package.json

If the Maven build is run, it will automatically run "npm run deploy" and do its front end magic.

If you want to run single scripts without having to run the full Maven build, here are the commands:

* `npm start` to run tests and bundle JavaScript and CSS files whenever a file is saved. IMPORTANT: Note that simply bundling those files doesn't deploy them into the AEM instance. For that you have to run a tool such as [AEM Front](https://kevinw.de/aem-front/), or run the Maven build.
* `npm run build:watch` if you don't want to run tests but still watch file changes. Run AEM Front in parallel (see previous point).
* `npm run deploy` to make the code production-ready usable by the Maven build.
* `npm test` if you want to only run tests once.
