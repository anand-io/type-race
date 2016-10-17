import { storeAWUser, storeAWContext, appActivated, appDeactivated, registered,
contextChanged } from '../actions';

function AwServices() {}

AwServices.prototype.init =
  function init(store) {

  const AwApp = AAFClient.init();
  this.app = AwApp;
  AwApp.on('registered', ({user}) => {
    console.info(`registered : ${JSON.stringify(user)}`);
    store.dispatch(registered(user));
  });

  AwApp.on('activated', ({user, context}) => {
    console.info(`activated : ${JSON.stringify(context)}`);
    // store.dispatch(storeAWUser(user));
    store.dispatch(contextChanged(context));
    store.dispatch(appActivated());
  })

  AwApp.on('context-change', ({user, context}) => {
    console.info(`context-change : ${JSON.stringify(context)}`);
    // store.dispatch(storeAWUser(user));
    store.dispatch(contextChanged(context));
  });

  AwApp.on('deactivated', data => {
    console.info(`deactivated : ${JSON.stringify(data)}`);
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

AwServices.prototype.postFeeds = function postFeeds() {
  console.log('posting feed');
}

const instance = new AwServices();

export default instance;
