# Rec Room Documentation

![Rec Room logo](images/recroom-logo.jpg?raw=true)


# Chapter 8: Web APIs - Accessing Phone APIs and Hardware

WebAPIs are simply JavaScript APIs that allow applications to interact with mobile device features. There are a number of WebAPIs available for accessing device hardware (battery status, device vibration hardware, camera, etc.) and data (calendar data, contacts, etc.). Though many of these APIs are still being iterated on &mdash; and some are still working towards stabilization &mdash; there are strategies available for checking compatibility so we can leverage these APIs and build feature-rich applications.

In Chapter 7 we learned how to set permissions in our application manifest to access these types of APIs. In this chapter we'll walk through a couple examples of putting them to work.

## Notifications 
From our podcasts app in Chapter 4, let's imagine we want to notify our users when a new episode of a podcast is finished downloading. In our application manifest, we'll need to add the permission `desktop-notification` so we can use the [Notifications WebAPI](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Using_Web_Notifications):

```javascript
"permissions": {
    "desktop-notification": {
      "description": "Needed for creating system notifications."
    }
  }
````

After setting the appropriate permissions, creating a new notification is simple:

```javascript
function notifyOnDownloadComplete() {
  if ("Notification" in window) { // check that Notifications are supported in our browser
    var message = "Your podcast episode has finished downloading!";
    var downloadNotification = new Notification('Download Complete', { body: message });
  }
  else {
    console.log("Notifications are not supported in this browser.");
  }
}
````

But what would happen if we had forgotten to add the `desktop-notification` permission to our app manifest? In this scenario, users just wouldn't receive a notification upon completion of a download. This is a small feature of a much larger application &mdash; and users may not even realize something is broken &mdash; but when a WebAPI governs more substantial functionality, be sure you've set the necessary permissions.

If you're confident you are using an API correctly and it still doesn't seem to be working, double-check that you didn't leave anything out of the permissions declaration in your app manifest. See MDN's [App Permissions](https://developer.mozilla.org/en-US/Apps/Build/App_permissions) table for a list of the permissions that must be specified for access to various hardware and data.

## Detecting Application Focus
Now let's make sure this notification only displays if a user begins an episode download and switches applications, or returns to the home screen before it completes. If they begin a download, and are still in the application, they won't need a notification because our UI will have a visual indicator that it's complete.

In order to do this, we'll need to detect if the application is visible or not. With the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API), there is a `visibilitychange` event fired on the document that will help us determine whether or not our app is visible. For example:

```javascript
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    console.log("App is hidden");
  } else {
    console.log("App is visible");
  } 
});
````

*Note: The PageVisibility API is not a WebAPI that we need to specify a permission for. We get this one for free. =P*

So whenever a user clicks out of our application, we know that `document.hidden` is going to be `true`.

In our episode model (`/app/scripts/models/episode_model.js`), we are doing a check to see when the download is complete. Upon completion, we are resetting some of our model's property values to reflect that it has been downloaded. Let's also call our `notifyOnDownloadComplete` function if the document is hidden:

```javascript
if (_this.get('_chunkCount') ===
    _this.get('_chunkCountSaved') &&
    _this.get('_loadComplete')) {
    _this.set('isDownloading', false);
    _this.set('isDownloaded', true);
    if (document.hidden) {
      notifyOnDownloadComplete();
    }
}
````

Now our users will receive a system notification as soon as the episode is finished downloading, even if they have moved our app to the background. 

## Device Vibration

Let's make use of an additional API to vibrate a user's phone when they receive this notification. Using the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/Vibration), we can call `window.navigator.vibrate()` in our `notifyOnDownloadComplete()` function:

```javascript
function notifyOnDownloadComplete() {
  if ("Notification" in window) { // check that Notifications are supported in our browser
    var message = "Your podcast episode has finished downloading!";
    var downloadNotification = new Notification('Download Complete', { body: message });
    if ("vibrate" in navigator) { // check that vibrating is supported on our device
      window.navigator.vibrate(200); // vibrate the device once for 200ms
    }
  }
  else {
    console.log("Notifications are not supported in this browser.");
  }
}
````

Note that we did not specify any permissions in our app manifest in order to make use of the Vibration API. Some device APIs do not require specific permissions, and as long as we check for their available implementation through **feature detection**, we can be sure the functionality will work as expected.

## Feature Detection

Feature detection is a common practice for fine-tuning your application to adjust to its environment: the device it's running on, the browser it's being displayed in, etc. With so many devices and APIs that are constantly being improved and updated, there is a high probability you will run into problems getting your application to run smoothly in all environments.

Feature detection is the practice of determining if a particular feature is supported and how it is implemented, and subsequently providing the most efficient method of use for different environments. We have done very basic feature detection in our code examples above, when checking the `window` for the `Notifications` object and checking for a `vibrate` method on our `navigator` object.

Often times, feature detection can get more complex than this. Besides simply checking for the existence of an object, we might have to check for different implementations or methods that will change the way we use this object. For example, if we wanted to use the [GetUserMedia API](https://developer.mozilla.org/en-US/docs/NavigatorUserMedia.getUserMedia) to obtain video or audio from a user's device, we would need to check for several different prefixed versions of the `getUserMedia` object: 

```javascript
navigator.getUserMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
);
````

For more information on feature detection, see [need a resource for feature-dection explanation](#).

## Other APIs
So far, we've only introduced a fraction of the WebAPIs available for use. More information on working with these and other APIs can be found on [MDN's WebAPI page](https://developer.mozilla.org/en-US/docs/WebAPI). On this page, you'll notice different categories of APIs, including some that revolve around data management and storage. In the next chapter, we'll go over some of the common strategies for data maintenance and working offline.