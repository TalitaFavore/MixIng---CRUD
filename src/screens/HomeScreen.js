import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao MixIng!</Text>
      <Text style={styles.description}>
        O MixIng é um app de filtragem de ingredientes para garantir segurança e
        praticidade na hora de fazer as compras. O app é para quem tem alergia
        alimentar, alergia a algum cosmético, para quem tem alguma restrição
        alimentar, para quem segue a dieta vegana, ou simplesmente quer filtrar
        os alimentos e cosméticos que consome.
      </Text>
      <Image
        source={require('../../assets/mercado.jpg')}  // Caminho da imagem
        style={styles.image}                    // Estilo da imagem
        resizeMode="contain"                    // Modo de redimensionamento
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16, // Margem horizontal interna
    paddingVertical: 24,   // Margem vertical interna
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12, // Margem inferior para separar do próximo texto
  },
  description: {
    fontSize: 16,
    textAlign: "center", // Alinhar o texto ao centro
    marginTop: 12,       // Margem superior para separar do título
  },
  image: {
    width: 200,           // Largura da imagem
    height: 200,          // Altura da imagem
    marginTop: 20,        // Margem superior para separar do texto
  },
});

export default HomeScreen;
