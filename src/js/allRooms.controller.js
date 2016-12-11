(function() {
  'use strict';

  angular.module('hotelier')
      .controller('AllRoomsController', AllRoomsController);

  AllRoomsController.$inject = [ '$state','ReservationsService', 'RoomService' ];

  /**
   * [AllRoomsController description]
   * @param {[type]} RoomService [description]
   */
  function AllRoomsController ($state, ReservationsService, RoomService) {
    var vm = this;
    this.rooms = [];

    this.reservationID = {};
    this.errorMessage = null;

      RoomService.retrieveRooms()
        .then(function handleSuccess(data) {
          console.log('room data retrieved in ctrl', data);
          vm.rooms = data;
        })
        .catch(function error(xhr) {
          console.log(xhr);
        });

        this.getReservation = function getReservation(id) {
            $state.go('reservation', { guestId: id });
        };

  }

}());
