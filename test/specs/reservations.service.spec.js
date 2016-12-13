(function() {
    'use strict';

    var expect = chai.expect;

    describe('reservations service', function() {
        var $httpBackend;
        var mockLoginService;
        var ReservationsService;

        beforeEach(module('hotelier'));

        beforeEach(inject(function(_$httpBackend_,_LoginService_,_ReservationsService_) {
            $httpBackend = _$httpBackend_;
            mockLoginService = _LoginService_;
            ReservationsService = _ReservationsService_;

            $httpBackend.whenGET('https://hotelier-api-iron.herokuapp.com/api/Reservations')
            .respond('Got Reservations');

            mockLoginService.loginYesNo = function() {
                return ('Got Token');
            };
        }));

        it('should get reservations from API', function() {
            var result = ReservationsService.getReservations();
            expect(result).to.be.an('object');
            expect(result.then).to.be.a('function');

            result
                .then(function(data) {
                    console.log(data);
                    expect(data).to.be.a('string');
                    expect(data).to.equal('Got Reservations');
                });

            $httpBackend.flush();
        });
    });
}());
