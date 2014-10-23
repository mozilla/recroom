# Rec Room Documentation

![Rec Room logo](images/recroom-logo.jpg?raw=true)


# Chapter 9: Data Management, Storage and Offline

Maintaining and storing application data was traditionally a heavy lift where the server took on much of the responsibility. With advancements in client-side JavaScript, and the rise of MVC frameworks, we've been better able to handle the implicit model data we encounter on the client-side.

We do, however, face some additional challenges in this area when developing for mobile devices. Mobile users are likely going to be travelling in and out of connected areas, which means we must have a solid strategy for handling offline data. In this chapter, we'll go over techniques for detecting connectivity and how to persist application data at appropriate times regardless of a user's connection.

## Offline First
Our empathy for offline users can be easily hampered by the high-speed internet we're likely connected to during development. To truly build with offline users in mind, develop your application as if it will never have an internet connection. See how your application looks on a device or in a simulator with wifi and cellular data turned off. It may be helpful to ask yourself the following questions while developing for offline use:

- What UI will the user see?
- What interactivity is still available to them?
- Will their actions offline be reflected next time they are reconnected?

### Detecting Connectivity
In order to gracefully handle the transitions between online and offline states, we must be able to determine the status of our user's connection.

While there are a number of tools available for detecting connectivity, some are unreliable or behave inconsistently across browsers. You may find it helpful to use a detection library such as [offline.js](http://github.hubspot.com/offline/docs/welcome/), which allows you to confirm the connection state and handle any events that occur when toggling between on and offline. This could mean updating data, or simply displaying more informative messaging. (i.e. if a significant part of your application does not work offline, you'll want to make sure to indicate that to your users.)

offline.js tests connectivity by making an XHR request to load a `/favicon.ico` file by default. You can configure the file it checks for by providing a different URL in `Offline.options`:

```javascript
Offline.options = {checks: {xhr: {url: '/connection-test'}}};
````

Once our connectivity check is configured, we can tell offline.js to detect the current state by calling `Offline.check()`. This will return an XHR response, and sets `Offline.state` to either `up` (if we are online) or `down` (if we are offline).

We can now get the user's state by asking for the value of `Offline.state`, and provide callbacks to execute during different stages of connectivity. offline.js provides several helpful events we can bind to for handling state changes. For example, if we want to display a notification to the user that they have gone offline, we can simply call:

```javascript
Offline.on('down', function() {
  var message = "Only podcasts which have been pre-downloaded are available.";
  var offlineNotification = new Notification('You Are Offline', { body: message });
});
````

### When to Save State
A solid, offline-first application will store its assets and data offline on its first load after installation. This will ensure that there are available resources for your app to pull from during subsequent uses when offline. When a connection is regained, the application should synchronize any data and update available assets.

During app usage, it is a good idea to periodically save the user's state to your offline data store. Additionally, you will want to save the state whenever a user closes your application so they can pick up where they left off. This can be achieved by leveraging some of the client-side storage technologies available to us.

## Client-Side Storage
A main goal of offline technologies is to seamlessly store and sync data regardless of internet connectivity. When implementing this functionality, you're likely to notice that offline techniques also benefit other aspects of your application.

For instance, the load on the server is lessened, making your app more responsive and better equipped to handle a robust user experience. Additionally, potential security risks are alleviated as our need to rely on technologies such as cookies and http diminishes.

Below are some of the most common techniques for successful data management in offline circumstances. Rec Room apps specifically make use of [IndexedDB][indexed-db] and [Ember Data][ember-data], but we'll also touch on other popular tools.

### IndexedDB
[IndexedDB][indexed-db] provides client-side storage of structured data, which means we can persistently store large amounts of data inside a user's browser. It is currently the underlying persistence mechanism in Rec Room apps, and is gaining momentum to become the standard driver for client-side storage.

Rec Room apps utilize additional libraries (explained later in this chapter) that abstract the IndexedDB implementation, but using IndexedDB on it's own is fairly simple. Let's walk through a quick implementation using our High Fidelity app from Chapter 4 as an example.

First you must request to open a database:

```javascript
var request = indexedDB.open("hifi"); // open database named "hifi"
````

Making requests (as we just did to open a database) is a key concept of IndexedDB. IndexedDB is transactional, meaning rather than directly storing or receiving values from the database, we are requesting that a database operation occurs. This helps prevent multiple data modifications from overriding each other.

When you create a new database, an `onupgradeneeded` event will be triggered. In the handler for this event, we can create **object stores** for our application models. Think of object stores as IndexedDB's equivalent of tables in relational databases.

In our High Fidelity app, we'll want to create an object store for our `podcast` model. With this object store, we will be able to create records of data for each of our podcasts, and persist them to the database as regular JavaScript objects:

```javascript
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our podcasts.
  // We're going to use "rssURL" as our unique key path.
  var objectStore = db.createObjectStore("podcasts", { keyPath: "rssURL" });
};
````

We now have a place to store all of our podcast data, but we'll also want to query this data. With IndexedDB, we can add an **index** to our object store which will make it efficient to query and iterate across.  In the same `onupgradeneeded` handler, we can add an index like so:

```javascript
// Create an index to search podcasts by title. We will set unique
// to false, in case there happen to be podcasts by the same name.
objectStore.createIndex("title", "title", { unique: false });
````

So far we've requested that a podcasts object store be created, and we've requested an index to search it. These interactions are happening as **transactions** - operations for accessing or modifying data in the database. We must wait for these transactions to be completed before we can add data to our object store. In other words, we need to make sure the object store has, in fact, been created.

IndexedDB provides a `transaction.oncomplete` event handler that will be called when our object store is ready to accept data:

```javascript
objectStore.transaction.oncomplete = function(event) {
  // Store values in our podcasts object store
  var podcastObjectStore = db.transaction("podcasts", "readwrite").objectStore("podcasts");
  for (var i in podcastData) {
    podcastObjectStore.add(podcastData[i]);
  }
}
````

Now that we have data in our object store, we can retrieve it by calling `get()` on our object store, where we provide a value for the keyPath we specified earlier (`rssUrl`):

```javascript
// create a new transaction, specifying a list of object stores we will need access to
var transaction = db.transaction(["podcasts"]);

// get the podcasts object store from our transaction
var objectStore = transaction.objectStore("podcasts");

// get a podcast with an rssUrl of rss.url.com/podcast-title
var request = objectStore.get("rss.url.com/podcast-title");

// handle requested data when it is available
request.onsuccess = function(event) {
  // We are provided with request.result in our onsuccess callback,
  // which gives us access to the property values on our data record
  console.log("Podcast title is: " + request.result.title);
};
````

For more information on how to work with IndexedDB, see [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) and [Basic Concepts of IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB#gloss_transaction). There is also a simple [tutorial](http://www.html5rocks.com/en/tutorials/indexeddb/todo/) on [HTML5Rocks](http://www.html5rocks.com) by Paul Kinlan that walks through basic usage of IndexedDB.

IndexedDB is still new and thus may not work consistently across all browsers. The next technology we'll go over, localForage, will help wrangle these compatibility issues. For updated information on support for IndexedDB, check [Can I Use IndexedDB](http://caniuse.com/#feat=indexeddb).


### LocalForage
[localForage][local-forage] is a JavaScript library that provides a localStorage-like API for interacting with a number of underlying storage technologies.

As mentioned in the previous section, IndexedDB is not consistently supported across all browsers. localForage smooths over these types of inconsistencies for the user by implementing fallbacks when a backend driver for the datastore (such as IndexedDB) is not available. By default, localForage will select drivers in this order:

1. IndexedDB
2. WebSQL
3. localStorage

With browser compatibility issues out of your way, you're free to focus on storing and retrieving your application data.

The API for localForage is asynchronous: instead of our data being delivered through return values, it will be sent to a defined callback. With this implementation, setting and getting data with localforage will look like this:

```javascript
// Set an item and specify a callback
localforage.setItem('key', 'value', callbackYouDefine);

// Get an item and log the value to the console
localforage.getItem('key', function(value) {
  console.log('Retrieved value is: ' + value);
})
````

You can also use promises rather than callbacks if you prefer. More documentation is available [here](http://mozilla.github.io/localForage/).


### Ember Data
In Chapters 1 and 2 we briefly discussed the [Ember.js](http://emberjs.com/) framework that Rec Room uses to help structure your application. One of the many gains we get from using Ember is a solid separation of concerns.  Ember conventions make it easy to keep your model data separate from other parts of the application, allowing for greater flexibility as you iterate on your app.

The Ember team has also introduced the [Ember Data][ember-data] library, which will help us manage data for the models in our application after they are defined.

#### Defining Models
In our High Fidelity app from Chapter 4, we work with two different models: podcasts and episodes. Let's look at the `podcast` model defined in `/app/scripts/models/podcast_model.js`:

```javascript
HighFidelity.Podcast = DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    episodes: DS.hasMany('episode'),
    rssURL: DS.attr('string'),
});
````

Here we are defining our schema and setting up relationships for our model. We declare new attributes on our model with `DS.attr('type')`, where `type` is the value's expected data type. 

Ember Data also provides several relationship types to help you describe how your models associate with one another. In this scenario, we are defining a one-to-many relationship, where a single `podcast` has many `episodes`:
  
```javascript
episodes: DS.hasMany('episode') // a podcast model has many episodes
````

#### Persisting Data
As mentioned earlier in this chapter, IndexedDB is the underlying persistence mechanism in Rec Room apps. Ember Data is not tied to IndexedDB by default, (it is agnostic to underlying technologies), so we have included the npm package [ember-indexeddb-adapter](https://github.com/kurko/ember-indexeddb-adapter/) to help persist our data. The adapter abstracts the way we work with IndexedDB, but the underlying concepts are the same:

```javascript
HighFidelity.ApplicationSerializer = DS.IndexedDBSerializer.extend();
HighFidelity.ApplicationAdapter = DS.IndexedDBAdapter.extend({
    databaseName: 'hifi', // create a database named hifi
    version: 1, // specify a version for the db
    migrations: function() { // add or update object stores for app models
        this.addModel('podcast');
        this.addModel('episode');
    }
});
````

In this example, we've created a database named `hifi`, and added our IndexedDB object stores in the `migrations` method. Whenever you update your database schema, you will also need to bump the version property so IndexedDB is aware there are changes to be made.

By default, the `keyPath` for object stores is `id`. We can configure this by explicitly passing in a custom `keyPath` when we add our models:

```javascript
this.addModel('podcast', { keyPath: 'rssUrl' });
````

#### Querying Data
Any query against our database will return a promise that resolves to the requested dataset:

```javascript
// resolves to the collection of podcast records:
this.store.find('podcast');

// resolves to a single podcast record matching the rssUrl value provided:
this.store.find('podcast', params.rssUrl);
````



For more guidance on offline development, see our [Offline apps developer recommendations page](https://developer.mozilla.org/en-US/Apps/Build/Offline).


[indexed-db]: https://www.google.com/url?q=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FIndexedDB&sa=D&sntz=1&usg=AFQjCNHuwdSJ3rzZYhJSoAA6UrMuLW0Bvg
[local-forage]: https://github.com/mozilla/localForage
[ember-data]: https://github.com/emberjs/data

