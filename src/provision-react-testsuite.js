#!/usr/bin/env node
import { packageToCamel, packageToClass, packageToCss } from './package-names';
import defaultsDeep from 'lodash.defaultsdeep';
import getBestVersion from './get-best-version';
import jsonFile from 'packagesmith.formats.json';
import nameQuestion from 'packagesmith.questions.name';
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
          'react': getBestVersion(packageJson, 'react', 'dependencies'),
        },
        devDependencies: {
          'react-addons-test-utils': getBestVersion(packageJson, 'react-addons-test-utils'),
          'react-dom': getBestVersion(packageJson, 'react-dom'),
          'mocha': getBestVersion(packageJson, 'mocha'),
          'chai': getBestVersion(packageJson, 'chai'),
          'chai-spies': getBestVersion(packageJson, 'chai-spies'),
          'karma': getBestVersion(packageJson, 'karma'),
          'karma-mocha': getBestVersion(packageJson, 'karma-mocha'),
          'karma-mocha-reporter': getBestVersion(packageJson, 'karma-mocha-reporter'),
          'karma-phantomjs-launcher': getBestVersion(packageJson, 'karma-phantomjs-launcher'),
          'karma-browserify': getBestVersion(packageJson, 'karma-browserify'),
          'karma-coverage': getBestVersion(packageJson, 'karma-coverage'),
          'browserify-istanbul': getBestVersion(packageJson, 'browserify-istanbul'),
          'istanbul': getBestVersion(packageJson, 'istanbul'),
          'chai-enzyme': getBestVersion(packageJson, 'chai-enzyme'),
          'enzyme': getBestVersion(packageJson, 'enzyme'),
          'isparta': getBestVersion(packageJson, 'isparta'),
          'phantomjs-prebuilt': getBestVersion(packageJson, 'phantomjs-prebuilt'),
          'karma-sauce-launcher': getBestVersion(packageJson, 'karma-sauce-launcher'),
          'babel-polyfill': getBestVersion(packageJson, 'babel-polyfill'),
          'coveralls': getBestVersion(packageJson, 'coveralls'),
          'lcov-result-merger': getBestVersion(packageJson, 'lcov-result-merger'),
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
