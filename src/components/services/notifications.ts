import * as Notifications from 'expo-notifications'
import { Platform, Alert } from 'react-native'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowList: true,
        shouldShowBanner: true,
        shouldSetBadge: false,
        shouldShowAlert: true
    })
})

export const configurarCanalNoticacao = async (): Promise<void> => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Ative as notificações para receber o alarme.');
    }
}

export const agendarAlarme = async (horarioTexto: string): Promise<boolean> => {
    const expressaoRegularHorario = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return false;
}

const [horas, minutos] = horarioTexto.split(':').map(number);
const horaAtual = new Date();
const dataDisparo = new Date();
dataDisparo.setHours(horas, minutos, 0, 0);

if (dataDisparo.scheduleNotificationAsync({
    content: {
        title: ' Hora do Alarme',
        body: `Seu Alarme programado para as ${horarioTexto} chegou!`,
        vibrate: [0, 500, 250, 500],
    },
    trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: dataDisparo,
        channelId: 'alarm_channel',
    },
}))