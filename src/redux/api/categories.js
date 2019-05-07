import { GET_ALL_CATEGORIES } from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const getAll = async () => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  // console.log('GET ALL CATEGORIES URL ', GET_ALL_CATEGORIES(parseInt(orgId)));
  const response = await fetch(GET_ALL_CATEGORIES(parseInt(orgId)), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};
