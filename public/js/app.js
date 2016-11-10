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
      console.log("CREATING A POLL <<<<<<<");
      $http.post(`${rootUrl}/polls`, poll)
        .then(function(response){
          //make pollCreated true to then
          //show the create answers directive element
          console.log(response.data);
          self.pollCreated = true;
          self.newPollId = response.data.poll.id;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    self.createAnswers = function(answers){
      console.log("OBJECT <<<<< ",answers);
      //first change the answers to an array of answers
      answers = changeAnswersToArray(answers);
      console.log('CREATING ANSWERS <<<<<<<<<');
      console.log(answers);

      //then send them to the api as the array
      $http.post(`${rootUrl}/polls/${self.newPollId}/answers`, {answers: answers})
        .then(function(response){
          console.log(response.data);
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
      console.log("CREATING ARRAY");

      if (answers == {} || answers == undefined){
        return "no answers to create";
      }

      for(var x in answers){
        console.log(answers[x]);
        if(answers[x] != undefined || answers[x] != ""){
          array.push(answers[x]);
        }
      }
      return array;
    };

    //get all polls created upon window load
    getAllPolls();

  });

})();
