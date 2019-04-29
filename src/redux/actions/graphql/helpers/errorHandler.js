import {AuthorizationError, InvalidLoginOrPasswordError} from '../constants/errors';
import {toastr} from 'react-redux-toastr';


export function handleError(response, {history}) {
  if (response.errors) {
    for (let i = 0; i < response.errors.length; i++) {
      const error = response.errors[i];
      if (error.code === AuthorizationError.code) {
        console.log('auth error', history, error.code, AuthorizationError.code);
        history.replace('/signin');
        /* const location = history.location;
        const currentUrl = `${location.pathname || ''}${location.search || ''}` || '/';
        const newUrl = `/signin?redirectUrl=${currentUrl}`;
        history.location.href = newUrl; */
      } else if (error.code === InvalidLoginOrPasswordError.code) {
        toastr.error('Invalid login or password');
      } else {
        toastr.error(error.message);
      }
    }
  }
}
