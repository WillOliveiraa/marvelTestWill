import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';

export default props => {
    return (
        <View style={styles.container}>
            <Image style={styles.image}
                source={{ uri: props.navigation.state.params.image }} />
            <Text style={styles.title}>{props.navigation.state.params.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        // backgroundColor: '#00BCD4',
        marginBottom: 18,
    },
    title: {
        fontFamily: 'Roboto',
        color: '#D42026',
        fontSize: 22,
    },
});
