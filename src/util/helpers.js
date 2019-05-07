import { StackActions, NavigationActions } from 'react-navigation';
import SInfo from 'react-native-sensitive-info';

export function resetStack(navigation, routeName, delay) {
  setTimeout(() => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName })],
    });
    navigation.dispatch(resetAction);
  }, delay);
}

export function truncateText(string, length) {
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }
  return string;
}

export function saveInfo(authToken, password, email, defaultOrgId) {
  SInfo.setItem('authToken', authToken, {});
  SInfo.setItem('password', password, {});
  SInfo.setItem('email', email, {});
  SInfo.setItem('defaultOrgId', defaultOrgId, {});
}

export function saveDeviceInfo(deviceId, deviceToken) {
  SInfo.setItem('deviceId', `${deviceId}`, {});
  SInfo.setItem('deviceToken', deviceToken, {});
  SInfo.setItem('hasPostedDeviceToken', deviceToken, {});
}
