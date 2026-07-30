import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configuração simples para exibir alerta quando o app estiver aberto
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

// Pedir permissão e criar o canal no Android
export const configurarCanalNotificacao = async (): Promise<void> => {
    await Notifications.requestPermissionsAsync();

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('alarm_channel', {
            name: 'Alarmes',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 500, 250, 500],
        });
    }
};

// Agenda o alarme recebendo diretamente hora e minuto
export const agendarAlarme = async (horas: number, minutos: number): Promise<void> => {
    const dataDisparo = new Date();
    dataDisparo.setHours(horas, minutos, 0, 0);

    // Se o horário já passou hoje, joga para amanhã
    if (dataDisparo.getTime() <= Date.now()) {
        dataDisparo.setDate(dataDisparo.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: '⏰ Hora do Alarme!',
            body: 'O horário programado chegou!',
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: dataDisparo,
            channelId: 'alarm_channel',
        },
    });
};