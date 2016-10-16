import { storeAWUser, storeAWContext, appActivated, appDeactivated, registered } from '../actions';

function AwServices() {}

AwServices.prototype.init =
  function init(store) {

  const AwApp = AAFClient.init();
  this.app = AwApp;
  AwApp.on('registered', ({user}) => {
    console.error(`registered : ${JSON.stringify(user)}`);
    store.dispatch(registered(user));
  });

  AwApp.on('activated', ({user, context}) => {
    console.error(`activated : ${JSON.stringify(context)}`);
    // store.dispatch(storeAWUser(user));
    store.dispatch(storeAWContext(context));
    store.dispatch(appActivated());
  })

  AwApp.on('context-change', ({user, context}) => {
    console.error(`context-change : ${JSON.stringify(context)}`);
    // store.dispatch(storeAWUser(user));
    store.dispatch(storeAWContext(context));
  });

  AwApp.on('deactivated', data => {
    console.error(`deactivated : ${JSON.stringify(data)}`);
    store.dispatch(appDeactivated());
  });
}

AwServices.prototype.showIndicator = function showIndicator(id) {
  this.app.postMessage( 'showIndicator', { id });
}

AwServices.prototype.showNotification = function showNotification(id, name) {
  this.app.postMessage( 'showNotification', { id,
      title :  `Typerace Challenge from ${name}`,
      message: "Click the typerace widget to react",
  });
};

// app.postMessage( 'showCount', {
//     'count': 10,
//     'id' : "ac2324ff-747b-4921-8ff8-d0f256bb5aea"
// });

const instance = new AwServices();

export default instance;
