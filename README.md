# ZipMath

Mental-math shortcuts in your pocket, taught like a game. ZipMath walks you through themed worlds (Multiply Magic, Square City, Percent Peaks, Divisibility Desert), one short lesson and one practice round per level, with XP, daily streaks, hearts, stars, and animations.

## Features

- Worlds and levels that unlock in order, shown as a winding path
- Bite-size animated lessons, then 5 generated practice questions per level (answers are computed in code, so they are always correct)
- 3 hearts, 1 to 3 stars per level, XP, and a daily streak saved on the device
- Searchable cheat sheet of all shortcuts

## Tech

React Native (Expo), TypeScript, the built-in Animated API, AsyncStorage for progress, Expo Haptics.

## Status

Playable prototype. Tests, CI, and store releases are in progress.

## Run it

```bash
npm install
npx expo start
```

Open the app with Expo Go on your phone, or press `w` for the web version.
