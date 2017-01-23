(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('login controller', function() {
        var mockLoginService = {};
        var LoginController;

        beforeEach(module('hotelier'));

        beforeEach(module(function($provide) {
            $provide.value('LoginService', mockLoginService);
        }));

        beforeEach(inject(function($controller) {

            mockLoginService.login = function() {
                return 'myToken';
            };
            LoginController = $controller('LoginController');
        }));

        it('should contain scope variables', function() {
            expect(LoginController.user).to.be.an('Object');
            expect(Object.keys(LoginController.user).length).to.equal(0);
            expect(LoginController.errorMessage).to.be.an('Object');
        });

        it('should return a user token', function() {
            var result = mockLoginService.login();
            expect(result).to.equal('myToken');
        });
    });
}());
