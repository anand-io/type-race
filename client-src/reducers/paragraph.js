export default (state = {}, action) => {
  switch (action.type) {
    case 'RACE_DATA':
      return  {
        raw: action.paragraph,
        words: action.paragraph.split(' '),
      }
    default:
      return state
  }
}
