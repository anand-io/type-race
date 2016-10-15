export const awAppState = (state = {}, action) => {
  switch (action.type) {
    case 'APP_REGISTERED':
      return  {
        user: action.user,
      }
    case 'APP_CONTEXT_CHANGE':
      return {
         user: action.user,
         context: action.context,
      }
    case 'APP_ACTIVATED':
      return {
        user: action.user,
        context: action.context,
      }
    case 'APP_DEACTIVATED':
      return {
        user: action.user,
        context: action.context,
      }
    default:
      return state
  }
}

export const awAppActivated = (state = false, action) => {
  switch (action.type) {
    case 'APP_ACTIVATED':
      return true;
    case 'APP_DEACTIVATED':
      return false;
    default:
      return state
  }
}
