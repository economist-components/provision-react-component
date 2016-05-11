import chai from 'chai';
chai.should();
import packageVersions from '../package-versions';
import provisionDocgen from '../src/provision-docgen';
describe('provisionDocgen', () => {

  it('returns an object with `package.json`.`contents` function', () => {
    provisionDocgen()
      .should.be.an('object')
      .with.keys([ '.gitignore', 'package.json' ])
      .with.property('package.json')
        .with.keys([ 'contents', 'after' ])
        .with.property('contents')
          .that.is.a('function');
  });

  describe('package.json contents function', () => {
    let subFunction = null;
    beforeEach(() => {
      subFunction = provisionDocgen()['package.json'].contents;
    });

    it('adds docgen directives to json', () => {
      const output = JSON.parse(subFunction('{}'));
      output.should.have.keys([ 'config', 'directories', 'devDependencies', 'scripts' ]);
      output.should.have.property('config').with.keys('doc');
      output.should.have.deep.property('config.doc.css.options');
      output.should.have.deep.property('config.doc.js.options');
      output.should.have.deep.property('config.doc.html.files');
      output.should.have.property('directories').deep.equal({ site: 'site' });
      output.should.have.property('devDependencies').deep.equal({
        'npm-run-all': packageVersions['npm-run-all'],
        'git-directory-deploy': packageVersions['git-directory-deploy'],
        'npm-assets': packageVersions['npm-assets'],
        'postcss-import': packageVersions['postcss-import'],
        'postcss-url': packageVersions['postcss-url'],
        'postcss-cssnext': packageVersions['postcss-cssnext'],
        'postcss-reporter': packageVersions['postcss-reporter'],
        'postcss-cli': packageVersions['postcss-cli'],
        '@economist/doc-pack': packageVersions['@economist/doc-pack'],
        'hbs-cli': packageVersions['hbs-cli'],
        'browserify': packageVersions.browserify,
        'watchify': packageVersions.watchify,
        'babelify': packageVersions.babelify,
      });
      output.should.have.property('scripts').that.has.keys([
        'prewatch:doc',
        'predoc',
        'doc',
        'doc:css',
        'doc:html',
        'doc:js',
        'watch:doc',
        'watch:doc:css',
        'watch:doc:html',
        'watch:doc:js',
        'prepages',
        'pages',
        'start',
        'watch',
        'doc:assets',
        'watch:doc:assets',
      ]);
    });

  });

});
