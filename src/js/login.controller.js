(function() {
    'use strict';

    angular.module('hotelier')
        .controller('LoginController', LoginController);

        /**
         * Conctructor function for hotelier staff login
         */
        function LoginController() {
            this.user = {};
            this.loggedin = false;
            this.login = function login() {

            };
        }


}());
