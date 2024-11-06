export const reducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_UNITS':
        return {
          ...state,
          units: state.units === 'f' ? 'c' : 'f' // toggle temperatures
        };  
      default: 
        return state; // return unchanged state by default
      }
  };