## What is this project for ?

This project was born with the idea of enhancing my knowledge and skills to build full stack applications. In order to do so, I decided to try to recreate an existing application with some technologies that I didn't use during the bootcamp I partake in.

## User stories

As a user, I want to be able to create an account :heavy_check_mark:
As a user, I want to be able to log in :heavy_check_mark:
As a user, I want to be able to create a board :heavy_check_mark:
As a user, I want to be able to create a list for a specific board :heavy_check_mark:
As a user, I want to be able to create cards for specific lists :heavy_check_mark:
As a user, I want to be able to delete and edit boards, lists, and cards :white_check_mark:
As a user, I want to be able to move the cards :white_check_mark:

### Legend

- :heavy_check_mark: : Functionality working
- :white_check_mark: : Functionality in progress


## What Technology are used ?

### For the back end
- During the bootcamp, we used a RESTful server with multiple endpoints within express. For this project, I decided to explore the strengths of graphQL with Apollo.
- The server is connected to a postgreSQL with Sequelize

### For the front end
- The app has been built entirely with React Hooks
- For the Drag & Drop functionality, I used the library React DnD
- For the styling, the library used was Styled Components

## Roadblocks and solutions

### Authentication

Authentication can be a tricky topic, and the opinions on the matter are diverses. Given the goal of this project, I decided to go with a simple token based authentication which will be stored in localStorage in the client side. This method involve security risks, but nothing except the userId is stored in the JWT, thus limiting the sharing of confidential informations.

### How to make the position of the cards and the lists persist

Once I got to the Drag & Drop functionality, I stumbled upon the problem of persisting the order of the lists and the cards so that even when the page is refreshed, the order would be the same as the user left it. To do so, I added a position column for each table, and when a change is made on the front end, a mutation logic is sent to the back end in order to update the positions of the cards or lists moved.

## Demo GIFs

### Board Creation
![gif1](https://media.giphy.com/media/kHfhoyMQ2SB5Sw7vrM/giphy.gif)

### List Creation
![gif2](https://media.giphy.com/media/l3VPU0DIrCQtAkMgqf/giphy.gif)

### Drag & Drop functionality + delete element
![gif3](https://media.giphy.com/media/VbcEkXtZBITSMGuT1N/giphy.gif)

## What now for this project ?

The following update should be made to this project further on :

- Improve the UI
- Make it possible to move the cards from one list to another
- Add the possibility to change the color of the boards

## Back end

You can find the repository for the back end [here](https://github.com/morantaf/trello-copy-server)
