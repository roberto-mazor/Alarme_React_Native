import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface PropriedadesBotao extends TouchableOpacityProps {
    titulo: string;
}

export const Button: React.FC<PropriedadesBotao> = ({ titulo, ...resto }) => {
    return React.createElement(
        TouchableOpacity,
        {
            style: estilos.botao,
            activeOpacity: 0.7,
            ...resto,
        },
        React.createElement(Text, { style: estilos.texto }, titulo)
    );
};

const estilos = StyleSheet.create({
    botao: {
        width: '100%',
        height: 50,
        backgroundColor: '#2196F3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});