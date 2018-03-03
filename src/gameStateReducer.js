export default function gameStateReducer(state = {}, action) {
  switch (action.type) {
    case 'START_NEW_GAME':
      return {
        ...state,
        puzzles: action.puzzles
      }
    case 'GAME_TURN':
      return {
        ...state,
        puzzles: action.puzzles
      }
    default:
      return state;
  }
}

