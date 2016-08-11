#!/usr/bin/env node
import { format as formatUrl, parse as parseUrl } from 'url';
import defaultsDeep from 'lodash.defaultsdeep';
import getBestVersion from './get-best-version';
import jsonFile from 'packagesmith.formats.json';
import repositoryQuestion from 'packagesmith.questions.repository';
import { runProvisionerSet } from 'packagesmith';
import sortPackageJson from 'sort-package-json';
import yamlFile from 'packagesmith.formats.yaml';
function getAuthenticatedUrl(url) {
  let parsed = parseUrl(String(url));
  if (parsed.protocol === null) {
    parsed = parseUrl(`https://${ String(url) }`);
    if (/^\/:/.test(parsed.pathname)) {
      parsed.pathname = parsed.pathname.replace(/^\/:/, '/');
    }
  }
  parsed.protocol = 'https';
  parsed.auth = 'GH_TOKEN';
  return formatUrl(parsed).replace('GH_TOKEN', '${GH_TOKEN}');
}
export function provisionTravisYaml() {
  return {
    '.travis.yml': {
      questions: [ repositoryQuestion() ],
      contents: yamlFile((travisYaml, { repository }) => defaultsDeep({
        /* eslint-disable camelcase, id-match */
        sudo: false,
        language: 'node_js',
        node_js: [
          '4',
          'stable',
        ],
        after_success: [
          'travis-after-all',
          'npm run semantic-release',
          `npm run pages -- --repo ${ getAuthenticatedUrl(repository) }`,
        ].join(' && '),
        /* eslint-enable camelcase, id-match */
      }, travisYaml)),
    },

    'package.json': {
      contents: jsonFile((packageJson) => sortPackageJson(defaultsDeep({
        devDependencies: {
          'travis-after-all': getBestVersion(packageJson, 'travis-after-all'),
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
