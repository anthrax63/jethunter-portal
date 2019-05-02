import dispatchGraphQlRequest from '../helpers/dispatchGraphQlRequest';
import createFetchActions from '../helpers/createFetchActions';
import {toastr} from 'react-redux-toastr';


export const actions = createFetchActions('PROFILE_FILL_BROKER_INFO');

export default function fillBrokerInfo(variables) {
  const query = `mutation($firstName: String, $lastName: String, $description: String!, $company: String!, $jetmanId: String!) {
    fillBrokerInfo(firstName: $firstName, lastName: $lastName, description: $description, company: $company, jetmanId: $jetmanId) {
      firstName,
      lastName
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    const result = await dispatchGraphQlRequest(query, variables, actions, dispatch, {graphqlRequest, history});
    if (result) {
      toastr.success('Successfully saved!');
    }
  };
}
