function AwServices() {}

AwServices.prototype.init =
  function init(appRegistered, appContextChange, appActivated, appDeactivated) {

  const AwApp = AAFClient.init();

  AwApp.on('registered', ({user}) => {
    console.error(`registered : ${JSON.stringify(data)}`);
    appRegistered(user);
  });

  AwApp.on('activated', ({user, context}) => {
    console.error(`activated : ${JSON.stringify(data)}`);
    appContextChange(user, context);
  })

  AwApp.on('context-change', ({user, context}) => {
    console.error(`context-change : ${JSON.stringify(data)}`);
    appActivated(user, context);
  });

  AwApp.on('deactivated', data => {
    console.error(`deactivated : ${JSON.stringify(data)}`);
    appDeactivated();
  });
}

AwServices.prototype.postFeeds = function postFeeds() {
  console.log('posting feed');
}

const instance = new AwServices();

export default instance;
