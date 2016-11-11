# Pollster

A simple web app to create and answer polls.

Wanna find out what people prefer, create a poll, watch people response, view the results.

[Front End UI](https://github.com/estermer/pollster-ui) |
[Back End API](https://github.com/estermer/pollster-api)

### Models

```text
 Poll
  - Title - String
  - Question - Text
  - Has Many Answers
  
 Answer
  - Text - String
  - Responses - Integer
  - Belongs To Poll
```

### Process
Started a new job at this time, so I was limitied each day to the evening to complete this project.

Balancing this project for school and work was easy due to good planning and SCRUM flow.

#### Day 1
Spend the evening planning out what App I wanted to create. Once I decided, I figured out the models. Looking back this may have been better done with a Mongo data base, but I made the postgres work. Very simple models for this, creating a poll and an answer. The idea is to enable the increase of responses to the answers given on the front end. 

Set up a trello board and wrote out the user stories and tasks for the work flow.

##### User Stories
 - User does not need to login
 - User can click a button that will display a create poll form containing a poll title, question, and answers
 - Polls will auto matically load up to the display when create
 - User does not need to travel to any other page/view other than the main
 - User can click a radio button on an answer and submit that answer to the database
 - User can click a button on that poll to show the results of the poll
 - User can click an x button that will delete the poll and answers along with it
 
### Day 2
Worked on the rails API and initial set up. Ran migrations and created blank models and controllers based on the migrations generated. Ran into some issues with deciding how to set up the controllers routes based on the user stories but took each route one by one to solve this problem.

### Day 3
Completed the Rails API and all the necesary routes and controller methods. minoor changes were made after starting the angular front end to meet user story needs, including setting up CORS to solve a api request error. 

Working on angular, set up an initial server and a home route that is the only route the user will ever visit.

Create the boiler plate angualr module to build out my main controller which contains all the neccesary CRUD ajax request. Worked on each CRUD request one by one starting with getting all the polls and workinng my way to creating answers, then moving from showing the polls to showing the results. Worked on the boiler plate html for each step as I went to not over whelm myself with over all website design. HTML at this time remained very vanilla until the angular functions were all completed.

### Day 4
Took the morning to finish the angualr functions. Had to overcome connection issues mostly with the backend, but was easy to get over with cores. At times there were problems with the actual data I wanted to send back and forth, so I solved these problems with some methods written in the controller. I could have written them in the model for a fat model skinny controller, but I didn't have to write alot so I opted to write them in the controller for easier access.

### Day 5
After completing the angular app, spent all day just styling and making the application look good. Stepped out of my confort zone and added div popups to overlap the window on button clicks. Never did this before, but it made a single page app like this one work really good for user flow. 
