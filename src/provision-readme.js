#!/usr/bin/env node
import { packageToClass, packageToNpm } from './package-names';
import descriptionQuestion from 'packagesmith.questions.description';
import nameQuestion from 'packagesmith.questions.name';
import { runProvisionerSet } from 'packagesmith';
export function provisionReadme() {
  return {
    'README.md': {
      questions: [
        nameQuestion(),
        descriptionQuestion(),
      ],
      contents: (contents, answers) => {
        const packageName = packageToNpm(answers);
        const escapedPackageName = `@${ packageName.scope }%2F${ packageName.name }`;
        return contents || `[![By:Economist](
  https://img.shields.io/badge/By-Economist-e3120b.svg?style=flat-square
)](
  http://www.economist.com/
)[![Build Status](
  https://img.shields.io/npm/v/${ escapedPackageName }.svg?style=flat-square
)](
  https://www.npmjs.com/package/${ escapedPackageName }
)[![Build Status](
  https://img.shields.io/travis/economist-components/${ packageName.name }/master.svg?style=flat-square
)](
  https://travis-ci.org/economist-components/${ packageName.name }/branches
)[![Coverage Status](
  https://img.shields.io/coveralls/economist-components/${ packageName.name }/master.svg?style=flat-square
)](
  https://coveralls.io/github/economist-components/${ packageName.name }?branch=master
)

# ${ packageToClass(answers) }
> ${ answers.description }

## Usage

**This component expects an ES6 environment**, and so if you are using this in an app,
you should drop in a polyfill library - it has been tested with [babel-polyfill] but
[core-js] or [es6-shim] may also work.

[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/
[core-js]: https://www.npmjs.com/package/core-js
[es6-shim]: https://www.npmjs.com/package/es6-shim

The default export is a React Component, so you can simply import the component and use
it within some JSX, like so:

\`\`\`js
import ${ packageToClass(answers) } from '${ answers.name }';

return <${ packageToClass(answers) }/>;
\`\`\`

For more examples on usage, see [\`src/example.es6\`](./src/example.es6).

## Install

\`\`\`bash
npm i -S ${ answers.name }
\`\`\`

## Run tests

\`\`\`bash
npm test
\`\`\`
`;
      },
    },
  };
}
export default provisionReadme;
if (require.main === module) {
  const directoryArgPosition = 2;
  runProvisionerSet(process.argv[directoryArgPosition] || process.cwd(), provisionReadme());
}
