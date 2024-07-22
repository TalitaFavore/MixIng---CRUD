import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; // ou FontAwesome5, dependendo da versão que você instalou

function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Icon style={styles.iconPerfil} name="user-edit" size={150} />
            <TextInput
                style={styles.input}
                placeholder="Nome"
            />
            <Button
                style={styles.button}
                mode="contained"
                onPress={() => console.log('Botão pressionado')}
                contentStyle={styles.buttonContent}
            >
                Salvar
            </Button>
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
    iconPerfil: {
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
    },
    button: {
        width: '80%',
    },
    buttonContent: {
        paddingVertical: 8,
    },
});

export default ProfileScreen;
