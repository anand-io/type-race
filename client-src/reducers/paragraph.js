export default (state = '', action) => {
  switch (action.type) {
    case 'GAME_STARTED':
      return action.paragraph;
    default:
      return state
  }
}
