(function(){
  var app = angular.module('pollster', []);

  // app.directive('createPoll', function(){
  //   return {
  //     restrict: 'E',
  //     templateUrl: '/templates/create-poll.html'
  //   };
  // });
  //
  // app.directive('createAnswer', function(){
  //   return {
  //     restrict: 'E',
  //     templateUrl: '/templates/create-poll.html'
  //   };
  // });

  app.controller('MainCtrl', function($http){
    var rootUrl = 'http://localhost:3000';
    var self = this;

    self.pollCreated = false;
    self.showResults = false;
    self.showForm = false;

    var getAllPolls = function(){
      $http.get(`${rootUrl}/polls`)
        .then(function(response){
          console.log(response.data);
          self.polls = response.data.polls;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    self.showHideForm = function(){
      if(self.showForm){
        self.showForm = false;
      } else {
        self.showForm = true;
      }
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
          self.showHideForm();
        })
        .catch(function(err){
          console.log(err);
        });
    };

    self.recordResponse = function(answerId, pollId){
      console.log(pollId);
      $http.put(`${rootUrl}/answers/${answerId}`)
        .then(function(response){
          console.log(response.data);
          //after someone sends a response clear the button
          //and change it to a thank you message
          // var button = document.getElementById('pollId');
          // button.innerHTML = "<span>Thank you for your response</span>";
        })
        .catch(function(err){
          console.log(err);
        });
    };

    self.getResults = function(pollId){
      $http.get(`${rootUrl}/polls/${pollId}`)
        .then(function(response){
          console.log(response.data);
          self.pollAnswers = response.data.answers;
          self.showResults = true;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    self.hideResults = function(){
      self.showResults = false;
    };

    self.deletePoll = function(pollId){
      $http.delete(`${rootUrl}/polls/${pollId}`)
        .then(function(response){
          console.log(response.data);
          getAllPolls();
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
