export function createInitState() {
  return {
    loaded: false,
    loading: false,
    data: null
  };
}

export function createFetchReducer(initState, actions) {
  return (state = initState, action) => {
    switch (action.type) {
    case actions.start:
      return {
        ...state,
        loaded: false,
        data: null,
        loading: true
      };
      case actions.success:
      return {
        ...state,
        loaded: true,
        loading: false,
        data: {...action.payload.result}
      };
    case actions.error:
      return {
        ...state,
        loaded: false,
        loading: false
      };
    default:
      return {...state};
    }
  };
}
