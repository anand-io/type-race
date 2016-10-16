import { storeAWUser, storeAWContext, appActivated, appDeactivated, registered } from '../actions';

function AwServices() {}

AwServices.prototype.init =
  function init(store) {

  const AwApp = AAFClient.init();

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

const instance = new AwServices();

export default instance;
