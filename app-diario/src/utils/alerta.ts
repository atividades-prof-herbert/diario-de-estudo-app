import { Alert, Platform } from 'react-native';

export function mostrarAlerta(titulo: string, mensagem?: string) {
  if (Platform.OS === 'web') {
    window.alert([titulo, mensagem].filter(Boolean).join('\n'));
  } else {
    Alert.alert(titulo, mensagem);
  }
}
