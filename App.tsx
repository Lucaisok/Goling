import React from 'react';
import UserVerification from './src/components/UserVerification';
import AppNavigator from './src/navigation/AppNavigator';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/store';

const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  return (
    <>
      {isLoggedIn ? <AppNavigator /> : <UserVerification />}
    </>
  );
};

export default App;
