import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { dispararVibracao } from './vibration';

// Configuração básica de exibição
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

// Agendamento
export const agendarAlarme = (dataDisparo: Date, horarioTexto: string) => {
    const agora = new Date().getTime();
    const tempoEspera = dataDisparo.getTime() - agora;

    // Agendamento
    setTimeout(() => {
        dispararVibracao();
        Alert.alert('⏰ Hora do Alarme!', `Seu alarme de ${horarioTexto} chegou!`);
    }, tempoEspera);
};