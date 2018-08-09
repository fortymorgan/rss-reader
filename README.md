# RSS Reader

This app allows to subscribe to RSS feeds and read news from them. Reader will update all feeds automaticly.

[![Maintainability](https://api.codeclimate.com/v1/badges/c1a78efaefd85ef4a29c/maintainability)](https://codeclimate.com/github/fortymorgan/project-lvl3-s258/maintainability)
[![Build Status](https://travis-ci.org/fortymorgan/rss-reader.svg?branch=master)](https://travis-ci.org/fortymorgan/rss-reader)

### Screenshots

#### Desktop
<img src="https://github.com/fortymorgan/rss-reader/blob/master/screenshots/Desktop.png" alt="Desktop" title="Desktop version" />

#### Mobile 
<img src="https://github.com/fortymorgan/rss-reader/blob/master/screenshots/Mobile.png" width=320 alt="Mobile" title="Mobile version" />

## How to develop
To run the project locally first you need to install all dependencies with:
```
npm install
```
Then create `main.js` bundle with:
```
npm run watch
```
Then open `index.html`.

## How to deploy
First you need to install [Surge](http://surge.sh)
```
npm install -g surge
```
Change domain prefix for `deploy` script in `package.json`, then run:
```
npm run deploy
```
If it your first run, Surge will ask you for email and password and create an account for you.  
Then the project will be deployed for domain, which you used in `package.json` `deploy` script.  
(If domain is already used, Surge will tell about that).

## How to use
Open the [app](http://rssreader-s258.surge.sh/)

### Add feed
Enter a feed URL to the field "New feed" and click "Add" or press "Enter". New feed will apeear in the feeds list.

### Show feed
To show news from feed, click on it in the list. Selected feed will open, with news list in there.

### Read news
To read news, click on item in news list. A link will open in a new tab.

### Delete feed
To delete feed from list, click on the cross in the right side of feed in the list.

## Built with
- [React](https://github.com/facebook/react) - web framework
- [Redux](https://github.com/reduxjs/redux) - app state container
- [Bootstrap](https://github.com/twbs/bootstrap) - style framework
