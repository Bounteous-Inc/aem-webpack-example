# AEM Webpack Example

This project demonstrates a proven practice for setting up Webpack in AEM. It provides a straightforward Webpack configuration that supports Babel, JavaScript and CSS linting, and JavaScript testing. It is part of the setup [Infield Digital](http://www.infielddigital.com/) introduced to some major AEM customers.

## Why Webpack in AEM?

AEM might be the best system for content and user experience management. It provides reliable tools that power [some](http://store.nike.com/) [of](https://aws.amazon.com/) [the](https://www.chase.com/) [biggest](https://www.salesforce.com/) websites and that Java developers enjoy working with.

However, your front end developers are probably not happy with it and waste precious time. Why? AEM's out-of-the-box tools can't keep up with the rapid advances in the front end world.

![Front end development in AEM](https://i.imgur.com/vKwoLvU.jpg)

**Webpack in AEM improves front end development because...**

- It allows using the latest JavaScript standards _without_ breaking clientlibs and AEM's built-in compression libraries.
- It promotes modular and reusable code. You can import modules, variables and files using JavaScript and tie it to an AEM component. This results in code that's easier to maintain, which saves time and _$$$_.
- It can be extended easily and supports the integration of [~600.000](http://www.modulecounts.com/) npm modules.
- It can automatically prefix CSS for better cross-browser compatibility, ensure consistent code style, and automate most tasks you can think of.
- It even allows writing tests for JavaScript.

**Let's make AEM fun for everyone.**

![Make AEM fun again](https://i.imgur.com/t37OlGq.jpg)

## Integrate Webpack into AEM

Before you start, you might want to read the blog post "[How does Webpack fit into AEM?](https://www.infielddigital.com/blog/webpack-in-aem/)" to get a general idea of some concepts that are implemented in AEM Webpack Example.

The structure of this project mirrors Adobe's [Project Archetype](https://github.com/Adobe-Marketing-Cloud/aem-project-archetype/tree/master/src/main/archetype). To get started, you can either [set up a new project](https://github.com/Adobe-Marketing-Cloud/aem-project-archetype) using the archetype, or you use your existing project. Then follow the step-by-step summary below. Each step links to a folder containing a **README** file with more instructions. Make sure you read those for detailed instructions of each aspect.

1. [Copy the example Webpack folder, .babelrc and .gitignore](ui.apps/src/main) to `ui.apps/src/main`.
2. [Extend your project's pom.xml](ui.apps).

This is already enough to run the project's Maven build and Webpack. Try it now! Then you want to modify a few more things:

3. Customize the [webpack.project configuration](ui.apps/src/main/webpack.project/index.js).
4. [Use the generated files on your page](ui.apps/src/main/content/jcr_root/apps/__appsFolderName__/clientlibs/clientlib-components), for example by including them in a clientlib.

## Demo

Video summary:

- Automatically watch JavaScript and SCSS changes
- See what happens if CSS violates a Stylelint rule
- See what Autoprefixer does to your CSS

[![Webpack in use](https://www.infielddigital.com/shared/aem-webpack-example-demo-thumbnail.jpg)](https://www.youtube.com/watch?v=FqrKe6ieyWg)

## Concepts

- Unlimited `webpack.module` folders. This is where developers define component-specific JavaScript and SCSS.
- One `webpack.core` folder. This is where core tools of this framework are defined. Avoid touching this folder to make future upgrades easier. All you might want to change in this folder is the `package.json` file in order to update NPM dependencies and scripts. We're aware that the configuration isn't ideal and doesn't satisfy everyone's needs, so we encourage you to raise questions and open [issue tickets](https://github.com/infielddigital/aem-webpack-example/issues) for further discussion.
- One `webpack.project` folder. Here lives the configuration for a project, allowing you to override and extend defaults defined in `webpack.core`.
- One `webpack.resolve` folder. Webpack takes this folder and resolves its content for easy imports into JS and SCSS files. See [webpack.resolve](ui.apps/src/main/content/jcr_root/apps/__appsFolderName__/components/webpack.resolve).
- One `webpack.bundle` folder. Every entry file defined in `webpack.project` results in one output file that gets stored in this folder.

## Toolbox

AEM Webpack Example supports the following tools out-of-the-box:

- Maven integration using [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin).
- Webpack.
- [AEM Front](https://kevinw.de/aem-front/) to auto-push changes into AEM and reload the browser window.
- CSS/SCSS.
- Babel. JavaScript compilation using Babel's recommended [env preset](http://babeljs.io/docs/plugins/preset-env/).
- ESLint. Linting for JavaScript.
- Stylelint. Linting for CSS/SCSS.
- Autoprefixer. Prefixes CSS/SCSS to improve cross-browser compatibility.
- Jest. Testing for JavaScript.

## Who we are

> Infield Digital is a consultancy that helps brands deliver rich, relevant customer experiences.

With offices in San Francisco and Denver, we provide Customer Experience Management (CXM) solutions that integrate with existing data and systems. As certified Adobe, Magento and Elastic Path Business Partners, we engineer modern digital marketing solutions on a foundation of data and engineering.

[We're hiring!](https://www.infielddigital.com/careers/)

And we are the AEM and front end experts you've been looking for. [Meet us](https://www.infielddigital.com/).
