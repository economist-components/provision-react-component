#!/usr/bin/env node
import defaultsDeep from 'lodash.defaultsdeep';
import descriptionQuestion from 'packagesmith.questions.description';
import jsonFile from 'packagesmith.formats.json';
import moduleJson from '../package.json';
import nameQuestion from 'packagesmith.questions.name';
import { packageToNpm } from './package-names';
import packageVersions from '../package-versions';
import { runProvisionerSet } from 'packagesmith';
import sortPackageJson from 'sort-package-json';
export function provisionPackageJson() {
  return {
    'package.json': {
      questions: [ nameQuestion(), descriptionQuestion() ],
      contents: jsonFile((packageJson, answers) => {
        const packageName = packageToNpm(answers);
        let bugsUrl = `https://github.com/economist-components/${ packageName.name }/issues`;
        if (typeof packageJson.bugs === 'string') {
          bugsUrl = packageJson.bugs;
          Reflect.deleteProperty(packageJson, 'bugs');
        }
        return sortPackageJson(defaultsDeep({
          name: `@${ packageName.scope }/${ packageName.name }`,
          license: 'MIT',
          description: answers.description,
          homepage: `https://github.com/economist-components/${ packageName.name }`,
          bugs: { url: bugsUrl },
          config: {
            ghooks: {
              'pre-commit': 'npm run lint',
            },
          },
          scripts: {
            'prebuild:css': 'mkdir -p $npm_package_directories_lib',
            'build:css': 'cp $npm_package_directories_src/*.css $npm_package_directories_lib',
            start: 'npm run watch',
            watch: 'npm-run-all --parallel watch:*',
            'prewatch:serve': 'while [ ! -f site/index.html ]; do sleep 1; done',
            'watch:serve': 'live-server site/ --wait 500',
            prepublish: 'npm run build',
            pretest: 'npm run lint && npm run doc',
            lint: 'npm-run-all --parallel lint:*',
            'lint:js': 'eslint --ignore-path .gitignore .',
            'build:js': 'babel $npm_package_directories_src -d $npm_package_directories_lib --source-maps inline',
            postpublish: 'npm run access',
            access: 'npm-run-all --parallel access:*',
            'access:public': 'npm access public $npm_package_name',
            'access:sudo': 'npm access grant read-write economist:read-write-all $npm_package_name',
            build: 'npm-run-all --parallel build:*',
            'semantic-release': 'semantic-release pre || exit 0; npm publish && semantic-release post',
            provision: 'provision-react-component',
          },
          devDependencies: {
            '@economist/provision-react-component': moduleJson.version,
            'eslint-plugin-filenames': packageVersions['eslint-plugin-filenames'],
            'eslint-plugin-react': packageVersions['eslint-plugin-react'],
            'live-server': packageVersions['live-server'],
          },
        }, packageJson));
      }),
    },
  };
}
export default provisionPackageJson;
if (require.main === module) {
  const directoryArgPosition = 2;
  runProvisionerSet(process.argv[directoryArgPosition] || process.cwd(), provisionPackageJson());
}
