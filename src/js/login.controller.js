(function() {
    'use strict';

    angular.module('hotelier')
        .controller('LoginController', LoginController);

    LoginController.$inject = [ 'LoginService' ];

    /**
     * Conctructor function for hotelier staff login
     * @return {void}
     */
    function LoginController(LoginService) {

        this.user = {};

        /**
         * login function used to collect form values and pass them to login service
         * @param  {Object} user contains user values (email, username)
         * @return {Object} sets this.login to resolved http data containing system user data
         */
        this.login = function login(user) {
            console.log(user);
            var email = user.email;
            var password = user.password;
            LoginService.login(email, password)
                .then(function success(data) {
                    console.log(data);
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });
        };

        /**
         * creates new staff user in hotelier management system
         * @param  {String} email email of staff user used for login
         * @param  {String} password password of staff user used for login
         * @param  {String} fullName name of new staff member
         * @return {void}
         */
        this.createNewStaffLogin = function createNewStaffLogin(email, password, fullName) {
            LoginService.createNewStaffLogin(email, password, fullName)
            .then(function success(data) {
                console.log(data);
            })
            .catch(function error(xhr) {
                console.log(xhr);
            });
        };
    }


}());
