import get from 'lodash.get';
import packageVersions from '../package-versions';
import { sortRange as sortSemverRanges } from 'semver-addons';
export default function getBestVersion(packageJson, name, key = 'devDependencies') {
  return sortSemverRanges(
    packageVersions[name],
    get(packageJson, `${ key }.${ name }`, '0.0.0'),
  ).pop();
}
