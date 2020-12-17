import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to AsyncStorage for react-native
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers/root';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

//persistor.purge(); // USE ON DEVELOPMENT TO CLEAR PERSISTED STATE

export {store, persistor};
