(function() {
  'use strict';

  angular.module('hotelier')
      .factory('RoomService', RoomService);

  RoomService.$inject = ['$http'];


  /**
   * RoomService Constructor Function
   * @param {$http} $http ajax call
   */
  function RoomService($http) {
    console.log($http);
      return {
        retrieveAllRooms: retrieveAllRooms
      };

      /**
       * Retrieves all the rooms available for guests to reserve
       * @return {Promise}  promise from $http request
       */
      function retrieveAllRooms() {
        return $http ({
          url: 'https://hotelier-api-iron.herokuapp.com/api/Rooms',
          method: 'GET'
        });
      }
  }

}());
