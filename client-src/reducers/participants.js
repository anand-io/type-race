const participant = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return {
        id: action.id,
        name: action.name,
        wpm: 0,
        noOfCharacters: 0,
        finishRace: false,
        place: 0,
      }
    case 'PARTICIPANT_READY':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        ready: true
      });
    case 'PARTICIPANT_WPM':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        wpm: action.wpm,
        noOfCharacters: action.noOfCharacters,
        isFinished: action.isFinished,
        position: action.position,
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
      ];
    case 'PARTICIPANT_READY':
      return state.map(p =>
        participant(p, action)
      );
    case 'PARTICIPANT_WPM':
      return state.map(p =>
        participant(p, action)
      );
    case 'RACE_OVER':
      return [];
    default:
      return state
  }
}

export default participants;
