import { Alert, Platform } from 'react-native';

export function mostrarAlerta(titulo: string, mensagem?: string) {
  if (Platform.OS === 'web') {
    window.alert([titulo, mensagem].filter(Boolean).join('\n'));
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export function confirmarAlerta(titulo: string, mensagem: string, onConfirmar: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm([titulo, mensagem].join('\n'))) {
      onConfirmar();
    }
  } else {
    Alert.alert(titulo, mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', style: 'destructive', onPress: onConfirmar },
    ]);
  }
}
