import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';
import parsePackageJsonName from 'parse-packagejson-name';
import upperFirst from 'lodash.upperfirst';
export function packageToCss(name) {
  return kebabCase(parsePackageJsonName(name).fullName.replace(/component-/, ''));
}
export function packageToCamel(packageName) {
  return camelCase(packageToCss(packageName));
}
export function packageToClass(name) {
  return upperFirst(packageToCamel(name));
}
export function packageToNpm(name) {
  const parsedPackageName = {
    ...parsePackageJsonName(name),
    scope: 'economist',
  };
  parsedPackageName.name = `component-${ kebabCase(parsedPackageName.fullName.replace(/^component-/, '')) }`;
  return parsedPackageName;
}
