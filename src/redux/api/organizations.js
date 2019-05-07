import {
  GET_ALL_ORGANIZATIONS,
  GET_SINGLE_ORGANIZATION,
} from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const getAll = async () => {
  const response = await fetch(GET_ALL_ORGANIZATIONS());
  return response.json();
};

export const getSingle = async orgId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_SINGLE_ORGANIZATION(orgId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};
