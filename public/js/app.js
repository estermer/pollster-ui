(function(){
  var app = angular.module('pollster', []);

  app.directive('createPoll', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/create-poll.html'
    };
  });

  app.controller('MainCtrl', function(){



  });

})();
