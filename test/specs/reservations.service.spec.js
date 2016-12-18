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

            $httpBackend.whenGET('https://hotelier-api-iron.herokuapp.com/api/Reservations?filter=%7B%22order%22:%22number+ASC%22%7D')
            .respond([{
                id: 12345,
                guest: {id:12345, name: 'nick', email:'nick@nick.com' },
                room: { maxOccupancy: 3, id: 12345, rate: '$35' },
                checkinDate: '12-12-16',
                checkoutDate: '12-13-16'
            },
            {
                id: 54321,
                guest: {id:54321, name: 'emily', email:'emily@emily.com' },
                room: { maxOccupancy: 2, id: 54321, rate: '$75' },
                checkinDate: '12-14-16',
                checkoutDate: '12-15-16'
            }]);

            $httpBackend.whenGET('views/home.template.html')
            .respond('Got reservations view');

            mockLoginService.loginYesNo = function() {
                return ('Got Token');
            };


        }));

        it('should get reservations from API', function(dc) {
            var result = ReservationsService.getReservations();
            expect(result).to.be.an('object');
            expect(result.then).to.be.a('function');

            result
                .then(function(data) {
                    expect(data).to.be.an('array');
                    expect(data.length).to.equal(2);
                    dc();
                })
                .catch(function(err) {
                    console.log(err);
                    dc('failed');
                });

            $httpBackend.flush();
        });
    });
}());
