# Rec Room Documentation

![Rec Room logo](images/recroom-logo.jpg?raw=true)


# Chapter 3: Running and Debugging Your App

At this point, you probably want to start turning the basic app that Rec Room generated for you into your prize winning new app idea. However, we want to take you through one more background area before we really get going on the coding. As a developer, it is essential to learn how to test and debug your apps, finding problems and fixing them. And that’s the subject of this article.

During the process of development, you’ll want to run your web app across various different platforms to make sure it works satisfactorily in them. For example, desktop, mobile, tablet. Firefox fortunately comes with lots of tools to help you out here, including those to run and debug issues on Firefox OS, either in a Firefox OS simulator on your desktop, or a real phone.

## Getting started with debugging

1. In your Terminal, assuming you are still in the directory of your new app, type "grunt serve". Assuming Firefox is your default browser, this will open your app in Firefox.

2. In the menu, go to Tools > Web Developer > Toggle Tools (or use the shortcut Cmd + Opt + I on Mac, or Ctrl + Shift + I on Windows/Linux), which will open the Firefox Developer Tools.

![Your new app and Firefox Dev Tools](images/new_app_plus_dev_tools.png?raw=true)

Figure 1 - Firefox Developer Tools

While we won’t get into all of the features of Developer Tools here, MDN has extensive documentation about [Developer Tools](https://developer.mozilla.org/en-US/docs/Tools), including [mobile-specific parts of Developer ](https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager)[Tools](https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager).

## Testing in the Firefox OS simulator

To test your new app in the Firefox OS Simulator, you’ll use the WebIDE tool that comes built in to Firefox Nightly.

### Opening your app in WebIDE

1. First, select *Tools > Web Developer > WebIDE* from the Firefox Menu bar.

2. Select *Project > Open Packaged App* from the Menu bar and then browse to the directory in which you created your Rec Room ```my-app``` (or whatever you named your new app.)

3. Go inside your Rec Room *my-app* directory, then select the *app* subfolder

4. Click *Open*.

You should now see your app’s information listed inside the WebIDE.

![WebIDE](images/webide.png?raw=true)

Note: The root directory of your app contains files related to the tooling and dependencies of your app, such as Gruntfile.js and bower.json. The "app" directory is where the index.html and webapp.manifest files are located, which are the key files for letting App Manager know about your app.

### Running your app in the Simulator

1. At the far right of the WebIDE, either select an emulator or install one corresponding to your desired version of FirefoxOS
![FirefoxOS simulators](images/webide-runtimes.png?raw=true)

2. At the top center of the WebIDE, click the Play button to start the app running in the simulator.

3. After the simulator launches, click the Debug button (the circle with the two vertical lines) in the top center of WebIDE. This will open the Dev Tools for the app running in the simulator.


### Running your app on a real phone

To run your app on a real phone, the steps are basically the same as running it in the simulator, except that you need to:

1. Have a real phone available, which is running Firefox OS 1.2+.

```
Make sure to install the drivers provided by your phone manufacturer if you are using Windows.
```

2. Disable Screen Lock (Settings > Phone lock > Lock Screen) and enable Remote Debugging (Settings > Device information > More information > Developer) on your phone.

3. Connect your device to your machine via a USB cable.

4. Click on the name of your device, which you should now see listed as an option in WebIDE's Select Runtime dropdown menu in the upper right.

For more information, read the [WebIDE](https://developer.mozilla.org/en-US/docs/Tools/WebIDE) documentation on MDN.

