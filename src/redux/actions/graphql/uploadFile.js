import {handleError} from './helpers/errorHandler';

const actionPrefix = 'UPLOAD_FILE';
const actionList = [
  'start',
  'success',
  'error'
];
export const actions = {};
actionList.forEach((item) => {
  actions[item.toLowerCase()] = `${actionPrefix}_${item.toUpperCase()}`;
});

export default function uploadFile(file) {
  const query = `mutation($file: Upload!, $size: Int) {
    uploadFile(file: $file, size: $size) {
      id,
      name,
      size,
      link,
      readySize,
      ready
    }
  }`;
  return async (dispatch, getState, {multipartGraphqlRequest, history}) => {
    dispatch({type: actions.start, payload: {}});
    const response = await multipartGraphqlRequest(query, {size: file.size}, {file});
    if (response.errors) {
      dispatch({type: actions.error, payload: {errors: response.errors}});
      return handleError(response, {history});
    }
    dispatch({type: actions.success, payload: {...response.data}});
    return {...response.data.uploadFile};
  };
}
