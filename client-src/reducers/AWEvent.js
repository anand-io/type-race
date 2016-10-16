export const isAW = (state = false, action) => {
  switch (action.type) {
    case 'IS_AW':
      return  action.value;
    default:
      return state
  }
}

export const awContext = (state = {}, action) => {
  switch (action.type) {
    case 'AW_CONTEXT':
      return  action.context;
    default:
      return state
  }
}

export const awUser = (state = {}, action) => {
  switch (action.type) {
    case 'AW_USER':
      return  action.user;
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
