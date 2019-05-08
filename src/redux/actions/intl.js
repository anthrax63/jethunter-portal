export const actions = {SET_LOCALE: 'SET_LOCALE'};


export function setLocale(locale) {
  return async (dispatch) => {
    dispatch({type: actions.SET_LOCALE, payload: {locale}});
    localStorage.setItem('locale', locale);
  };
}
