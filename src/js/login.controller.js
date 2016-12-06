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
        this.loggedinUser = null;
        this.user = {};
        this.loggedin = false;
        this.login = function login(user) {
            console.log(user);
            var email = user.email;
            var password = user.password;
            LoginService.login(email, password)
                .then(function success(data) {
                    console.log(data);
                    vm.loggedinUser = data;
                    console.log(vm.loggedinUser);
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });
        };

        this.createNewStaffLogin = function createNewStaffLogin() {
            LoginService.createNewStaffLogin()
            .then(function success(data) {
                console.log(data);
            })
            .catch(function error(xhr) {
                console.log(xhr);
            });
        };
    }


}());
