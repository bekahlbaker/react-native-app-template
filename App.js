import React from 'react';
// Redux
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './src/redux/reducers';

// import AppContainer from './src/navigation/MainSwitchNavigator';

// const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
// // Create store here so there is not more than one store created
// export const store = createStoreWithMiddleWare();

// export default function App() {
//   return (
//     <Provider store={store}>

//       {/* <AppContainer /> */}
//     </Provider>
//   );
// }

import LaunchScreen from './src/screens/LaunchScreen';

export default function App() {
  return <LaunchScreen />;
}
