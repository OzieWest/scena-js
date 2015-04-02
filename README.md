### scena-js
Something like actors or agents, who knows?

Highly inspired by homeless actor

### usage
```javascript
var Scene = require('actors').Scene;
var myScene = new Scene();
```

```javascript
// register one handler
function handler(message) {
  console.log('handler: ' + message);
}
myScene.createActor('good_actor', handler);

// somewhere
myScene.act('good_actor', 'Hello world!');
// handler: 'Hello world!'
```

```javascript
// register Array of handlers
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
