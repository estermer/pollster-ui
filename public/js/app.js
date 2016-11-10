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
    var rootUrl = 'http://localhost:3000';
    var self = this;

    self.pollCreated = false;

    var getAllPolls = function(){
      $http.get(`${rootUrl}/polls`)
        .then(function(response){
          console.log(response.data.status);
          self.polls = response.data.polls;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    self.createPoll = function(poll){
      $http.post('/polls', poll)
        .then(function(response){
          //make pollCreated true to then
          //show the create answers directive element
          self.pollCreated = true;
          self.newPoll = response.data.poll;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    self.createAnswers = function(answers){
      //first change the answers to an array of answers
      answers = changeAnswersToArray(answers);

      //then send them to the api as the array
      $http.post(`${rootUrl}/polls/${self.newPoll.id}/answers`, {answers: answers})
        .then(function(response){
          getAllPolls();
          self.pollCreated = false;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    //this function turns the answers object into
    //and array of answers to send to the backend
    function changeAnswersToArray(answers){
      var array = [];

      if (answers == {} || answers == null){
        return "no answers to create";
      }

      for(var x in answers){
        if(answers.x != null || answers.x != ""){
          array.push(answers.x);
        }
      }
      return array;
    };

    //get all polls created upon window load
    getAllPolls();

  });

})();
