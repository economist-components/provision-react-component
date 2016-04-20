import chai from 'chai';
chai.should();
import provisionMainFiles from '../src/provision-mainfiles';
describe('provisionMainFiles', () => {

  it('returns an object with mainfiles keys', () => {
    provisionMainFiles()
      .should.be.an('object')
      .with.keys([ 'LICENSE', 'package.json', 'src/index.css', 'src/example.css', 'src/index.js', 'src/example.js' ]);
  });

  describe('package.json contents function', () => {
    let subFunction = null;
    beforeEach(() => {
      subFunction = provisionMainFiles()['package.json'].contents;
    });

    it('adds main directive to json', () => {
      JSON.parse(subFunction('{}')).should.have.property('main', 'lib/index.js');
    });

    it('adds style directive to json', () => {
      JSON.parse(subFunction('{}')).should.have.property('style', 'lib/index.css');
    });

    it('adds example directive to json', () => {
      JSON.parse(subFunction('{}')).should.have.property('example', 'lib/example.js');
    });

    it('adds examplestyle directive to json', () => {
      JSON.parse(subFunction('{}')).should.have.property('examplestyle', 'lib/example.css');
    });

    it('adds files directive to json', () => {
      JSON.parse(subFunction('{}')).should.have.property('files').eql([ 'lib/*', 'assets/*' ]);
    });

    it('appends to existing files directive', () => {
      JSON.parse(subFunction(JSON.stringify({
        files: [ 'foo', 'bar' ],
      }))).should.have.property('files').eql([ 'foo', 'bar', 'lib/*', 'assets/*' ]);
    });

  });

});
