## MagicWallet
The application is developed with React/Flow/Immutable/flow-immutable-models. I choose to not use Redux because I tried to not copy and paste from a Rect/Redux tutorial but put something mine in the project. Nothing against copy and paste from a tutorial if you understand what you are doing, but this is a test about me so I preferred to use an approach where was possible be more creative.

Just to make clear that I have nothing against Redux and that I'm not trying to reinvent the wheel.

I spent more time on the architecture and the architecture’s implementation than in the style and the user experience because I think that is better start from a solid base and then think about the UI.

## Architecture:

The application is composed by:
1. A model
    1. It contains the whole state of the app. It is an immutable map. It can and should be statically checked by Flow.
2. An updater
    1. Is the only function that should be allowed to touch the model. It accept a `model` and a `message` and it return `(HTML | (model, message))`  `message` type must be `Message` and it contain an `action` and a `payload`, all the messages are statically checked .`update` pattern match `message.action` to find the function that should be used to update the model.  The model recursively calls himself via `render` and it returns HTML when `message.type == 'None'` . A call to `update` should always reach a `message.type = None` this could and should be statically checked[TODO]. 
3. A render
    1. `render` should be the only place where side effects are allowed it initialize the app it renders the HTML it persist the `model`.
4. A view
    1. `view` is done with React it take a `model` that should be `Model` and it create the HTML. `view` always must not contain a single bit of the app's state. So if we have a `model` of the app at time x we’ll be always capable of rebuilding the HTML at time x. The `view` also know nothing about `model` and interact with `model` only via `messages`
5. The messages
    1. `messages` are type of `Messages` that is `{type: Action, payload: mixed}` the action are the only way to the HTML to interact with the `model` every change that we can do at the `model` is declared as an action (to be more declarative possible) the `updater` is where the action are implemented as pure endofunctions from Model to Model

With this kind of architecture you have three advantage:
1. is difficult to have runtime error because all the type are statically checked by Flow
2. your model is defined in just one place, you do not have pieces of state sparse across your application
3. the model can be changed just via Messages so with initialModel and [message0, message1, …, messageN] you can always compute modelN and you can observe your model at each step this could be good for debug

Manage side effects to update the model (maybe we could need to fetch data from the server) is not a goal but it is a goal build an application that can easily grow and scale. So thinking about the architecture I also take into consideration how this kind of functions could be implemented in the actual model. An easy solution could be, to use Maybe types.

Asynchronicity: with this architecture, the messages has to be applied synchronously. If `updater(updater(model, message1). message2) is === to updater(updater(model, message2). message1)` should be figured out by the compiler or by a lower level. Better understand this point is a TODO.

DISCLAIMER
This is actual a very naive implementations of the elm architecture. I hardly try to figure out if this code could be reused in the real world. But I did not actually find any good reason to do that instead of use elm or a well tested js library. For that, I can say that the only purpose of this project is just the one of doing the test.

## Implementation

### Why React:
It was a requirement and it is a natural choice to implement `view`

### Why Immutable:
We use immutable data because enforce the fact that no one should be allowed to change the `model` but `update`. Immutable.js has been choose because is largely used and there is a lot of documentation.

### Why Flow
Flow.js has been chosen for the same reason of immutable.js

### Why flow-immutable-models
If we can not have a type for the model is actually completely useless to have the code typed for the other things. Unfortunately, flow is not able to check the elements of an immutable map. To do that has been chosen flow-immutable-models as a non-temporary solution. The important thing was to build the app around a typed model. Is a TODO check if flow-immutable-models can be adopted as a definitive solution or if we should use something other. This project has at the moment three open issues with flow-immutable-:
1. is not possible to have a fast way to serialize the model in a string [ref](https://github.com/pbomb/flow-immutable-models/issues/15#issuecomment-293143095)
2. we need to have automatically generated code in the codebase:  I would prefer to keep all the automatically generated code out of the repo
3. webpack has a problem to import flow-immutable-models

### Why localStorage
the test is on the front end so it was completely useless to spend time figuring out how the backend could be architected and implemented. Save the model is quite slow because of import flow-immutable-models but I think that the best way to deal with the performance issues is to think at that when you actually have one.

### Why there is no routing
The app as in the spec has just one view and build a routing system would be a completely waste of time. Of course, it was said that the app may grow in the future so was natural let the door open to a routing system. Parsing the URL and defining `location` in the model and having an initial view that pattern match `location` and render the right page is a good and well know pattern.

### Why side effects action are not well supported
no need to have any update that requires side effect functions

## Issues:
## TODO:
1. UI pagination for long transactions list
2. UI pay and receive forms that work better on mobile
3. mkdir src View and split View.js into separate files
4. Better enforce the architectures rules (like update should always end with a view)
5. Helper functions to make the code less verbose and more DRY
