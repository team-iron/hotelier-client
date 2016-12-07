(function() {
  'use strict';

  angular.module('hotelier')
    .factory('GuestListService', GuestListService);

  GuestListService.$inject = ['$http'];

  function GuestListService($http) {

    return {
      postGuest: postGuest
    };


    /**
     * Ajax call to create a new guest
     * @param  {String} fullname Full name rewquired to fill out form
     * @param  {String} email    Email required to fill out the form
     * @param  {String} phone    Phone number which will be a string
     * @return {Promise}         Promise that the ajax call will return when complete
     */
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
