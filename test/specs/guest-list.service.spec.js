(function() {
  'use strict';

var expect = chai.expect;
var LoginService;

describe('login service', function(){

  beforeEach(module('hotelier'));

  beforeEach(inject(function(_LoginService_) {
    LoginService = _LoginService_;
  }));

  it('should expect 1 plus 1 to equal 1', function(){
    expect(1).to.equal(1);
  });
});

}());
