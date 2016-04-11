# Provision React Component
> Rapidly provision React components

This package will allow you to quickly create new components, and update old ones, based on the conventions we follow at [The Economist](http://economist.com/).

## How To Install

You can install this package, using [npm](http://npmjs.com/) in your [Terminal](http://www.davidbaumgold.com/tutorials/command-line/).

To install the package globally, so that you can use it all the time, run:

```sh
npm install --global @economist/provision-react-component
```

## How To Run

With the package installed, you can run `provision-react-component` command - which will provision a React component for you to use. This command takes one argument - the directory that you'd like to provision the react component in...

### Making a new React Component

In your Terminal, `cd` into your Projects directory - for example `cd ~/Projects`. Then run the command:

```sh
# change `my-react-project` to the name of your project
provision-react-component my-react-project
```

The script will ask you some questions, such as the name and description of the project. Here is an example of the questions, complete with answers typed in:

```sh
? What is the repository url? git@github.com/economist-components/my-react-project
? What is the name of this project? my-react-project
? Describe this project: This is my first react project
```

## Commit Hooks

Part of the scripts that run on this design will add hooks to your git repository, so that when you make a commit, all of your code is [linted](#npm-run-lint) - and your [commit message is checked to ensure it fits the right format](#commit-message-format). If your code does not pass the lint phase, you cannot commit. If your commit message is not correctly formatted, you cannot commit. Both of these checks ensure that only good quality commits are created.

## Commit Message Format

Each commit message consists of a header and a body. The header has a special format that includes a type, an optional scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
```

The header is mandatory and the scope of the header is optional. To omit the scope, simply do not include the parenthesis, like so:

```
<type>: <subject>
<BLANK LINE>
<body>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

Bellow is an explanation of each of the fields:

### Type

The type is a required field, and denotes what the commit message contains. It must be one of the following:

 - `feat`: A new feature - will cause a semver-minor release (`x.x+1.x`).
 - `fix`: A bug fix - will cause a semver-patch release (`x.x.x+1`).
 - `docs`: Documentation only changes, for example Readme.md, comments, extra doc files.
 - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing  - semi-colons, etc).
 - `refactor`: A change to the main code that neither fixes a bug nor adds a feature.
 - `perf`: A change to the main code that improves performance.
 - `test`: A change to the tests which doesn't change the main code, for example adding missing tests or fixing broken ones.
 - `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation, updating package dependencies, changing config files like `.editorconfig` or `package.json`.

### Scope

Scope is an optional field - that can be used as a signal for larger projects, as to which part is being touched. For example a project with both server and client code could have `server` and `client` as scopes. There are no restrictions of what Scope should be.

### Subject

The subject contains succinct description of the change:

 - use the imperative, present tense: "change" not "changed" nor "changes"
 - don't capitalize first letter
 - no dot (.) at the end

### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

If a change is breaking, the body should include the term `BREAKING CHANGE:` on its own line, followed by the reasoning for the breaking change.

### Examples

```
docs(README): fix typo
```
```
style: adhere to new style guidelines
```
```
fix(formatter): ensure no error is thrown when not given a string

Before this change, passing a non-String to the format function would cause it to throw with an
error: `TypeError: Cannot call toLowerCase of undefined`. This now fixes that by casting the
first argument as a string.
```
```
fix(formatter): ensure no error is thrown when not given a string

Before this change, passing a non-String to the format function would cause it to throw with an
error: `TypeError: Cannot call toLowerCase of undefined`. This now fixes that by casting the
first argument as a string.
```
```
feat: add CSS for icons, remove SVGs sources

BREAKING CHANGE:

This now uses CSS imports over SVG files to render icons. So code should transition from:

    <svg><use xlink:href="the-icon.svg"/></svg>

To:

    <span class="icon the-icon"/>
```


## Folder Structure

The directory structure has been carefully considered. Please follow the directory conventions at all times:

### `src/` directory

This is where all of the source code that you will write goes. Typically this consists of:

 - `index.js` (the main React Component code)
 - `example.js` (an example of how to use the React Component, used for documentation)
 - `index.css` (the main CSS needed for the main React Component)
 - `example.css` (some example css, used to drive the `example.js`)

### `test/` directory

This is where all of the test code should go. The test code should run tests against code in the [`src/` directory](#src-directory).

### `assets/` directory

This directory is used to store assets that the module might want to publish. Assets are non-source files, for example SVGs, Fonts, or Images. Feel free to put any assets that this component needs to work into this directory.

### `scripts/` directory

This directory holds all of the scripts that are used for building parts of the project. Typically it just holds the `build.sh` which is used for the [`npm run ci`](#npm-run-ci) task. You are welcome to add new scripts into this directory if you need to write additional complex tasks for the component. You can safely ignore this directory otherwise.

### `lib/` directory

This directory is created temporarily, to compile the `src/` directory contents into - before publishing the module. This directory is published when the module is published. You should not edit any files within this directory because they very likely will be removed or changed without notice. You should not check any files from this directory into source control (git).

### `site/` directory

This directory holds all of the compiled code that is used for generating documentation, that will eventually be uploaded to [GitHub Pages](https://pages.github.com/). This directory is effectively throwaway, as it is generated by various scripts. You should not edit any files within this directory because they very likely will be removed or changed without notice. You should not check any files from this directory into source control (git).

### `node_modules/` directory

This is where [npm](http://npmjs.com/) keeps all of your dependencies. This directory will frequently change contents (every time you run `npm install` or `npm update`), and is, effectively, disposable. You should not edit any files within this directory because they very likely will be removed or changed without notice. You should not check any files from this directory into source control (git).

## Tasks

### The important ones:

#### `npm start`

This will start watching all of the source files, and compile them whenever they get saved. It also opens a browser to http://localhost:4000 - with the contents of the component shown, plus some tests and documentation for good measure.

`npm start` is an alias for [`npm run watch`](#npm-run-watch)

#### `npm test`

This will run the unit tests in a suite of browsers, depending on your current system setup. If you have a `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` it will use SauceLabs to run tests remotely on a set of browsers. Otherwise it will try to run them in PhantomJS.

To utilise SauceLabs, run the following:

```sh
export SAUCE_USERNAME='myusername'
export SAUCE_ACCESS_KEY='myaccesskey'
npm test
```

This script also runs [`npm run lint`](#npm-run-lint) before testing files.

#### `npm run lint`

This task will check your code from within the `src/` directory, and find any potential errors. It runs all of the lint tasks; [`npm run lint:css`](#npm-run-lint-css) and [`npm run lint:js`](#npm-run-lint-css).

#### `npm run pages`

This builds all of the documentation ([`npm run doc`](#npm-run-doc)), and subsequently tries to commit the [`site/` directory](#site-directory) (generated by [`npm run doc`](#npm-run-doc))

This task uses [`git-directory-deploy`](https://github.com/lukekarrys/git-directory-deploy) to push the [`site/` directory](#site-directory) into your origin's `gh-pages` branch. Running this command will overwrite your gh-pages website with the new contents.

Your gh-pages website is `https://YOUR-USERNAME.github.io/THE-REPO` - for example if your username was "economist-components" and the repository name was "comoonent-icon" then the pages url would be `https://economist-components.github.io/component-icon`.

#### `npm run provision`

This runs the `provision-react-component` command over your code. You can run this to ensure your files include all of the settings that they should have. If you first run `npm update --save-dev @economist/provision-react-component`, followed by `npm run provision` - then any updates to `provision-react-component` will be reflected into your package.

#### `npm run semantic-release`
`semantic-release pre && npm publish && semantic-release post`


### The ones you'll rarely need to type:

#### `npm run build`

This task runs all of the `build` tasks; by default these are [`npm run build:js`](#npm-run-build-js), and [`npm run build:css`](#npm-run-build-css). You are welcome to extend these with your own `build:*` scripts. `npm run build` will automatically run any script prefixed with `build:`.

#### `npm run build:css`

This task copies the `.css` files from [`src/` directory](#src-directory) into [`lib/` directory](#lib-directory). The [`lib/` directory](#lib-directory) is the directory that gets packaged up when the module gets published (while `src/` is excluded from the published package).

#### `npm run build:js`

Using [Babel](babeljs.io), this task compiles all `.js` files from [`src/` directory](#src-directory) into [`lib/` directory](#lib-directory). The [`lib/` directory](#lib-directory) is the directory that gets packaged up when the module gets published (while `src/` is excluded from the published package).

#### `npm run ci`

This runs the `scripts/build.sh` file. It is used for the continuous integration environment. The build.sh builds a [Docker](https://www.docker.com/) [container](https://www.docker.com/what-docker), which runs [`npm test`](#npm-test). If that succeeds, then it runs [`npm run pages`](#npm-run-pages) and finally runs [`npm run semantic-release`](#npm-run-semantic-release).

There's almost no reason to run this locally. Everything it does can be run by other scripts.

#### `npm run lint:css`

This runs [stylelint](https://github.com/stylelint/stylelint) with the [stylelint-config-strict](https://github.com/keithamus/stylelint-config-strict) plugin.

Stylelint will check through the CSS files in `src/` (usually that will be `src/index.css` and `src/example.css`). It will log out some error messages for the parts of the code that don't fit to our style guidelines.

Anything that causes stylelint to log an error should be fixed.

#### `npm run lint:js`

This runs [eslint](http://eslint.org/) with the [eslint-config-strict](https://github.com/keithamus/eslint-config-strict) and [eslint-config-strict-react](https://github.com/keithamus/eslint-config-strict-react) plugins.

Eslint will check through the JS files in `src/` (usually that will be `src/index.js` and `src/example.js`). It will log out some error messages for the parts of the code that don't fit to our style guidelines.

Anything that causes eslint to log an error should be fixed.

#### `npm run doc`

This task builds the `site/` directory, which includes all of the generated documentation - some HTML files, coupled with compiled versions of the code and
css.

This task runs all of the `doc` tasks; by default these are [`npm run doc:assets`](#npm-run-doc-assets), [`npm run doc:js`](#npm-run-doc-js), [`npm run doc:css`](#npm-run-doc-css), and [`npm run doc:html`](#npm-run-doc-html). You are welcome to extend these with your own `doc:*` scripts. `npm run doc` will automatically run any script prefixed with `doc:`.

If you create any [`npm run build:`](#npm-run-build) scripts, then you will probably want to create the equivalent doc script.

#### `npm run doc:assets`

This task generates any needed assets for the Documentation pages. Using [`npm-assets`](https://github.com/conradz/npm-assets), this task copies the assets (SVGs, Fonts, Images) from your [dependencies](#node_modules-directory) into the `site/assets` folder.

You can configure folder these assets are copied into by changing the `package.json` `directories.site` field.

#### `npm run doc:css`

This task generates the CSS for the Documentation pages. It processes the `example.css` from within the [`src/` directory](#src-directory), using [PostCSS](https://github.com/postcss/postcss), and outputs the contents to [`site/bundle.css`](#site-directory).

You can configure the CSS file that this task compiles by changing the `package.json` `exampleStyle` field. You can configure the directory that the bundle is compiled out to by changing the `directories.site` field.

#### `npm run doc:js`

This task generates the JS for the Documentation pages. It processes all `.js` files inside the [`test/` directory](#test-directory), using [Browserify](http://browserify.org/), and outputs the contents to [`site/bundle.js`](#site-directory).

You can configure the directory that this task scans by changing the `package.json` `directories.test` field. You can configure the directory they are compiled into by changing the `directories.site` field.

#### `npm run doc:html`

This task generates the HTML for the Documentation pages. It takes the [Handlebars](http://handlebarsjs.com/) templates from the [`@economist/doc-pack`](https://gitub.com/economist-components/doc-pack) package and, using [`hbs-cli`](https://github.com/keithamus/hbs-cli), compiles them into HTML.

You can configure the templates that are compiled by changing the `package.json` `config.doc.html.files` field. You can configure the directory they are compiled into by changing the `directories.site` field.

#### `npm run watch`

This task runs all of the `watch` tasks; by default these are [`npm run watch:serve`](#npm-run-watch-serve), and [`npm run watch:doc`](#npm-run-watch-doc). You are welcome to extend these with your own `watch:*` scripts. `npm run watch` will automatically run any script prefixed with `watch:`.

#### `npm run watch:serve`

This task uses [`live-server`](https://github.com/tapio/live-server) to watch over the [`site/` directory](#site-directory) and serve the contents.L

You can configure the directory that it serves by changing the `package.json` `directories.site` field.

#### `npm run watch:doc`

This task runs all of the `watch:doc` tasks; by default these are [`npm run watch:doc:assets`](#npm-run-watch-doc-assets), [`npm run watch:doc:js`](#npm-run-watch-doc-js), [`npm run watch:doc:css`](#npm-run-watch-doc-css), and [`npm run watch:doc:html`](#npm-run-watch-doc-html). You are welcome to extend these with your own `watch:doc:*` scripts. `npm run watch:doc` will automatically run any script prefixed with `watch:doc:`.

If you create any [`npm run doc:`](#npm-run-doc) scripts, then you will probably want to create the equivalent `npm run watch:doc:` script.

#### `npm run watch:doc:assets`

This task is an alias for [`npm run doc:assets`](#npm-run-doc-assets).

#### `npm run watch:doc:css`

This task runs [`npm run doc:css`](#npm-run-doc-css) in watch mode. Any changes to the [`src/example.css`](#src-directory) will trigger a rebuild of the css, and this task will run again.

#### `npm run watch:doc:html`

This task runs [`npm run doc:html`](#npm-run-doc-html) in watch mode. Any changes to the HTML templates in that task will trigger a rebuild, and this task will run again.

#### `npm run watch:doc:js`

This task runs [`npm run doc:js`](#npm-run-doc-js) in watch mode. Any changes to the [`test/*.js`](#test-directory) files will trigger a rebuild of the JS, and this task will run again.

### Pre-Scripts (you'll never need to type these)

#### `npm run prebuild:css`

This task automatically runs before [`npm run build:css`](#npm-run-build-css), and ensures the `lib/` directory exists.

You can configure the directory that it creates by changing the `package.json` `directories.lib` field.

#### `npm run predoc`

This task automatically runs before [`npm run doc`](#npm-run-doc), and ensures the `site/` directory exists.

You can configure the directory that it creates by changing the `package.json` `directories.site` field.


#### `npm run prewatch:doc`

This task automatically runs before [`npm run watch:doc`](#npm-run-watch-doc), and is an alias for [`npm run predoc`](#npm-run-predoc).

#### `npm run prepages`

This task automatically runs before [`npm run pages`](#npm-run-pages), and is an alias for [`npm run doc`](#npm-run-doc).

#### `npm run prepublish`

This task automatically runs before [`npm publish`](https://docs.npmjs.com/cli/publish), and is an alias for [`npm run build`](#npm-run-build).
