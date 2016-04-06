#!/usr/bin/env node
import getObjectPath from 'lodash.get';
import jsonFile from 'packagesmith.formats.json';
import multilineFile from 'packagesmith.formats.multiline';
import { runProvisionerSet } from 'packagesmith';
import sortPackageJson from 'sort-package-json';
import without from 'lodash.without';

export function provisionLegacyRemoval() {
  return {

    '.gitignore': {
      contents: multilineFile((contents) => without(contents || [],
        'node_modules/',
        '*.log',
        '*.js',
        'bundle.css',
        '*.html',
        '!karma.conf.js',
        'testbundle.js',
      )),
    },

    'package.json': {
      after: 'npm prune',
      // This is a big function, we could split it up but its pretty readable.
      contents: jsonFile((packageJson) => { // eslint-disable-line max-statements
        Reflect.deleteProperty(packageJson, 'component-devserver');
        Reflect.deleteProperty(packageJson, 'devpack-doc');
        Reflect.deleteProperty(packageJson, 'pre-commit');
        Reflect.deleteProperty(packageJson, 'watch');
        if (packageJson.scripts) {
          Reflect.deleteProperty(packageJson.scripts, 'preinstall');
          Reflect.deleteProperty(packageJson.scripts, 'postinstall');
          Reflect.deleteProperty(packageJson.scripts, 'serve');
          Reflect.deleteProperty(packageJson.scripts, 'prepublish:watch');
          Reflect.deleteProperty(packageJson.scripts, 'test:base');
          Reflect.deleteProperty(packageJson.scripts, 'doc:watch');
          Reflect.deleteProperty(packageJson.scripts, 'doc:js:watch');
          Reflect.deleteProperty(packageJson.scripts, 'doc:css:watch');
          Reflect.deleteProperty(packageJson.scripts, 'doc:html:watch');
          Reflect.deleteProperty(packageJson.scripts, 'doc:html:watch');
        }
        if (packageJson.devDependencies) {
          Reflect.deleteProperty(packageJson.devDependencies, '@economist/component-devpack');
          Reflect.deleteProperty(packageJson.devDependencies, '@economist/component-devserver');
          Reflect.deleteProperty(packageJson.devDependencies, '@economist/component-testharness');
          Reflect.deleteProperty(packageJson.devDependencies, 'parallelshell');
          Reflect.deleteProperty(packageJson.devDependencies, 'eslint-plugin-one-variable-per-var');
          Reflect.deleteProperty(packageJson.devDependencies, 'minifyify');
          Reflect.deleteProperty(packageJson.devDependencies, 'postcss');
          Reflect.deleteProperty(packageJson.devDependencies, 'react');
          Reflect.deleteProperty(packageJson.devDependencies, 'chai-things');
          Reflect.deleteProperty(packageJson.devDependencies, 'cssnext');
          Reflect.deleteProperty(packageJson.devDependencies, 'babel-runtime');
          Reflect.deleteProperty(packageJson.devDependencies, 'babel-loader');
          Reflect.deleteProperty(packageJson.devDependencies, 'browser-sync');
          Reflect.deleteProperty(packageJson.devDependencies, 'karma-chai');
          Reflect.deleteProperty(packageJson.devDependencies, 'karma-chrome-launcher');
          Reflect.deleteProperty(packageJson.devDependencies, 'pre-commit');
          Reflect.deleteProperty(packageJson.devDependencies, 'react-addons-test-utils');
          Reflect.deleteProperty(packageJson.devDependencies, 'react-dom');
          Reflect.deleteProperty(packageJson.devDependencies, 'npm-watch');
        }
        if (packageJson.dependencies) {
          Reflect.deleteProperty(packageJson.dependencies, 'babel-runtime');
        }
        if (packageJson.config) {
          Reflect.deleteProperty(packageJson.config, 'lint_opts');
          Reflect.deleteProperty(packageJson.config, 'testbundle_opts');
          Reflect.deleteProperty(packageJson.config, 'ghpages_files');
        }
        if (packageJson.babel) {
          packageJson.babel.optional = without(packageJson.babel.optional || [], 'runtime');
          if (packageJson.babel.optional.length === 0) {
            Reflect.deleteProperty(packageJson.babel, 'optional');
          }
          Reflect.deleteProperty(packageJson.babel, 'sourceMaps');
        }
        packageJson.files = without(packageJson.files || [],
          '*.js',
          '*.es6',
          '*.css',
          '!karma.conf.js',
          '!testbundle.js',
        );
        const build = getObjectPath(packageJson, 'scripts.build');
        if (build && build !== 'npm-run-all --parallel build:*' && build !== 'npm-assets .') {
          Reflect.deleteProperty(packageJson.scripts, 'build');
          packageJson.scripts['build:LEGACY-RENAME-THIS'] = build;
        }
        return sortPackageJson(packageJson);
      }),
    },

  };
}
export default provisionLegacyRemoval;
if (require.main === module) {
  const directoryArgPosition = 2;
  runProvisionerSet(process.argv[directoryArgPosition] || process.cwd(), provisionLegacyRemoval());
}
