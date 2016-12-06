(function() {
    'use strict';

    angular.module('hotelier')
        .controller('LoginController', LoginController);

    LoginController.$inject = [ 'LoginService' ];

    /**
     * Conctructor function for hotelier staff login
     */
    function LoginController(LoginService) {
        this.user = {};
        this.loggedin = false;
        this.login;
    }


}());
