# Cook4All 
In this repo you find the code from my capstone-project 'cook4all'. It's the final product of an intensive 3-month-bootcamp at neuefische. 
I designed and coded this App in 4 weeks to show and practice my newly acquired skills. It's optimized for mobiles, so it might not look perfect on larger screens.

Have a look at the video-preview:

[![Have a look at the video-preview]({https://user-images.githubusercontent.com/79710919/205026231-b1d5e692-36ca-4d79-b06c-e218d31d2160.png})]({https://user-images.githubusercontent.com/79710919/205025036-4e17a97a-e693-4ee5-a398-3a49c450c72e.mp4} "Cook4All Preview")

[Or try it out yourself!](https://capstone-cook4all.vercel.app/)

## About the app
You invited friends and want to cook for them - but someone has a gluten-intolerance, someone else is vegetarian ... It's difficult to find one meal for everyone.

Cook4All helps you to save intolerances, diets etc. from people you want to cook for. Searching through more than 2 million recipes it will show you recipes that everyone can eat and enjoy.

### How it works
First, you login as a new user and create guests you want to cook for. 
Then, you select guests you want to cook for and start searching for recipes that everyone can eat. That's it!

For each guest you can save up to 34 different intolerances and diets.
You can also filter the recipes for the type of meal, dish or cuisine you are looking for and you can save your favorite recipes.

## Technologies I used
- React 
- React Context API
- React Router
- Jest

- Styled Components




- Express
- Node.js
- Mongoose
- MongoDB
- Edamam API

## Setup
- Clone this repository
- Inside root folder install all dependencies via ``$ npm install``
- go inside the api folder via ``$ cd api`` and install the backend dependencies ``$ npm install``
- go back to root folder ``$ cd ..``
- Create your own ``.env``file inside the root folder. It should contain **your own** ``API-Key`` and ``API-ID`` from the [edamam recipe api](https://developer.edamam.com/edamam-recipe-api) and a link for your mongoDB-Server. It should look similar to this afterwards:

```
REACT_APP_API_KEY=032sjd0gje028sjfb9274g1838lbam3h
REACT_APP_API_ID=935aj4ot
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ncmitzu.mongodb.net/?retryWrites=true&w=majority
```

- Run app in development mode via ``$ npm run fullstack``
- Server: http://localhost:8080/
- Client: http://localhost:3000/
- Run tests via ``$ npm run test``

<img src="https://user-images.githubusercontent.com/79710919/202211861-9a638cbb-5e67-48a3-9725-dd4f49fa1073.svg" width=200 align="right"/>
