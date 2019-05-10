import dispatchGraphQlRequest from '../helpers/dispatchGraphQlRequest';
import createFetchActions from '../helpers/createFetchActions';


export const actions = createFetchActions('PROFILE_FILL_BROKER_INFO');

export default function fillBrokerInfo(variables) {
  const query = `mutation(
      $firstName: String, 
      $lastName: String, 
      $description: String!, 
      $company: String!, 
      $jetmanId: String!,       
      $twitter: String, 
      $facebook: String, 
      $telegram: String, 
      $whatsapp: String, 
      $phoneNumber: String, 
      $photo: ID!
    ) {
    fillBrokerInfo(
      firstName: $firstName, 
      lastName: $lastName, 
      description: $description, 
      company: $company, 
      jetmanId: $jetmanId, 
      photo: $photo,
      twitter: $twitter,
      facebook: $facebook,
      telegram: $telegram,
      whatsapp: $whatsapp,
      phoneNumber: $phoneNumber
    ) {
      firstName,
      lastName
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    const vars = {...variables};
    if (vars.photo && vars.photo.id) {
      vars.photo = vars.photo.id;
    }
    return await dispatchGraphQlRequest(query, vars, actions, dispatch, {graphqlRequest, history});
  };
}
