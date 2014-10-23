# Rec Room Documentation

![Rec Room logo](images/recroom-logo.jpg?raw=true)


# Chapter 5: UI Widgets and Layout
## UI Widgets

Rec Room uses [Mozilla Brick](http://mozbrick.github.io/) for UI Widgets and other helpful Web Components. Brick is a collection of UI components designed for the easy and quick building of web application UIs. Brick components are built using the Web Components standard to allow developers to describe the UI of their app using the HTML syntax they already know.

Brick can be installed using the [Bower](http://bower.io/) package manager:

```
bower install mozbrick/brick
```

#TODO - change this to recroom specific
To use Brick in your project, place the following in the <head> of your main HTML:

```
<script src="bower_components/brick/dist/platform/platform.js"></script>
<link rel="import" href="bower_components/brick/dist/brick.html">
```

If you are already using Polymer, platform.js or a web browser that supports Web Components, you do not need the above <script> tag.

If you only want to use a component or two instead of all the Bricks, you can install individual Bricks like this:

```
bower install mozbrick/brick-appbar
```

## Using Brick to achieve common app layouts
### TODO

## Grid Layouts and Flexbox
<description>

### Cross-browser Flexbox issues
<TODO>

### Using Flexbox to achieve common grid layouts
https://github.com/kristoferjoseph/flexboxgrid
http://www.westofwonder.com/2014/02/cross-browser-flex-box-for-responsive-design/
http://remotemanifesto.com/code/2014/03/07/a-simple-flexbox-example-that-gracefully-degrades.html
http://codepen.io/boostnewmedia/pen/kvtoF

And this by a very smart guy I know:
https://dev.opera.com/articles/advanced-cross-browser-flexbox/
