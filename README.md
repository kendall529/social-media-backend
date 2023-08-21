# Social Media API

## Description

This is an API for a social network web application. Users can make an account and then make thoughts that are associated with them as well as a friend list, and other users can leave reactions to said thoughts. At this time, it's only a backend application.

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Walkthrough Video Link



## Setup and Usage

Run `node index.js` in the terminal and then use Insomnia to perform CRUD operations.