# OMDB - React - Typescript - Gatsby - rmwc component library

A simple website that queries the [OMDB](http://www.omdbapi.com/) movie database api. Site allows you to search for movies, as well as mark your favourite movies.

## Features

- Search
- API key in LocalStorage
- Favourites saved in LocalStorage

## Notable Tech/features used

- React
- Typescript
- [Gatsby](https://www.gatsbyjs.org/)
- [gatsby-starter-typescript-plus](https://www.gatsbyjs.org/starters/resir014/gatsby-starter-typescript-plus/) - handy starter to get you going with Gatsby & React
- [React Context](https://reactjs.org/docs/context.html) - useful as a central data and actions store
- A small [Express.js](https://expressjs.com/) server to get around CORS. See instructions below for running this project
- [RMWC](https://jamesmfriedman.github.io/rmwc/) component library which wraps Google's [Material Web Components](https://github.com/material-components/material-components-web)

## Future improvements
- Better, custom styling instead of using library for components
- Remove a lot of the boilerplate that arrives in with gatsby-starter-typescript-plus

## Prerequisites

- Node 8+
- Npm 6.4.1+
- Modern browser that supports `LocalStorage`

## Instructions

Due to CORS limitations, this project needs a backend NodeJS server to work. This has been build into a single script to make use easy


Installation:
```
git clone git@github.com:noccer/omdb.git
cd omdb
npm install
```

Run in dev mode: (served on port 8000)
```
npm run start
```

Run in production mode: (builds the site static data files first, then serves it on port 9000)
```
npm run start-prod
```
