import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function ToastNotification({ visible, message, onDismiss }) {
  const animation = new Animated.Value(-100); // Valor inicial da animação, fora da tela

  useEffect(() => {
    if (visible) {
      // Animação de descer
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Voltar para cima após 3 segundos
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }).start(onDismiss);
      }, 3000);
    }
  }, [visible, animation, onDismiss]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast, { transform: [{ translateY: animation }] }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 128, 0, 0.9)',
    padding: 15,
    zIndex: 1000,
  },
  message: {
    color: '#fff',
    textAlign: 'center',
  },
});
