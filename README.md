# MusicMe Frontend

MusicMe is a social media platform creating for sharing music.

## Build status

[![Netlify Status](https://api.netlify.com/api/v1/badges/11f2eb04-ba01-4a40-97af-abde670b7dcd/deploy-status)](https://app.netlify.com/sites/music-me-app/deploys)

## Getting started

To start this project you will need access to the backend repo (private)
<br>
Make sure you have [docker](https://www.docker.com/) installed

To build the containers run

```shell
npm run docker:build
```

To start the container run

```shell
npm run docker:run
```

## Built with

-   [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/)
-   [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
-   [![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff)](https://daisyui.com/)
-   [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
-   [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
-   [![Spotify API](https://img.shields.io/badge/Spotify-1ED760?logo=spotify&logoColor=white)](https://developer.spotify.com/documentation/web-api)

## Roadmap

-   [x] Switch to UUID for profile ids
-   [ ] Feed page
-   [ ] Better analytics - last login, more analytics for song
-   [ ] Option to pick top song
-   [ ] Create publically accessible pages

## Functionality

-   User can share songs
-   User can view other users shares / reviews
-   Users can like a song

### Optional funcitonality

-   Users can view favorite artists shows coming out

## Contact

Thomas Mazzag - tom.mazzag@gmail.com <br>
<a href="https://linkedin.com/in/thomas-mazzag" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="thomas-mazzag" height="30" width="40" /></a>

## App flow

-   User is first greeted on the welcome page where they can sign in
-   User is then redirected to success page which is a callback page
-   User is finally admitted to main platform
