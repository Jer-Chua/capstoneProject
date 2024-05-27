# Starting Boot Spot - Capstone Project

## Requirements

1. Visual Studio Code (VSC)
2. MongoDB Compass

## Step 1 (Frontend):
1. Download the package and extract it. Open it on VSC and <b>npm install</b>
2. <b>npm start</b> to start the entire project

## Step 2 (Backend):
1. <b>cd backend</b>
2. Inside backend folder, do an <b>npm install</b>
3. <b>node server.js</b> to start the server

## Step 3 (MongoDB):
1. Open mongoDB Compass, click on connect and you should be able to see the data being stored.

## Code Quality (Frontend):
1. <b>npx eslint --init</b>
2. Click on React and standard for frontend
3. Your directory in VSC should be <i>./capstone</i>, do an <b>npx eslint ./src/components/*.js</b>

## Code Quality (Backend):
4. Navigate to your backend folder
5. <b>npx eslint --init</b>
6. Click on NA and standard for backend
7. <b>npx eslint server.js</b>

## Testing: Cypress
1. <b>npx cypress open</b>
2. Click on "end to end testing"
3. Click on chrome
