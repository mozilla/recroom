# Rec Room Documentation

![Rec Room logo](images/recroom-logo.jpg?raw=true)


# Chapter 1: Introduction to Rec Room

Rec Room is a collection of JavaScript libraries and tools curated by Mozilla. It aims to help you build first-class web applications. It includes Ember.js for writing your web app, Grunt for automating your build process, and a variety of other libraries aimed at improving your productivity. This series of articles aims to teach you the fundamentals of modern web app development and get you up to speed quickly, introducing the Rec Room bundle’s different features as we go.

## Target audience / prerequisite knowledge

Using the frameworks and tools in Rec Room requires some knowledge of HTML, CSS, and Javascript, but our goal is to accelerate the app development process even for beginners. If you’re new to web development, MDN is a great resource for learning the basics:

* [Web APIs & DOM](https://developer.mozilla.org/en-US/docs/Web/Reference/API)

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) & [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) & [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3)

Rec Room is **not** the only way to make mobile web apps for FirefoxOS. If however you are just getting started with building complex modern web applications, have been getting lost and frustrated by the sheer number of choices available, or just want a toolchain that works, Rec Room is for you.

Firefox OS apps are built using the Web. That means that all that you have learned about HTML, CSS and Javascript applies to developing apps for the Firefox OS platform. Mozilla, inconjunction with other browser vendors and the W3C has developed a number of [WebAPIs](https://wiki.mozilla.org/WebAPI) to provide access to key mobile phone systems and services. We will cover these APIs later in the documentation. 


Rec Room uses Ember.js as the framework to build your app’s controllers, models, and views. While you don’t need to know Ember.js (our documentation will walk you through the basics you’ll need), some previous knowledge would be useful. You can always refer to the excellent [Ember.js guides](http://emberjs.com/guides/). They do a good job explaining the structure of Ember apps, especially in relation to the [MVC (Model View Controller) design pattern](http://en.wikipedia.org/wiki/Model-view-controller).

We also provide a brief introduction to important Ember concepts in [Appendix 2: A Brief Introduction to Ember](A2 - A Brief Introduction to Ember.md).


## Conventions

Commands you type into a console or code snippets will be formatted like this:

```
npm install -g recroom
```

## Support & Questions

* If you need help, check out the [dev-webapps mailing list](https://lists.mozilla.org/listinfo/dev-webapps). If you’re a web app developer, you will find it useful to subscribe to that list.

* We’re also on the #apps channel on[ irc.mozilla.org](https://wiki.mozilla.org/IRC).

## Is Rec Room appropriate for developing games?

Rec Room’s goal is to help you build apps of many different kinds, however games are a special niche unto themselves. Check out the [Building Games for FirefoxOS](https://leanpub.com/buildinggamesforfirefoxos) ebook for more information about game-specific development.

## Installation

Rec Room is controlled using a set of command line tools. On your given platform (Mac, Linux, or Windows), you will use a terminal or command prompt to use Rec Room.

## Getting Rec Room
1. Open your Terminal or command line now.
2. Rec Room requires[ Node.js](http://nodejs.org/download/). Install node to get started with Rec Room.
3. Next, install Rec Room using the node package manager (NPM):

```
npm install -g recroom
```

Note: See [Appendix 1 - Rec Room, Yeoman and Permissions on Mac OSX](A1 - Rec Room, Yeoman and Permissions on Mac OSX.md) if you're having issues with permissions on OSX. This advice can apply to Linux and other Unix variants as well.

## Testing and debugging via a web browser

You’ll need a web browser to view, debug and test your mobile web app. We recommend [Firefox Nightly](http://nightly.mozilla.org/). It has great [Developer Tools](https://developer.mozilla.org/en-US/docs/Tools) and cutting-edge support for emerging Web Standards. Its [Responsive Design View](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View) is also great for testing your app’s phone and tablet layouts.

## Writing and editing code

To effectively create mobile web apps, you’ll need either a text editor or Integrated Development Environment (IDE). Fortunately, Firefox Nightly comes with a built-in IDE called [WebIDE](https://developer.mozilla.org/en-US/docs/Tools/WebIDE). If you prefer just a text editor, we recommend [Sublime Text](http://www.sublimetext.com/), which includes an unlimited free trial.

