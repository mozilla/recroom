# Rec Room

Rec Room is a Node.js utility belt you can wear to build client side web apps.
It includes:

 * **Brick** to add components like appbars and buttons to your UI.
 * **Ember** for your app's controllers, models, and views.
 * **Handlebars** to write your app's templates.
 * **Grunt** to run the tasks for your app, including building for production.
 * **I18n.js** to localize your app.
 * **Mocha** to test your app.
 * **Sass** to write your CSS.
 * **Yeoman** to scaffold new code for your app's models and templates.

Rec Room is a work-in-progress; please file bugs and we will work to fix them,
but also expect errors as it is still very much in-flux!

# Installation

You need Node.js installed. Then just run:

```bash
npm install -g recroom
```

To get the `recroom` binary installed on your system.

# Documentation
[Click here for the in-depth Rec Room guide](docs-guide/00 - Table of Contents.md)

## Usage

### Create a new app

Create a new Rec Room app using `recroom new app-name`. The app will be created
in a new folder inside the current directory.

### Run your app

You can run your skeleton app right away in a web browser using `recroom serve`.

**TODO:** Have a way to enable `recroom run` building the app in `dist/` and
launching it in the B2G Simulator. See bugs: [1039978][bug 1039978],
[1000993][bug 1000993], and [1035185][bug 1035185].

[bug 1039978]: https://bugzilla.mozilla.org/show_bug.cgi?id=1039978
[bug 1000993]: https://bugzilla.mozilla.org/show_bug.cgi?id=1000993
[bug 1035185]: https://bugzilla.mozilla.org/show_bug.cgi?id=1035185

### Build your app

`recroom build` will compile the distributable build of your app to the `dist/`
folder in your project. This version includes the production version of some
libraries (like the production build of Ember, which--for example--includes
less debug output in the console) and heavily minifies your source files
(including minifying your HTML).

### Deploy your app

You can deploy your app to GitHub Pages using `recroom deploy`.

### Tips/Notes

**Sass:** Recroom uses [node-sass][node-sass], which handles Sass compilation with [libsass][lib-sass]. Libsass is currently lacking some of the latest features from the popular Sass Ruby Gem. See [Reporting Sass compilation and syntax issues][sass-notes]

[lib-sass]: https://github.com/sass/libsass
[sass-notes]: https://github.com/sass/node-sass#reporting-sass-compilation-and-syntax-issues
[node-sass]: https://github.com/sass/node-sass
