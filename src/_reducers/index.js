import { combineReducers } from 'redux';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['users','cart']
};

const rootReducer = combineReducers({
 
  users:persistReducer(persistConfig, users),
  alert,
});

export default rootReducer;
