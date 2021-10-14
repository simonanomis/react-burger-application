# react-burger-application
Simple application for building burger, add ingredients and then purchase it.

## In the project directory, you can run:
n
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Step by step building this app

### enable css modules - eject 
Making sure that the css classes that we create in css file can be scoped to a specific component, so that they are
not applied globally when we would reuse the same css class. 
#### npm run eject
Add in webpack.config.dev.js css options:
modules: true,
localIdentName: '[name]__[local]__[hash:base64:5]'
