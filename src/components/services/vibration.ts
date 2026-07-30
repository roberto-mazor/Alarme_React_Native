import { Vibration } from 'react-native';

export const dispararVibracao = (): void => {
    Vibration.vibrate([0, 500, 250, 500]);
};