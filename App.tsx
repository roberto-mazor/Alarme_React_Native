import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configuração do comportamento da notificação quando o app está aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App(): React.JSX.Element {
  // Estado para armazenar o texto digitado pelo usuário (Ex: "08:30")
  const [timeInput, setTimeInput] = useState<string>('');

  useEffect(() => {
    // Solicita permissões e configura o canal do Android ao abrir o app
    async function requestPermissions(): Promise<void> {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Ative as notificações para receber os alarmes.');
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('alarm_channel', {
          name: 'Alarmes',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 500, 250, 500],
          sound: 'default',
        });
      }
    }

    requestPermissions();
  }, []);

  // Função para agendar o alarme a partir do texto digitado
  async function scheduleAlarm(): Promise<void> {
    // Validação básica do formato HH:mm via Expressão Regular
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(timeInput)) {
      Alert.alert('Formato Inválido', 'Por favor, digite o horário no formato HH:mm (Ex: 14:30).');
      return;
    }

    // Separa as horas e minutos do texto digitado
    const [hours, minutes] = timeInput.split(':').map(Number);

    // Cria a data do alarme baseada no dia atual com as horas/minutos digitados
    const now = new Date();
    const triggerTime = new Date();
    triggerTime.setHours(hours, minutes, 0, 0);

    // Se o horário digitado já passou no dia de hoje, ajusta para amanhã
    if (triggerTime.getTime() <= now.getTime()) {
      triggerTime.setDate(triggerTime.getDate() + 1);
    }

    // Agenda a notificação no Expo
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Hora do Alarme!',
        body: `Seu alarme programado para as ${timeInput} chegou!`,
        sound: 'default',
        vibrate: [0, 500, 250, 500],
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerTime,
        channelId: 'alarm_channel',
      },
    });

    Alert.alert(
      'Alarme Agendado!',
      `Notificação configurada para: ${triggerTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo de Alarme</Text>

      <Text style={styles.label}>Digite o horário (HH:mm):</Text>

      <TextInput
        style={styles.input}
        placeholder="14:30"
        keyboardType="numbers-and-punctuation"
        maxLength={5}
        value={timeInput}
        onChangeText={setTimeInput}
      />

      <Button title="Definir Alarme" color="#2196F3" onPress={scheduleAlarm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '60%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});