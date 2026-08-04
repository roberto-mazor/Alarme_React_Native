import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '@/components/button';
import { agendarAlarme } from '@/components/services/notifications';
import { dispararVibracao } from '@/components/services/vibration';

export default function App() {
  const [horario, setHorario] = useState('');

  // Garante a criação do canal assim que o aplicativo abre

  const lidarComAlarme = async () => {
    const [horas, minutos] = horario.split(':').map(Number);
    const data = new Date();
    data.setHours(horas, minutos, 0, 0);

    if (data.getTime() <= Date.now()) {
      data.setDate(data.getDate() + 1);
    }

    await agendarAlarme(data);
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
        keyboardType="numeric" // Teclado numérico apenas
        maxLength={5}          // Limita ao formato HH:mm (5 caracteres)
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