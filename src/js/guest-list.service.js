(function() {
  'use strict';

  angular.module('hotelier')
    .factory('GuestListService', GuestListService);

  GuestListService.$inject = ['$http', 'LoginService'];

  /**
   * Service for Guest List Constructor Fn
   * @param {Service}  Ajax call injection
   * @return {Object} of functions within the main Constructor
   */
  function GuestListService($http, LoginService) {

    var token = LoginService.loginYesNo;

    return {
      postGuest: postGuest,
      allGuests: allGuests
    };


    /**
     * Ajax call to create a new guest
     * @param  {String} fullName Full name rewquired to fill out form
     * @param  {String} email    Email required to fill out the form
     * @param  {String} phone    Phone number which will be a string
     * @param  {string} id        Id given to a staff member once logged in in order to create a guest
     * @return {Promise}         Promise that the ajax call will return when complete
     */
    function postGuest(fullName, email, phone) {

      return $http({
        url: 'https://hotelier-api-iron.herokuapp.com/api/Guests',
        data: {
          fullName: fullName,
          email: email,
          phone: phone
        },
        method: 'post',
        headers: {
          'Authorization': token()
        }
      })
      .then(function ReturnData(response) {
        console.log('passed', response);
      });
    }
    /**
     * Ajax call to returns a list of all guests.
     * @param  {String} id ID required by logged-in staff to view list of all guests.
     * @return {Promise}   Promise that the ajax call will return when complete.
     */
    function allGuests(){
      console.log('I am here');
      return $http({
        url: 'https://hotelier-api-iron.herokuapp.com/api/Guests',
        method: 'get',
        headers: {
          'Authorization': token
        }
      })
      .then(function returnGuests(response){
        console.log('guests', response);
        return response;

      });
    }

  }


}());
