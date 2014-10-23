# Rec Room Documentation

![Rec Room logo](images/recroom-logo.jpg?raw=true)


# Chapter 2: Create Your First Project

## Create your app

1. Think up a name for your project! Make it short and memorable.

2. Open your terminal, and `cd` (change directory) to a location where you’d like to create your project directory.

3. Type in the following terminal command, replacing `my-app` with your project name: 

```
recroom new my-app
```
Note: A new folder will be created inside the directory you run recroom in, containing your new project.

Note: If you don’t name your project and just type in `recroom new`, recroom will create a new project named recroom-app. You can change the name of your project by hand, later on.

## Start Your App

Rec Room has created the basic files and structure for your app. It also provides a development server for you to view and debug your changes. Rec Room will automatically compile and concatenate your JavaScript, CoffeeScript, and Sass files for you, as well as provide a host of other services and optimizations which we’ll provide more detail about later on.

For now, let’s show how you can run your Rec Room app.

1. First, cd into your project's folder
```
cd my-app
```
2. Now run your Rec Room project with the following command:
```
recroom run
```

Your app will now be opened in your system's default web browser.

If you'd like to run your app via a web server without opening your browser, type:
```
recroom serve
```

## Structure of your App
There are many different ways to structure a mobile web app built using web technologies. Rec Room includes the popular Ember.js framework for it’s structure and overall architecture, therefore app structures and are the same as Ember. We chose Ember because it has a fairly idiomatic file and directory structure for new apps that will make it easy for us to get started quickly.

Note: Don’t worry if you are not familiar with Ember. The next article provides a primer providing you with all you need to know to use Rec Room.

Your new app will have the following structure:

my-app

	-app

		- bower-components

	- images

		- scripts

			- components

		- controllers

			- initializers

			- models

			- routes

		- utils

			- views

			app.js

		router.js

			store.js

	- styles

		- templates

	- node_modules

	- test

	.bowerrc

	.editorconfig

	.gitattributes

	.gitignore

	.jshintrc

	bower.json

	Gruntfile.js

	package.json

Over the course of this documentation, we will address the function of each of these folders and files. For now, we will focus on the app directory, which primarily contains the Ember files necessary for your app.

## The "app" directory

We will start with short summaries of the directories in "app". 

index.html — The main HTML file that loads Ember, your compiled JavaScript, your compiled CSS styles and other key files. Effectively, loading this file creates a Single Page App (SPA) that navigates its routes through hashchange events (e.g. /#app-page).

webapp.manifest — This file identifies your app, and describes its structure and assets. See the [Manifest section](#the-manifest-file) for more details.

*bower-components* — These are third party libraries installed for you through the [Bower](http://bower.io/) package manager. Bower is a powerful tool that you will explore later. It allows you to easily add libraries to your project from the command line, for example `bower install jquery`. In the bower.json file, you can specify all the library and version dependencies for your app.

*images* — This is where you place image assets used by your app. For example, if you have a logo image or other pictures that are used in the app, they go here. Yeoman, our command line development tool, has tools for optimizing and compressing images.

*scripts* — This is the key directory that contains most of the JavaScript files relevant to Ember.

*scripts/app.js* — This file creates the Ember Application and uses require.js to load in all the files that make up the app (controllers, web components, models, routes, views, templates, FirefoxOS UI widgets, etc).

*scripts/router.js* — This is where you define the names of your routes in your application. Routes represent xxx. If you use Ember naming conventions, Ember will use the name of your route to lookup a controller. For example:

`this.route("testpage");`

will wire to `TestpageController` automatically. Here is more information on [Ember Routing conventions](http://emberjs.com/guides/routing/).

*scripts/store.js* — this file configures the type of store that Ember will use. The Ember store is used to cache data locally. Queries hit the local cache first and if data is not found, a request will be sent to the specified server or API.

*scripts/components* — This directory contains [Ember Components](http://emberjs.com/guides/components/) that you create for use in your application. Ember Components follow the W3C working spec for the Custom Elements part of web components, which allow you to implement your own HTML tags. This is very useful for code re-use, abstraction, encapsulation of logic and styles and a variety of other reasons. For example, you might have a date picker widget in your app that is used on multiple pages and contains specific logic and style. By encapsulating it in a web component, you can re-use this widget very easily. The files in this directory are Handlebars files (the file extension is .hbs). Handlebars is a template library that ships with Ember; it makes it very easy to pass data into your custom components.

*scripts/controllers* — Controllers contain the logic that underlies each section or page of your app. For example, if a user clicks a button on the page of the app, that action will be sent to a controller that handles it in a variety of ways. Controllers are the connection between data (models) and templates (views).

*scripts/initializers* — [Ember initializers](http://emberjs.com/api/classes/Ember.Application.html#toc_initializers) are used to setup or configure application state, run tasks before `App.ready()`, or pre-load data.

*scripts/models* — These JavaScript files store your Ember models, which represent the data in your application. <TODO description of ember data>

*scripts/routes* — This folder contains Ember Route files that define the URL structure of your app. For simple apps, you can define all your routes in "application_route.js" (app-name.ApplicationRoute) in this folder.

*scripts/utils* — Put your various utility methods here.

*scripts/views* — Most of the action handling happens in Handlebars templates or components. Create Ember views if you need sophisticated handling of user events or re-usable components.

*styles* — The CSS, SASS, LESS or Stylus files that style your app belong here.

*templates* — This directory contains Handlebars files (.hbs) that describe the templates for your pages or sections. The highest level template is application.hbs, which is loaded at app startup. If your app is standard, index.hbs will be loaded when the Index Route is loaded by the app.

*templates/components* — Put your Handlebars files for Ember Components you create here. Your Ember Component definitions will be in *scripts/components* (Ember.Component.extend) and your Ember Component Templates are here.

## Types of Applications

Rec Room supports two application types: hosted and packaged apps. If you want to build an app that works across all web-capable platforms, you’ll be focusing on a hosted app, but packaged apps provide a few advantages over hosted apps for platforms that support them, such as Firefox OS.

### Hosted Apps

Hosted apps are hosted on a web server like normal websites. In addition, a Firefox OS user can visit a URL and install the app to their home screen directly from a website (as opposed to installing through Firefox Marketplace). When a user launches a hosted app, its content is loaded from the remote server, unless content is cached locally (via appcache or Service Workers).

### Packaged Apps

Packaged apps are distributed as a zip file and copied to the device when installed. When a user launches a packaged app, its contents are loaded from the zip file instead of a remote server.

Packaged apps have access to a number of features that hosted apps don’t, such as key device services and hardware features.

```
Rec Room focuses on the creation of packaged apps, but your app can easily be modified to be hosted as well.
```

## The Manifest file

When creating a packaged app, you need to specify certain resources to let the OS or runtime know about key files and metadata about the app. The manifest is an important file that helps distinguish a Firefox OS or open web app from a normal website or webapp. It is a JSON file that contains a description of the app, paths to resources such as icons, and permissions required by the app.

An example "manifest.webapp" file is generated for you by Rec Room. This looks like:

```
{
  "name": "My App",
  "description": "A description of my app",
  "launch_path": "/index.html",
  "icons": {
    "128": "/images/icon-128.png"
  },
  "developer": {
    "name": "Your name or organization",
    "url": "http://your-homepage-here.org"
  },
  "default_locale": "en"
}
```

Further documentation can be found on [MDN - App Manifest](https://developer.mozilla.org/en-US/Apps/Build/Manifest). Apps that require access to system APIs like the Camera, Contacts, etc. must specify the permissions required in manifest.webapp. [Hosted Apps and Privileged Apps](https://developer.mozilla.org/en-US/Apps/Build/App_permissions) have different levels of access to certain APIs. [Packaged apps](https://developer.mozilla.org/en-US/Marketplace/Publishing/Packaged_apps) can be distributed through the Firefox Marketplace. 

A matrix of what APIs are supported on various versions of FirefoxOS is available [here](https://developer.mozilla.org/en-US/Firefox_OS/API_support_table). 

