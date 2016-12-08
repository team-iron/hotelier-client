(function() {
  'use strict';

  angular.module('hotelier')
      .controller('AllRoomsController', AllRoomsController);

  AllRoomsController.$inject = ['RoomService'];

  function AllRoomsController (RoomService) {
    var vm = this;
    this.rooms = [];


      RoomService.retrieveRooms()
        .then(function handleSuccess(data) {
          console.log(data);
          vm.rooms = data;
        })
        .catch(function error(xhr) {
          console.log(xhr);
        });

  }

}());
