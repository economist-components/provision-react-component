import chai from 'chai';
chai.should();
import provisionLegacyRemoval from '../src/provision-legacy-removal';
describe('provisionLegacyRemoval', () => {

  it('returns an object with `package.json`.`contents` function', () => {
    provisionLegacyRemoval()
      .should.be.an('object')
      .with.keys([ 'build.sh', '.gitignore', 'package.json' ])
      .with.property('package.json')
        .with.keys([ 'contents', 'after' ])
        .with.property('contents')
          .that.is.a('function');
  });

  describe('package.json contents function', () => {
    let subFunction = null;
    beforeEach(() => {
      subFunction = provisionLegacyRemoval()['package.json'].contents;
    });

    it('removes component-devserver key', () => {
      JSON.parse(subFunction(JSON.stringify({
        'component-devserver': {},
      }))).should.not.have.property('component-devserver');
    });

    it('removes devpack-doc key', () => {
      JSON.parse(subFunction(JSON.stringify({
        'devpack-doc': {},
      }))).should.not.have.property('devpack-doc');
    });

    it('removes pre-commit key', () => {
      JSON.parse(subFunction(JSON.stringify({
        'pre-commit': {},
      }))).should.not.have.property('pre-commit');
    });

    it('removes watch key', () => {
      JSON.parse(subFunction(JSON.stringify({
        'watch': {},
      }))).should.not.have.property('watch');
    });

    it('removes babel key', () => {
      JSON.parse(subFunction(JSON.stringify({
        'babel': {},
      }))).should.not.have.property('babel');
    });

    it('removes preinstall script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'preinstall': '',
        },
      }))).should.not.have.deep.property('scripts.preinstall');
    });

    it('removes postinstall script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'postinstall': '',
        },
      }))).should.not.have.deep.property('scripts.postinstall');
    });

    it('removes serve script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'serve': '',
        },
      }))).should.not.have.deep.property('scripts.serve');
    });

    it('removes prepublish:watch script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'prepublish:watch': '',
        },
      }))).should.not.have.deep.property('scripts.prepublish:watch');
    });

    it('removes test:base script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'test:base': '',
        },
      }))).should.not.have.deep.property('scripts.test:base');
    });

    it('removes doc:watch script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'doc:watch': '',
        },
      }))).should.not.have.deep.property('scripts.doc:watch');
    });

    it('removes doc:js:watch script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'doc:js:watch': '',
        },
      }))).should.not.have.deep.property('scripts.doc:js:watch');
    });

    it('removes doc:css:watch script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'doc:css:watch': '',
        },
      }))).should.not.have.deep.property('scripts.doc:css:watch');
    });

    it('removes doc:html:watch script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'doc:html:watch': '',
        },
      }))).should.not.have.deep.property('scripts.doc:html:watch');
    });

    it('removes ci script', () => {
      JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'ci': '',
        },
      }))).should.not.have.deep.property('scripts.ci');
    });


    it('removes @economist/component-devpack devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          '@economist/component-devpack': '',
        },
      }))).should.not.have.deep.property('devDependencies.@economist/component-devpack');
    });

    it('removes @economist/component-devserver devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          '@economist/component-devserver': '',
        },
      }))).should.not.have.deep.property('devDependencies.@economist/component-devserver');
    });

    it('removes @economist/component-testharness devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          '@economist/component-testharness': '',
        },
      }))).should.not.have.deep.property('devDependencies.@economist/component-testharness');
    });

    it('removes parallelshell devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'parallelshell': '',
        },
      }))).should.not.have.deep.property('devDependencies.parallelshell');
    });

    it('removes eslint-plugin-one-variable-per-var devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'eslint-plugin-one-variable-per-var': '',
        },
      }))).should.not.have.deep.property('devDependencies.eslint-plugin-one-variable-per-var');
    });

    it('removes minifyify devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'minifyify': '',
        },
      }))).should.not.have.deep.property('devDependencies.minifyify');
    });

    it('removes postcss devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'postcss': '',
        },
      }))).should.not.have.deep.property('devDependencies.postcss');
    });

    it('removes react devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'react': '',
        },
      }))).should.not.have.deep.property('devDependencies.react');
    });

    it('removes chai-things devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'chai-things': '',
        },
      }))).should.not.have.deep.property('devDependencies.chai-things');
    });

    it('removes cssnext devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'cssnext': '',
        },
      }))).should.not.have.deep.property('devDependencies.cssnext');
    });

    it('removes babel-runtime devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'babel-runtime': '',
        },
      }))).should.not.have.deep.property('devDependencies.babel-runtime');
    });

    it('removes babel-loader devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'babel-loader': '',
        },
      }))).should.not.have.deep.property('devDependencies.babel-loader');
    });

    it('removes browser-sync devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'browser-sync': '',
        },
      }))).should.not.have.deep.property('devDependencies.browser-sync');
    });

    it('removes karma-chai devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'karma-chai': '',
        },
      }))).should.not.have.deep.property('devDependencies.karma-chai');
    });

    it('removes karma-chrome-launcher devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'karma-chrome-launcher': '',
        },
      }))).should.not.have.deep.property('devDependencies.karma-chrome-launcher');
    });

    it('removes pre-commit devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'pre-commit': '',
        },
      }))).should.not.have.deep.property('devDependencies.pre-commit');
    });

    it('removes react-addons-test-utils devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'react-addons-test-utils': '',
        },
      }))).should.not.have.deep.property('devDependencies.react-addons-test-utils');
    });

    it('removes react-dom devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'react-dom': '',
        },
      }))).should.not.have.deep.property('devDependencies.react-dom');
    });

    it('removes npm-watch devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'npm-watch': '',
        },
      }))).should.not.have.deep.property('devDependencies.npm-watch');
    });

    it('removes react devDep', () => {
      JSON.parse(subFunction(JSON.stringify({
        devDependencies: {
          'react': '',
        },
      }))).should.not.have.deep.property('devDependencies.react');
    });

    it('removes babel-runtime dep', () => {
      JSON.parse(subFunction(JSON.stringify({
        dependencies: {
          'babel-runtime': '',
        },
      }))).should.not.have.deep.property('dependencies.babel-runtime');
    });

    it('removes lint_opts config', () => {
      JSON.parse(subFunction(JSON.stringify({
        config: {
          'lint_opts': '',
        },
      }))).should.not.have.deep.property('config.lint_opts');
    });

    it('removes testbundle_opts config', () => {
      JSON.parse(subFunction(JSON.stringify({
        config: {
          'testbundle_opts': '',
        },
      }))).should.not.have.deep.property('config.testbundle_opts');
    });

    it('removes ghpages_files config', () => {
      JSON.parse(subFunction(JSON.stringify({
        config: {
          'ghpages_files': '',
        },
      }))).should.not.have.deep.property('config.ghpages_files');
    });

    it('makes build:LEGACY-RENAME-THIS if build is not standard build script', () => {
      const output = JSON.parse(subFunction(JSON.stringify({
        scripts: {
          'build': 'nonstandard',
        },
      })));
      output.should.not.have.deep.property('scripts.build');
      output.should.have.deep.property('scripts.build:LEGACY-RENAME-THIS', 'nonstandard');
    });

    it('ensures files array does not include *.js', () => {
      JSON.parse(subFunction(JSON.stringify({
        files: [ 'foo', 'bar', '*.js' ],
      }))).should.have.property('files').not.contain('*.js');
    });

    it('ensures files array does not include *.es6', () => {
      JSON.parse(subFunction(JSON.stringify({
        files: [ 'foo', 'bar', '*.es6' ],
      }))).should.have.property('files').not.contain('*.es6');
    });

    it('ensures files array does not include *.css', () => {
      JSON.parse(subFunction(JSON.stringify({
        files: [ 'foo', 'bar', '*.css' ],
      }))).should.have.property('files').not.contain('*.css');
    });

    it('ensures files array does not include !karma.conf.js', () => {
      JSON.parse(subFunction(JSON.stringify({
        files: [ 'foo', 'bar', '!karma.conf.js' ],
      }))).should.have.property('files').not.contain('!karma.conf.js');
    });

    it('ensures files array does not include !testbundle.js', () => {
      JSON.parse(subFunction(JSON.stringify({
        files: [ 'foo', 'bar', '!testbundle.js' ],
      }))).should.have.property('files').not.contain('!testbundle.js');
    });

  });

});
