import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SavedScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produtos Salvos</Text>
            {/* Aqui você pode adicionar mais conteúdo, como uma lista de produtos salvos */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default SavedScreen;
