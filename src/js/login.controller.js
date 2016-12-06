(function() {
    'use strict';

    angular.module('hotelier')
        .controller('LoginController', LoginController);

    LoginController.$inject = [ 'LoginService' ];

    /**
     * Conctructor function for hotelier staff login
     */
    function LoginController(LoginService) {
        var vm = this;
        this.user = {};
        this.loggedin = false;
        this.login = function login() {
            LoginService.staffLogin()
                .then(function success(data) {
                    console.log(data);
                    vm.login = data;
                    console.log(vm.login);
                });
        };

        LoginService.createNewStaffLogin();
    }


}());
