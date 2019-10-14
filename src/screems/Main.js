import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Icons from 'react-native-vector-icons/FontAwesome';
import ItemList from '../components/ItemList';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2asd',
        name: 'Fourth Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa12397f63',
        name: 'Fiveth Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e1231229d72',
        name: 'Sixth Item',
    },
    {
        id: 'bd7acasdbea-c1b1-46c2-aed5-3ad53abb2asd',
        name: 'Eith Item',
    },
    {
        id: '3ac68afc-c6sad05-48d3-a4f8-fbd91aa12397f63',
        name: 'Nineth Item',
    },
    {
        id: '58694a0f-3dsdda1-471f-bd96-145571e1231229d72',
        name: 'Tenth Item',
    },
];

const LIMIT = 4;
const APIKEY = '831edf63fbee2afdec8fa8e4822b1be9';
const HASH = '7aa9016109c353accd0256da4fd8bcef';
const URL_DEFAULT = `http://gateway.marvel.com/v1/public/characters?apikey=${APIKEY}&ts=1&hash=${HASH}&limit=${LIMIT}`;
const KEYS_TO_FILTERS = ['name', 'thumbnail'];

class Main extends Component {

    state = {
        heroes: [],
        currentPage: 1,
        totalPages: 10,
        startIndex: 0,
        endIndex: 3,
        offset: 0,
        limit: LIMIT,
        searchTerm: ''
    };

    componentDidMount() {
        this.request(0);
    }

    request = async (offset) => {
        try {
            const res = await axios.get(`${URL_DEFAULT}&offset=${offset}`);
            this.setState({ heroes: res.data.data.results });
        } catch (err) {
            console.log(err);
        }
    }

    validateIndex = index => index >= 0 && index <= this.state.totalPages;

    prevPage = () => {
        const { startIndex, endIndex } = this.state;
        if (this.validateIndex(startIndex - 5) && this.validateIndex(endIndex - 5)) {
            this.setState(prevState => ({
                startIndex: prevState.startIndex - 5,
                endIndex: prevState.endIndex - 5
            }));
        }
    };

    nextPage = () => {
        const { startIndex, endIndex } = this.state;
        if (this.validateIndex(startIndex + 5) && this.validateIndex(endIndex + 5)) {
            this.setState(prevState => ({
                startIndex: prevState.startIndex + 5,
                endIndex: prevState.endIndex + 5
            }));
        }
    };

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    render() {
        let startIndex = this.state.startIndex;
        let endIndex = this.state.endIndex;
        let total = this.state.totalPages;
        let numbers = !total ? [] : Array.from({ length: total }, (v, k) => k + 1);
        const filtered = this.state.heroes.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={styles.viewTitle}>
                    <Text style={[styles.title, styles.title2]}>{'Busca Marvel'.toUpperCase()}</Text>
                    <Text style={styles.title}>{' Teste Front-end'.toUpperCase()}</Text>
                </View>
                <View style={[styles.underline, { marginTop: -8 }]} />
                <View style={styles.viewTextField}>
                    <Text style={[styles.title, { marginBottom: 5 }]}>Nome do Personagem</Text>
                    <SearchInput
                        onChangeText={(term) => { this.searchUpdated(term) }}
                        style={styles.input}
                        placeholderTextColor='white'
                    />
                </View>
                <View style={styles.viewName}>
                    <Text style={[styles.title, { color: 'white', marginLeft: 100, fontWeight: '700', fontSize: 18 }]}>Nome</Text>
                </View>
                {this.showListHeroes(filtered, navigate)}
                <View style={styles.footer}>
                    <View style={styles.rowFooter}>
                        {this.createIcon('caret-left', 'prev')}
                        {/* <View style={styles.viewNumberPages}>
                            {this.createNumber(1, true)}
                            {this.createNumber(2)}
                            {this.createNumber(3)}
                        </View> */}
                        <View style={styles.viewNumberPages}>
                            {this.createPagination(numbers, startIndex, endIndex)}
                        </View>
                        {this.createIcon('caret-right', 'next')}
                    </View>
                </View>
            </View>
        );
    }

    showListHeroes(list, navigate) {
        return (
            <FlatList
                data={list}
                // data={this.state.heroes}
                // data={DATA}
                renderItem={({ item }) => <ItemList title={item.name}
                    image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    navigate={navigate}
                />}
                keyExtractor={item => item.id}
            />
        );
    }

    createPagination(numbers, startIndex, endIndex) {
        return (
            numbers.slice(startIndex, endIndex).map(item => (
                this.createNumber(item)
            ))
        );
    }

    clickIcon(type) {
        // Alert.alert(type.toString());
        type == 'next' ? this.nextPage() : this.prevPage()
    }

    createIcon(name, type) {
        return (
            <TouchableOpacity onPress={() => this.clickIcon(type)}>
                <Icons name={name} size={55} color={'#D42026'} />
            </TouchableOpacity>
        );
    }

    clickNumber = async (value) => {
        let offset = this.state.offset + 4;
        this.setState({ currentPage: value, offset });
        await this.request(offset);
    }

    createNumber(value, isSelected) {
        if (value == this.state.currentPage) isSelected = true;
        return (
            isSelected ?
                <TouchableOpacity onPress={() => this.clickNumber(value)}>
                    <View style={styles.borderPagesSelected}>
                        <Text style={[styles.title, styles.numPage, { color: 'white' }]}>{value}</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.clickNumber(value)}>
                    <View style={styles.borderPages}>
                        <Text style={[styles.title, styles.numPage]}>{value}</Text>
                    </View>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'Roboto',
        color: '#D42026',
        fontSize: 16,
        marginTop: 12,
        marginBottom: 12
    },
    title2: {
        fontWeight: 'bold',
    },
    viewTitle: {
        flexDirection: 'row',
        paddingLeft: 40
    },
    underline: {
        width: 52,
        height: 2,
        backgroundColor: '#D42026',
        marginLeft: 40
    },
    viewTextField: {
        alignSelf: 'center',
        width: '100%',
        paddingLeft: 40,
        paddingRight: 30,
        marginBottom: 12
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#757575',
        borderRadius: 6
    },
    viewName: {
        backgroundColor: '#D42026',
        height: 50,
        justifyContent: 'center'
    },
    footer: {
        backgroundColor: 'white',
    },
    rowFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
        marginRight: 30,
        marginBottom: 24,
        marginLeft: 30
    },
    numPage: {
        fontSize: 22
    },
    viewNumberPages: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 60,
        marginRight: 60,
        justifyContent: 'space-between'
    },
    borderPages: {
        width: 40,
        height: 40,
        borderRadius: 150 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red'
    },
    borderPagesSelected: {
        width: 40,
        height: 40,
        borderRadius: 150 / 2,
        backgroundColor: '#D42026',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    }
});

export default Main;
