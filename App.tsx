import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { configurarCanalNotificacao, agendarAlarme } from '@/components/services/notifications';
import { dispararVibracao } from '@/components/services/vibration';

export default function App(): React.JSX.Element {
  const [horario, setHorario] = useState<string>('');

  useEffect(() => {
    configurarCanalNotificacao();
  }, []);

  const lidarComAlarme = async (): Promise<void> => {
    if (!horario.includes(':')) {
      Alert.alert('Erro', 'Digite no formato 14:30');
      return;
    }

    const [horas, minutos] = horario.split(':').map(Number);

    await agendarAlarme(horas, minutos);
    dispararVibracao();

    Alert.alert('Sucesso!', `Alarme programado para às ${horario}`);
    setHorario('');
  };

  return React.createElement(
    View,
    { style: estilos.container },
    React.createElement(Text, { style: estilos.titulo }, 'Meu Alarme'),
    React.createElement(TextInput, {
      style: estilos.input,
      placeholder: '14:30',
      keyboardType: 'numbers-and-punctuation',
      maxLength: 5,
      value: horario,
      onChangeText: setHorario,
    }),
    React.createElement(Button as any, { title: 'Salvar Alarme', onPress: lidarComAlarme })
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
});