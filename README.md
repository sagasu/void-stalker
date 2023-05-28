# void-stalker
### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.


# Snowpack
To be able to use es6 modules and write in typescript you need a bundler to import es6 modules in browser, otherwise browser will not be able to run js files transpiled from typescript because it will not understand keywords as 'import', 'export' and so on.
To setup bundler with typescript and everything you can just run:
`npx create-snowpack-app . --template @snowpack/app-template-blank-typescript`