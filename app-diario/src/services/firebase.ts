import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
// @ts-ignore getReactNativePersistence existe no build nativo do SDK, mas não está tipado no pacote "firebase/auth"
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAxAEtPrmmeYnf529OgXdgEQPweyHxsZXc',
  authDomain: 'diario-de-estudo.firebaseapp.com',
  projectId: 'diario-de-estudo',
  storageBucket: 'diario-de-estudo.firebasestorage.app',
  messagingSenderId: '297886219841',
  appId: '1:297886219841:web:32ef89a5b9f8b139b890c0',
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });

// Na web, getAuth já persiste a sessão sozinho (localStorage do navegador).
// No app nativo (iOS/Android), é preciso dizer explicitamente onde guardar
// a sessão, senão ela fica só em memória e some ao fechar o app.
export const auth: Auth = Platform.OS === 'web'
  ? getAuth(app)
  : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
