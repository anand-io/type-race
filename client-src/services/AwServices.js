function AwServices() {}

AwServices.prototype.init =
  function init(appRegistered, appContextChange, appActivated, appDeactivated) {

  const AwApp = AAFClient.init();

  AwApp.on('registered', ({user}) => {
    console.error(`registered : ${JSON.stringify(data)}`);
    AppRegistered(user);
  });

  AwApp.on('activated', ({user, context}) => {
    console.error(`activated : ${JSON.stringify(data)}`);
    AppContextChange(user, context);
  })

  AwApp.on('context-change', ({user, context}) => {
    console.error(`context-change : ${JSON.stringify(data)}`);
    AppActivated(user, context);
  });

  AwApp.on('deactivated', data => {
    console.error(`deactivated : ${JSON.stringify(data)}`);
    AppDeactivated();
  });
}

const instance = new AwServices();

export default instance;
