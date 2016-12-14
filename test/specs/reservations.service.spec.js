(function() {
    'use strict';

    var expect = chai.expect;

    describe('reservations service', function() {
        var $httpBackend;
        var mockLoginService = {};
        var ReservationsService;

        beforeEach(module('hotelier'));

        beforeEach(module(function($provide) {
            $provide.value('LoginService', mockLoginService);
        }));

        beforeEach(inject(function(_$httpBackend_,_ReservationsService_) {
            $httpBackend = _$httpBackend_;
            ReservationsService = _ReservationsService_;

            $httpBackend.whenGET('https://hotelier-api-iron.herokuapp.com/api/Reservations')
            .respond('Got Reservations');


            // $httpBackend.whenGet('views/reservations.template.html')
            // .respond('Got reservations view');

            $httpBackend.whenGet('views/home.template.html')
            .respond('Got reservations view');

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
