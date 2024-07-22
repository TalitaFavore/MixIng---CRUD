import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


function SplashScreen({ navigation }) {
  const goToCadastro = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>MixIng</Text>
      <View style={styles.imagemContainer}>
        <Image
          style={styles.imagem}
          source={require('../../assets/logoProjeto.png')}
        />
      </View>
      <Text style={styles.bordao}>Descubra, filtre, aproveite</Text>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={goToCadastro}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
  },
  bordao: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Quicksand',
    marginTop: 20,
  },
  imagemContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imagem: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Quicksand',
  },
});

export default SplashScreen;
