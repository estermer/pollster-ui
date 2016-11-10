(function(){
  var app = angular.module('pollster', []);

  app.directive('createPoll', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/create-poll.html'
    };
  });

  app.directive('createAnswer', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/create-poll.html'
    };
  });

  app.controller('MainCtrl', function($http){
    var rootUrl = 'http://localhost:3000/';
    var self = this;

    self.pollCreated = false;

    $http.get(`${rootUrl}/polls`)
      .then(function(response){
        console.log(response.data.status);
        self.polls = response.data.polls;
      })
      .catch(function(err){
        console.log(err);
      });



    self.createPoll = function(poll){
      $http.post('/polls')
    }


  });

})();
