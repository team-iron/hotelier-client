(function() {
    'use strict';

    angular.module('hotelier')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    function LoginService(){
        return {
            login: login,
            createNewStaffLogin: createNewStaffLogin
        };

        function login(email, password) {
            $http({
                url : 'https://hotelier-api-iron.herokuapp.com/api/Staff/login',
                method: 'post',
                data: {
                    'email': email,
                    'password' : password
                },
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }

        function createNewStaffLogin() {
            $http({
                url : 'https://hotelier-api-iron.herokuapp.com/api/Staff',
                method: 'post',
                data: {
                    'email': 'nick@hotelier.com',
                    'password' : 'nick',
                    'fullName' : 'Nick G'
                },
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }
    }
}());
