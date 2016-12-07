(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('login controller', function() {
        // var mockLoginService = {};
        var LoginController;

        beforeEach(module('hotelier'));

        // beforeEach(module(function($provide) {
        //     $provide.value('LoginService', mockLoginService);
        // }));

        beforeEach(inject(function($controller) {

            LoginController = $controller('LoginController');

        }));

        it('should contain scope variables', function() {
            expect(LoginController.user).to.be.an('Object');
            expect(Object.keys(LoginController.user).length).to.equal(0);
        });
    });
}());
