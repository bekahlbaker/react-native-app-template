// Add auth token to all authorization headers
import { GET_ALL_RESOURCES } from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const getAll = async () => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_ALL_RESOURCES(parseInt(orgId)), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};
