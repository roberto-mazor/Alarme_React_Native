import { Vibration, Platform } from 'react-native';

export const dispararVibracao = (): void => {
    if (Platform.OS === 'android') {
        // Padrão de vibração: [espera, vibra, espera, vibra] em milissegundos
        Vibration.vibrate([0, 500, 250, 500]);
    } else {
        Vibration.vibrate();
    }
};