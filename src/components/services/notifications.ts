import * as Notifications from 'expo-notifications';

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

// Agendamento direto
export const agendarAlarme = async (dataDisparo: Date) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '⏰ Hora do Alarme!',
            body: 'O horário programado chegou!',
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: dataDisparo,
        },
    });
};