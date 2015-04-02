## scena-js
Something like actors or agents, who knows?

Highly inspired by homeless actor

## usage

##### create scene
```javascript
var Scene = require('actors').Scene;
var myScene = new Scene();
```

#### fire and forget

##### register one handler
```javascript
function handler(message) {
  console.log('handler: ' + message);
}
myScene.createActor('good_actor', handler);

// somewhere
myScene.act('good_actor', 'Hello world!');
// handler: 'Hello world!'
```

##### register Array of handlers
```javascript
function handler1(message) {
  console.log('handler1: ' + message);
}
function handler2(message) {
  console.log('handler2: ' + message);
}
var handlers = [handler1, handler2];
myScene.createActor('good_actor', handlers);

// somewhere
myScene.act('good_actor', 'Hello world!');
// handler1: 'Hello world!'
// handler2: 'Hello world!'
```

#### async calls

##### register one handler
```javascript
function handler(message, callback) {
	console.log('handler: ' + message);
	callback(null, true);
}

myScene.createActor('good_actor', handler);

// somewhere
myScene.act('good_actor', {}, function (err, result) {
	console.log('err: ', err);
	// null
	console.log('result: ', result);
	// true
});
```

##### register Array of handlers
```javascript
function handler1(message, callback) {
	console.log('handler1: ' + message);
	callback(null, 1);
}

function handler2(message, callback) {
	console.log('handler2: ' + message);
	callback(null, 2);
}

var handlers = [handler1, handler2];

myScene.createActor('good_actor', handlers);

// somewhere
myScene.act('good_actor', {}, function (err, result) {
	console.log('err: ', err);
	// null
	console.log('result: ', result);
	// [1, 2]
});
```