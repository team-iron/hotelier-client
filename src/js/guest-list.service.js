(function() {
  'use strict';

  angular.module('hotelier')
    .factory('GuestListService', GuestListService);

  GuestListService.$inject = ['$http'];

  function GuestListService() {

    return {
      postGuest: postGuest
    };

    function postGuest() {
      return $http({
        url: 'https://hotelier-api-iron.herokuapp.com/api/Guests',
        data: {
          fullname:
          email:
          phone:
        }
        method: 'POST'
      });
    }




  };


}());
