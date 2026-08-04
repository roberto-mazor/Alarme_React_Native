import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Button } from './src/components/button';
import { agendarAlarme } from '@/components/services/notifications';
import { dispararVibracao } from '@/components/services/vibration';

export default function App() {
  const [horario, setHorario] = useState('');

  const lidarComAlarme = async () => {
    await Notifications.requestPermissionsAsync(); // Solicita as permissões do usuário antes de agendar

    // Converte o texto HH:mm em horas e minutos
    const [horas, minutos] = horario.split(':').map(Number);
    const data = new Date();
    data.setHours(horas, minutos, 0, 0);

    // Ajusta para amanhã se a hora já passou de hoje
    if (data.getTime() <= Date.now()) {
      data.setDate(data.getDate() + 1);
    }

    await agendarAlarme(data, horario);
    dispararVibracao();

    Alert.alert('Sucesso!', `Alarme agendado para ${horario}`);
    setHorario('');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Meu Alarme</Text>

      <TextInput
        style={estilos.input}
        placeholder="14:30"
        maxLength={5}
        value={horario}
        onChangeText={setHorario}
      />

      <Button titulo="Salvar Alarme" onPress={lidarComAlarme} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 50, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, fontSize: 20, textAlign: 'center', marginBottom: 15 },
});