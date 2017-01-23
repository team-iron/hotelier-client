(function() {
    'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(viewConfig);

  viewConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  /**
   * Sets states for single page application views when routing
   * @param  {Service} $stateProvider built in angular-ui-router service
   * @return {void}
   */
  function viewConfig($stateProvider, $urlRouterProvider){

     $urlRouterProvider.when('', '/');

    $stateProvider
    .state({
      name: 'home',
      url: '/',
      templateUrl:'views/home.template.html'
    })
    .state({
      name: 'staff-login',
      url: '/staff-login',
      templateUrl: 'views/staff-login.template.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .state({
      name: 'add-guest',
      url: '/add-guest',
      templateUrl: 'views/guest-form.template.html',
      controller: 'GuestListController',
      controllerAs: 'guestlist'
    })
    .state({
      name: 'reservations',
      url: '/reservations',
      templateUrl: 'views/reservations.template.html',
      controller: 'ReservationsController',
      controllerAs: 'reservations'
    })
    .state({
        name: 'delete',
        url: 'reservation-remove/:reservationId',
        templateUrl: 'views/deletion.template.html',
        controller: 'DeleteReservationController',
        controllerAs: 'deletion'
    })
    .state({
      name: 'available-rooms',
      url: '/available-rooms',
      templateUrl: 'views/allRooms.template.html',
      controller: 'AllRoomsController',
      controllerAs: 'allRooms'
    })
    .state({
        name: 'reservation',
        url: 'reservation/:guestId',
        templateUrl: 'views/reservation.template.html',
        controller: 'GuestReservationController',
        controllerAs: 'reservation'
    })
    .state({
      name: 'all-guests',
      url: '/guests',
      templateUrl: 'views/all-guests.template.html',
      controller: 'GuestListController',
      controllerAs: 'guestlist'
    })
    .state({
       name: 'create-reservation',
       url: '/create-reservation',
       templateUrl: 'views/create-reservation.template.html',
       controller: 'CreateReservationController',
       controllerAs: 'createReservation'
    });
}

}());

(function() {
  'use strict';

  angular.module('hotelier')
      .controller('AllRoomsController', AllRoomsController);

  AllRoomsController.$inject = [ '$state','ReservationsService', 'RoomService' ];

  /**
   * [AllRoomsController description]
   * @param {[type]} RoomService [description]
   */
  function AllRoomsController ($state, ReservationsService, RoomService) {
    var vm = this;
    this.rooms = [];

    this.reservationID = {};
    this.errorMessage = null;

      RoomService.retrieveRooms()
        .then(function handleSuccess(data) {
          vm.rooms = data;
        })
        .catch(function error(xhr) {
          console.log(xhr);
        });

        this.getReservation = function getReservation(id) {
            $state.go('reservation', { guestId: id });
        };

  }

}());

(function() {
    'use strict';

    angular.module('hotelier')
        .controller('CreateReservationController', CreateReservationController);

    CreateReservationController.$inject = [ '$state', 'CreateReservationService' ];

    /**
     * Create Reservation Constructor Function
     * @param {Service} CreateReservationService Service injected from the CreateReservationService
     * @return {void}
     */
    function CreateReservationController($state, CreateReservationService) {
        var vm = this;
        this.reservationDetails = {};
        this.errorMessage = {};

        this.addReservation = function addReservation() {
            CreateReservationService.createReservation(
              this.reservationDetails.checkinDate,
              this.reservationDetails.checkoutDate,
              this.reservationDetails.numberOfGuests,
              this.reservationDetails.guestId,
              this.reservationDetails.roomId)
              .then(function succes(data) {
                  var urlPath = data.id;
                  $state.go('reservation', {guestId: urlPath});
              })
              .catch(function error(xhr) {
                  console.log(xhr);
                  if (xhr.data.error.status > 400 && xhr.data.error.status < 501) {
                      vm.errorMessage.statusResponse = 'Reservation information incorrect.  Roooms cannot be reserved when double booked, over max capacity, and or without guests.';
                  } else {
                      vm.errorMessage.statusResponse = 'Try again soon. Our system is down.';
                  }
              });
        };
    }
}());

(function() {
    'use strict';

    angular.module('hotelier')
        .factory('CreateReservationService', CreateReservationService);

    CreateReservationService.$inject = ['$http', 'LoginService'];

    /**
     * Services' Constructor Function
     * @param {DependencyInjection} $http Injected as a dependency into the service to
     * have successful ajax calls.
     * @return {Promise} Returns an Ajax promise when completed.
     */
    function CreateReservationService($http, LoginService) {

        var token = LoginService.loginYesNo;

        return {
            createReservation: createReservation
        };

        /**
         * $http request that creates a new reservation when given the proper parameters
         * @param  {String} checkinDate    Date given when guest Checks in
         * @param  {String} checkoutDate   Date given when guest will checkout
         * @param  {String} numberOfGuests Number of guests signed up for the reservation
         * @param  {String} guestId        The guest who is reserving a rooms' id.
         * @param  {String} roomId         The Id of the room being reserved
         * @return {Promise}
         */
        function createReservation(checkinDate, checkoutDate, numberOfGuests, guestId, roomId) {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                data: {
                    checkinDate: checkinDate,
                    checkoutDate: checkoutDate,
                    numberOfGuests: numberOfGuests,
                    guestId: guestId,
                    roomId: roomId
                },
                method: 'post',
                headers: {
                    'Authorization': token()
                }
                })
                .then(function returnResponse(response) {
                    return response.data;
                });

        }
    }
}());

(function() {
    'use strict';

    angular.module('hotelier')
        .controller('DeleteReservationController', DeleteReservationController);

    DeleteReservationController.$inject = [ '$stateParams', 'ReservationsService' ];

    function DeleteReservationController($stateParams, ReservationsService) {

        var vm = this;
        this.errorMessage = null;

            ReservationsService.deleteReservations($stateParams.reservationId)
                .then(function success() {
                })
                .catch(function error(xhr) {
                    vm.errorMessage = xhr.data.error.message;
                });
    }
}());

(function() {
  'use strict';
  angular.module('hotelier')
    .controller('GuestListController', GuestListController);

  GuestListController.$inject = [ '$state', 'GuestListService' ];

  /**
   * Guest List constructor function calling the functions from the service into its
   * local scope to pass onto the html.
   * @param {Service} GuestListService Controllers injected service
   */
  function GuestListController($state, GuestListService) {
     var vm = this;
     this.inputValues = {};
     this.errorMessage = {};
     this.guests = [];

     this.createGuest = function createGuest() {

       GuestListService.postGuest(this.inputValues.fullName, this.inputValues.email, this.inputValues.phone)
        .then(function success() {
            $state.go('create-reservation');
        })
        .catch(function error(xhr) {
            console.log(xhr);
            if (xhr.data.error.status > 400 && xhr.data.error.status < 500) {
                vm.errorMessage.statusResponse = xhr.data.error.message;
            } else {
                vm.errorMessage.statusResponse = 'Try again soon. Our system is down.';
            }
        });
     };
       /**
        * This function does a GET request to the $http request
        * from the injected service(GuestListService)
        * @param  {String} id The Id given to the user.
        * @return {Promise}    returns $http promise
        */
       this.allGuests =
         GuestListService.allGuests()
         .then(function successHandler(data){
           console.log(data);
           vm.guests = data;
         });
  }


}());

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
        return response.data;
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
          'Authorization': token()
        }
      })
      .then(function returnGuests(response){
        return response.data;

      });
    }

  }


}());

(function() {
    'use strict';

    angular.module('hotelier')
        .controller('GuestReservationController', GuestReservationController);

    GuestReservationController.$inject = [ '$stateParams', 'ReservationsService' ];

    function GuestReservationController($stateParams, ReservationsService) {

        var vm = this;
        this.guestReservation = {};
        this.errorMessage = null;

            ReservationsService.getReservation($stateParams.guestId)
                .then(function success(reservation) {
                    vm.guestReservation = reservation;
                })
                .catch(function error(xhr) {
                    vm.errorMessage = xhr.data.error.message;
                });
    }
}());

(function() {
    'use strict';

    angular.module('hotelier')
        .controller('LoginController', LoginController);

    LoginController.$inject = [ '$state', 'LoginService' ];

    /**
     * Conctructor function for hotelier staff login
     * @return {void}
     */
    function LoginController($state, LoginService) {

        var vm = this;
        this.user = {};
        this.userToken = null;
        this.errorMessage = {};

        /**
         * login function used to collect form values and pass them to login service
         * @param  {Object} user contains user values (email, username)
         * @return {Object} sets this.login to resolved http data containing system user data
         */
        this.login = function login(user) {
            var email = user.email;
            var password = user.password;
            LoginService.login(email, password)
                .then(function success(token) {
                    vm.userToken = token;
                    $state.go('reservations');
                })
                .catch(function error(xhr) {
                    vm.errorMessage.message = xhr.data.error.message;
                    if (xhr.data.error.status > 400 && xhr.data.error.status < 500) {
                        vm.errorMessage.statusResponse = 'User and or password incorrect: ';
                    } else {
                        vm.errorMessage.statusResponse = 'Try again soon. Our system is down: ';
                    }
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
                vm.errorMessage = xhr.data;
            });
        };
    }


}());

(function() {
    'use strict';

    angular.module('hotelier')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    /**
     * LoginService Constructor Function
     * @param {Angular} $http built-in angular http request service
     * @return {Object} functions used by LoginController
     */
    function LoginService($http){
        var token = localStorage.getItem('userToken') || null;

        return {
            login: login,
            loginYesNo: loginYesNo,
            createNewStaffLogin: createNewStaffLogin,
            logout: logout,
            isLoggedIn: isLoggedIn
        };

        /**
         * Provides token if user is logged in, otherwise returns null
         * @return {String} session token for loggedin User
         */
        function loginYesNo() {
            return token;
        }


        /**
         * Logs in staff in hotelier management system
         * @param {String} email email of staff user used for login
         * @param {String} password password of staff user used for login
         * @return {Promise} asynch promsises from http request
         */
        function login(email, password) {
            return $http({
                url : 'https://hotelier-api-iron.herokuapp.com/api/Staffs/login',
                method: 'post',
                data: {
                    'email': email,
                    'password' : password
                },
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(function success(response) {
                token = response.data.id;
                localStorage.setItem('userToken', token);
                return token;

            });
        }

        /**
         * Logs staff out and removes userToken from local storage
         */
        function logout() {
          token = null;
          localStorage.removeItem('userToken');
        }

        /**
         * Function that determines login status of staff
         * @return {Boolean} Returns true or false for staff login status
         */
        function isLoggedIn(){
          return !!token;
        }

        /**
         * creates new staff member access to hotelier management system
         * @param  {String} email designated email of staff user
         * @param  {String} password designated password used by staff user
         * @param  {String} fullName Name of Staff Member
         * @return {Promise} asynch promsises from http request
         */
        function createNewStaffLogin(email, password, fullName) {
            return $http({
                url : 'https://hotelier-api-iron.herokuapp.com/api/Staffs',
                method: 'post',
                data: {
                    'email': email,
                    'password' : password,
                    'fullName' : fullName
                },
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }
    }
}());

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


(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ '$state', 'ReservationsService' ];

    /**
     * Constructor function for ReservationController managing reservation data
     * @param {Service} ReservationsService custom built angular service (see reservations.service.js)
     */
    function ReservationsController( $state, ReservationsService ) {

        var vm = this;

        this.reservations =
            ReservationsService.getReservations()
                .then(function success(reservations) {
                    vm.reservations = reservations;
                    return reservations;
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });

       vm.deleteCurrentReservation = function deleteCurrentReservation(reservationId) {
           $state.go('delete', {reservationId: reservationId});
       };
    }

}());

(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationsService', ReservationsService);

    ReservationsService.$inject = [ '$http', 'LoginService' ];

    function ReservationsService($http, LoginService) {

        var token = LoginService.loginYesNo;

        return {

            getReservations: getReservations,
            getReservation: getReservation,
            deleteReservations: deleteReservations

        };

        /**
         * Send http request for hotelier reservations data and transforms
         * data response to only include reservations array
         * @return {Promise} Callback promises able to transform and mitigate http response
         */
        function getReservations() {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                params: {
                    filter: {"order": "number ASC"}
                },
                headers: {
                    'Authorization': token()
                }
            })
            .then(function success(response) {
                return response.data;
            });
        }


        function getReservation(id) {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations/' + id,
                headers: {
                    'Authorization': token()
                }
            })
            .then(function success(response) {
                return response.data;
            });
        }

      function deleteReservations(reservationId) {
        console.log('in the service');
          return $http({
              url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations/' + reservationId,
              method: 'delete',
              headers: {
                  'Authorization': token()
              }
          });
        }

    }


}());

(function() {
  'use strict';

  angular.module('hotelier')
      .factory('RoomService', RoomService);

  RoomService.$inject = ['$http'];


  /**
   * RoomService Constructor Function
   * @param {Object} $http ajax call
   */
  function RoomService($http) {
      
      return {
        retrieveRooms: retrieveRooms
      };

      /**
       * Retrieves all the rooms available for guests to reserve
       * @return {Promise}  promise from $http request
       */
      function retrieveRooms() {
        return $http ({
          url: 'https://hotelier-api-iron.herokuapp.com/api/Rooms',
          method: 'GET',
          params: {
              filter: {"order": "number ASC"}
          }
        })
        .then(function transformRoomResponse(response) {
          return response.data;
        });
      }
  }

}());
