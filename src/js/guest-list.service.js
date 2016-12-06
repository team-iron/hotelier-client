(function() {
  'use strict';

  angular.module('hotelier')
    .factory('GuestListService', GuestListService);

  GuestListService.$inject = ['$http'];

  function GuestListService($http) {

    return {
      postGuest: postGuest
    };

    function postGuest(fullname, email, phone) {
      console.log('here');
      return $http({
        url: 'https://hotelier-api-iron.herokuapp.com/api/Guests',
        data: {
          fullname: fullname,
          email: email,
          phone: phone
        },
        method: 'post'
      })
      .then(function ReturnData(response) {
        console.log('passed');

      });


    };

  };


}());
