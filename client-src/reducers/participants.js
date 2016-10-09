const participant = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return {
        id: action.id,
        name: action.name,
      }
    case 'PARTICIPANT_READY':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        ready: true
      });
    default:
      return state
  }
}

const participants = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return [
        ...state,
        participant(undefined, action),
      ]
    case 'PARTICIPANT_READY':
      return state.map(p =>
        participant(p, action)
      )
    default:
      return state
  }
}

export default participants;
