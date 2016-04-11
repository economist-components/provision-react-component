#!/usr/bin/env node
import defaultsDeep from 'lodash.defaultsdeep';
import jsonFile from 'packagesmith.formats.json';
import { runProvisionerSet } from 'packagesmith';
import sortPackageJson from 'sort-package-json';
import yamlFile from 'packagesmith.formats.yaml';
export function provisionTravisYaml() {
  return {
    '.travis.yml': {
      contents: yamlFile((travisYaml) => defaultsDeep({
        /* eslint-disable camelcase, id-match */
        sudo: false,
        language: 'node_js',
        cache: {
          directories: [
            'node_modules',
          ],
        },
        node_js: [
          '4',
          'stable',
        ],
        after_success: 'travis-after-all && npm run pages && npm run semantic-release',
        /* eslint-enable camelcase, id-match */
      }, travisYaml)),
    },

    'package.json': {
      contents: jsonFile((packageJson) => sortPackageJson(defaultsDeep({
        devDependencies: {
          'travis-after-all': '^1.4.4',
        },
      }, packageJson))),
    },

  };
}
export default provisionTravisYaml;
if (require.main === module) {
  const directoryArgPosition = 2;
  runProvisionerSet(process.argv[directoryArgPosition] || process.cwd(), provisionTravisYaml());
}
