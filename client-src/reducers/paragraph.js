export default (state = {}, action) => {
  switch (action.type) {
    case 'GAME_STARTED':
      return  {
        raw: action.paragraph,
        words: action.paragraph.split(' '),
      }
    default:
      return state
  }
}
