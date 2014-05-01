---
title: recroom

language_tabs:
  - javascript
  - coffeescript

toc_footers:
  - <a href="https://github.com/mozilla/recroom">Contribute to recroom</a>
  - <a href="https://github.com/tripit/slate">(Docs Powered by Slate)</a>

---

# WORK IN PROGRESS

Note that these docs are a work-in-progress, part of the
documentation-driven-development of Mozilla's recroom. Please don't expect them
to work yet. Thanks! ♥

# Installation

``` bash
# Install using npm (comes with Node.js)
# recroom is installed globally so you can use it on the command
# line from any directory.
npm install -g recroom
```

recroom requires [Node.js](http://nodejs.org/download/). Install node to get
started with recroom.

recroom uses Ember.js as the framework to build your app's controllers, models,
and views. Our documentation will walk you through the basics of how to use
Ember.js to build your app, but you can always refer to the
[Ember.js docs](http://emberjs.com/api/) if you need aditional information.

<aside class="notice">
  If you get an error about permissions and are on Linux, Mac OS X, or another
  flavour of Unix, you may need to use `sudo`:<br>
  `sudo npm install -g recroom`.
</aside>

# Create Your First Project

``` bash
# Create a project (you can call it whatever you want).
# A new folder will be created inside the directory you
# run recroom in.
recroom new high-fidelity
```

Think up a name for your project and run `recroom new my-app`. We're going to
create the [Mozilla Podcasts app](https://github.com/mozilla/high-fidelity), so
we'll run `recroom new high-fidelity`.

<aside class="notice">
  If you don't name your project, recroom will create a new project named
  `recroom-app`. You can change the name of your project later by hand.
</aside>

# Start Your App

``` bash
# Enter your project's folder.
# TODO: cd into the project on creation automatically?
cd high-fidelity

# Run your recroom app.
recroom run
```

Now that you've created an app, you can start it by running `recroom run`.
develop it and test it. When you server your app, recroom will automatically
compile your JavaScript, CoffeeScript, and Stylus.

<aside class="success">
  Whenever you type `recroom run`, your app will automatically be opened in
  your system's default web browser.

  If you'd like to run your app via the recroom server, without opening your
  browser, type `recroom serve` instead.
</aside>
