# ZipMath

**[Try the live web demo](https://therealemmanueloppong.github.io/zipmath/)** (best on a phone-sized window; progress is saved in your browser).

Mental-math shortcuts in your pocket, taught like a game. ZipMath walks you through themed worlds (Multiply Magic, Square City, Percent Peaks, Divisibility Desert), one short lesson and one practice round per level, with XP, daily streaks, hearts, stars, and animations.

## Features

- Worlds and levels that unlock in order, shown as a winding path
- Bite-size animated lessons, then 5 generated practice questions per level (answers are computed in code, so they are always correct)
- 3 hearts, 1 to 3 stars per level, XP, and a daily streak saved on the device
- Searchable cheat sheet of all shortcuts

## How content is organized

Three tiers (Basic, Intermediate, Advanced) each contain worlds, and each world contains levels. To add content, put a question generator in `src/content/generators.ts`, then add a level to a world in `src/content/basic.ts`, `intermediate.ts` or `advanced.ts`. Levels unlock in order across tiers.

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

## Web demo

The web version is built with `npx expo export --platform web` and published to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`. It uses the same code as the phone app. Animations and saved progress work in the browser; haptic feedback does not.
