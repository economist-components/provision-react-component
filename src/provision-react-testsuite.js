#!/usr/bin/env node
import { packageToCamel, packageToClass, packageToCss } from './package-names';
import defaultsDeep from 'lodash.defaultsdeep';
import jsonFile from 'packagesmith.formats.json';
import nameQuestion from 'packagesmith.questions.name';
import packageVersions from '../package-versions';
import { readFileSync as readFile } from 'fs';
import { resolve as resolvePath } from 'path';
import { runProvisionerSet } from 'packagesmith';
import sortPackageJson from 'sort-package-json';
import unique from 'lodash.uniq';
const jsonDefaultIndent = 2;
const karmaConf = readFile(resolvePath(__dirname, '../assets/karma.conf.js'), 'utf8');
export function provisionTestFiles() {
  return {

    'karma.conf.js': {
      contents: () => karmaConf,
    },

    'package.json': {
      after: 'npm install',
      contents: jsonFile((packageJson) => sortPackageJson(defaultsDeep({
        directories: {
          test: 'test',
        },
        dependencies: {
          'react': packageVersions.react,
        },
        devDependencies: {
          'react-addons-test-utils': packageVersions['react-addons-test-utils'],
          'react-dom': packageVersions['react-dom'],
          'mocha': packageVersions.mocha,
          'chai': packageVersions.chai,
          'chai-spies': packageVersions['chai-spies'],
          'karma': packageVersions.karma,
          'karma-mocha': packageVersions['karma-mocha'],
          'karma-mocha-reporter': packageVersions['karma-mocha-reporter'],
          'karma-phantomjs-launcher': packageVersions['karma-phantomjs-launcher'],
          'karma-browserify': packageVersions['karma-browserify'],
          'karma-coverage': packageVersions['karma-coverage'],
          'browserify-istanbul': packageVersions['browserify-istanbul'],
          'istanbul': packageVersions.istanbul,
          'chai-enzyme': packageVersions['chai-enzyme'],
          'enzyme': packageVersions.enzyme,
          'isparta': packageVersions.isparta,
          'phantomjs-prebuilt': packageVersions['phantomjs-prebuilt'],
          'karma-sauce-launcher': packageVersions['karma-sauce-launcher'],
          'babel-polyfill': packageVersions['babel-polyfill'],
          'coveralls': packageVersions.coveralls,
          'lcov-result-merger': packageVersions['lcov-result-merger'],
        },
        scripts: {
          test: 'karma start',
          posttest: 'lcov-result-merger \'coverage/**/lcov.info\' | coveralls; true',
        },
      }, packageJson))),
    },

    'test/.eslintrc': {
      contents: (contents) => {
        const eslintrc = contents ? JSON.parse(contents) : {};
        return JSON.stringify({
          ...eslintrc,
          extends: unique([
            ...(eslintrc.extends || []),
            'strict',
            'strict-react',
            'strict/test',
          ]),
        }, null, jsonDefaultIndent);
      },
    },

    'test/index.js': {
      questions: [ nameQuestion() ],
      contents: (contents, answers) => contents ||
`import 'babel-polyfill';
import ${ packageToClass(answers) } from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiEnzyme()).should();
describe('${ packageToClass(answers) }', () => {

  it('renders a React element', () => {
    React.isValidElement(<${ packageToClass(answers) } />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let ${ packageToCamel(answers) } = null;
    beforeEach(() => {
      rendered = mount(<${ packageToClass(answers) } />);
      ${ packageToCamel(answers) } = rendered.find('.${ packageToCss(answers) }');
    });

    it('renders a top level div.${ packageToCss(answers) }', () => {
      ${ packageToCamel(answers) }.should.have.tagName('div');
      ${ packageToCamel(answers) }.should.have.className('${ packageToCss(answers) }');
    });

    xit('renders <FILL THIS IN>', () => {
      ${ packageToCamel(answers) }.should.have.exactly(1).descendants('.the-descendent-class');
      ${ packageToCamel(answers) }.find('.the-descendent-class').should.have.tagName('TAG');
    });

  });

});
`,
    },
  };
}
export default provisionTestFiles;
if (require.main === module) {
  const directoryArgPosition = 2;
  runProvisionerSet(process.argv[directoryArgPosition] || process.cwd(), provisionTestFiles());
}
