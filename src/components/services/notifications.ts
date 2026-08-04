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
export const agendarAlarme = async (dataDisparo: Date) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '⏰ Hora do Alarme!',
            body: 'O horário programado chegou!',
            sound: 'default',
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: dataDisparo,
            channelId: 'alarm_channel', // Vincula ao canal com som
        },
    });
};