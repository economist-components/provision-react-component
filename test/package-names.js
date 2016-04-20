import chai from 'chai';
chai.should();
import { packageToCss, packageToCamel, packageToClass, packageToNpm } from '../src/package-names';
describe('packageNames', () => {

  describe('packageToCss', () => {

    it('returns kebabcased name', () => {
      packageToCss('FooBar').should.equal('foo-bar');
    });

    it('strips `component-` prefix', () => {
      packageToCss('component-FooBar').should.equal('foo-bar');
    });

    it('strips package.json scope', () => {
      packageToCss('@economist/component-FooBar').should.equal('foo-bar');
    });

    it('can be given object with `name` key', () => {
      packageToCss({ name: '@economist/component-FooBar' }).should.equal('foo-bar');
    });

  });

  describe('packageToCamel', () => {

    it('returns camelised name', () => {
      packageToCamel('foo-bar').should.equal('fooBar');
    });

    it('strips package.json scope', () => {
      packageToCamel('@economist/component-foo-bar').should.equal('fooBar');
    });

    it('can be given object with `name` key', () => {
      packageToCamel({ name: '@economist/component-foo-bar' }).should.equal('fooBar');
    });

  });

  describe('packageToClass', () => {

    it('returns upper camelised name', () => {
      packageToClass('foo-bar').should.equal('FooBar');
    });

    it('strips `component-` prefix', () => {
      packageToClass('component-foo-bar').should.equal('FooBar');
    });

    it('strips package.json scope', () => {
      packageToClass('@economist/component-foo-bar').should.equal('FooBar');
    });

    it('can be given object with `name` key', () => {
      packageToClass({ name: '@economist/component-foo-bar' }).should.equal('FooBar');
    });

  });

  describe('packageToNpm', () => {

    it('returns parsed package name with component prefix and kebabcased', () => {
      packageToNpm('fooBar').should.have.property('name', 'component-foo-bar');
    });

  });

});
