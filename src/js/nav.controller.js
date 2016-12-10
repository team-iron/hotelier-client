(function() {
  'use strict';

  angular.module('hotelier')
    .controller('NavController', NavController);

    NavController.$inject = ['$state', 'LoginService'];

    function NavController($state, LoginService) {

      this.isLoggedIn = LoginService.isLoggedIn;

      this.logout = function logout() {
        LoginService.logout();
        $state.go('home');
      };

    }

}());
