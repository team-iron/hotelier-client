(function() {
  'use strict';

  angular.module('hotelier')
      .controller('AllRoomsController', AllRoomsController);

  AllRoomsController.$inject = ['RoomService'];

  /**
   * [AllRoomsController description]
   * @param {[type]} RoomService [description]
   */
  function AllRoomsController (RoomService) {
    var vm = this;
    this.rooms = [];


      RoomService.retrieveRooms()
        .then(function handleSuccess(data) {
          console.log('room data retrieved in ctrl', data);
          vm.rooms = data;
        })
        .catch(function error(xhr) {
          console.warn(xhr);
        });

      // this.changeOrder = function changeOrder(sortOrder) {
      //     this.orderBy = sortOrder;
      // };
  }

}());
