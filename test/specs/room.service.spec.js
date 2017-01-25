(function() {
  'use strict';

  var expect = chai.expect

  describe('room service', function() {
    var RoomService;
    var $httpBackend;
    var $rootScope;

    beforeEach(module('hotelier'));

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _RoomService_) {
      RoomService = _RoomService_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;


      $httpBackend
          .whenGET('https://hotelier-api-iron.herokuapp.com/api/Rooms')
          .respond ({
              id: '5842d1f9cd7009110038fc40',
              number: 123,
              maxOccupancy: 2,
              rate: 150
          });
    }));

    it('should be able to retrieve rooms', function(doneCallback) {
        var result = RoomService.retrieveRooms();
        expect(result).to.be.an('object');
        expect(result.then).to.be.a('function');
        expect(result.catch).to.be.a('function');

        result
            .then(function(data) {
                expect(data.number).to.equal(123);
                doneCallback();
            })
            .catch(function() {
                doneCallback('Should not reject this promise');
            });
        $httpBackend.flush();
    });
  })
}());
