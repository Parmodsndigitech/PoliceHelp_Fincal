import React from 'react'
import Routes from './src/Routes/Routes'
import { Provider } from 'react-redux'
import { store } from './src/_helpers'
import { LogBox } from 'react-native'

const App = () => {


  LogBox.ignoreLogs(['warning']);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
export default App