(function() {
  'use strict';

  angular.module('hotelier')
    .controller('NavController', NavController);

    NavController.$inject = ['$state', 'LoginService'];


    /**
     * Nav constructor function that manages which nav links are viewable based on
     * staff login status
     * @param {} $state       [description]
     * @param {Service} LoginService Injected service from LoginService
     */
    function NavController($state, LoginService) {

      this.isLoggedIn = LoginService.isLoggedIn;

      this.logout = function logout() {
        LoginService.logout();
        $state.go('home');
      };

    }

}());
