import chai from 'chai';
chai.should();
import provisionTestFiles from '../src/provision-react-testsuite';
describe('provisionTestFiles', () => {

  it('returns an object with mainfiles keys', () => {
    provisionTestFiles()
      .should.be.an('object')
      .with.keys([ 'karma.conf.js', 'package.json', 'test/.eslintrc', 'test/index.js' ]);
  });

  describe('package.json contents function', () => {
    let subFunction = null;
    beforeEach(() => {
      subFunction = provisionTestFiles()['package.json'].contents;
    });

    it('adds directories.test to json', () => {
      JSON.parse(subFunction('{}')).should.have.deep.property('directories.test', 'test');
    });

    it('adds react dep to json', () => {
      JSON.parse(subFunction('{}')).should.have.property('dependencies').that.has.keys('react');
    });

    it('adds necessary dependencies to devDeps', () => {
      JSON.parse(subFunction('{}')).should.have.property('devDependencies').that.includes.keys([
        'react-addons-test-utils',
        'react-dom',
        'mocha',
        'chai',
        'chai-spies',
        'karma',
        'karma-mocha',
        'karma-mocha-reporter',
        'karma-phantomjs-launcher',
        'karma-browserify',
        'karma-coverage',
        'browserify-istanbul',
        'istanbul',
        'chai-enzyme',
        'enzyme',
        'isparta',
        'phantomjs-prebuilt',
        'karma-sauce-launcher',
        'babel-polyfill',
        'coveralls',
        'lcov-result-merger',
      ]);
    });

  });

});
