export default (state = '', action) => {
  switch (action.type) {
    case 'RACE_DATA':
      return action.paragraph;
    default:
      return state
  }
}
