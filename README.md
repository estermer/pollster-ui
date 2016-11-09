# Pollster

A simple web app to create and answer polls

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
