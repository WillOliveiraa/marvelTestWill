import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

export default props => {
    return (
        <View>
            <TouchableOpacity onPress={() => props.navigate('Details', { title: props.title, image: props.image })}>
                <View style={[styles.container]}>
                    <Image style={styles.image}
                        source={{ uri: props.image }} />
                    {/* source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} /> */}
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={{ height: 1, width: '100%', backgroundColor: '#D42026' }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 150 / 2,
        backgroundColor: '#00BCD4',
        marginTop: 18,
        marginBottom: 18,
        marginLeft: 30,
        marginRight: 25,
    },
    title: {
        fontFamily: 'Roboto',
        // color: '#D42026',
        fontSize: 20,
    },
})