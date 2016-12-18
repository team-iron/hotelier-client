(function() {

    'use strict';

    var expect = window.chai.expect;

    describe('login service', function () {
        var $httpBackend;
        var LoginService;
        //var $rootScope;

        beforeEach(module('hotelier'));

        beforeEach(inject(function(_$httpBackend_,_LoginService_) {

        $httpBackend = _$httpBackend_;
        LoginService = _LoginService_;
        //$rootScope = _$rootScope_;

        $httpBackend.whenPOST('https://hotelier-api-iron.herokuapp.com/api/Staffs/login')
        .respond( {email: 'nick', password: 'nick'} );

        $httpBackend.whenGET('views/home.template.html')
        .respond('Got login template');

        }));


        xit('should login a user', function(dc) {
            var result = LoginService.login('nick', 'nick');
            expect(result).to.be.an('object');
            expect(result.then).to.be.a('function');
            expect(result.catch).to.be.a('function');


            result
                .then(function(data) {
                    console.log('trying to extrapolate', data);
                    expect(data).to.be.an('object');
                    dc();
                })
                .catch(function(data) {
                    console.log(data);
                    dc('failed login test');
                });

            $httpBackend.flush();

        });
    });
}());
