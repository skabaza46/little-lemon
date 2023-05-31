import { useState, useEffect, useMemo, useCallback } from "react";
import { View,Alert, Text, Image, StyleSheet,FlatList, ScrollView,  StatusBar, SafeAreaView,} from "react-native"
import { Searchbar, Button } from 'react-native-paper';
import debounce from 'lodash.debounce';
import { useUpdateEffect } from '../utils/database';

import { MenuData } from "../utils/getMenuData"
import {
    createTable,
    dropTable,
    deleteDatabase,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
  } from '../utils/database';

const categories = ['starters', 'mains', 'desserts', 'drinks'];
const HomeScreen = () => {
    const [searchBarText, setSearchBarText] = useState('')
    const [menuData, setMenuData] = useState([])
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        categories.map(() => false)
    );

    const [enableStarter, setEnableStarter] = useState(false)
    const [enableMain, setEnableMain] = useState(false)
    const [enableDessert, setEnableDessert] = useState(false)
    const [enableDrink, setEnableDrink] = useState(false)

    const lookup = useCallback((q) => {
        setQuery(q);
      }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const onChangeSearchBarText = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
      };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];

        setFilterSelections(arrayCopy);
    };

    const Item = ({item}) => (
        <View style={styles.item}>
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text
                    style={styles.description}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    >{item.description}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>

                <View style={{flex:0}}>
                    <Image
                        key={item.id}
                        source={{uri: `${item.image}`}}
                        resizeMode="contain"
                        style={{
                            flex:1,
                            width: 150,
                            height: 100}}

                        />
                </View>

            </View>
        </View>
      );

    useEffect(() => {
        (async () => {
            try {

            await createTable();
            let menuItems = await getMenuItems();

            // The application only fetches the menu data once from a remote URL
            // and then stores it into a SQLite database.
            // After that, every application restart loads the menu from the database
            if (!menuItems.length) {
                const menuItems = await MenuData();
                setMenuData(menuItems);
                saveMenuItems(menuItems)
            }

            } catch (e) {
            // Handle error
            //Alert.alert(e.message);
            console.log(e)
            }
        })();
        }, []);

    const onChangeStarter = () => {
        setEnableStarter(!enableStarter)
        handleFiltersChange(0)
    }

    const onChangeMain = () => {
        setEnableMain(!enableMain)
        handleFiltersChange(1)
    }

    const onChangeDessert = () => {
        setEnableDessert(!enableDessert)
        handleFiltersChange(2)
    }


    const onChangeDrink = () => {
        setEnableDrink(!enableDrink)
        handleFiltersChange(3)
    }

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = categories.filter((s, i) => {
            // If all filters are deselected, all categories are active
            if (filterSelections.every((item) => item === false)) {
                return true;
            }
            return filterSelections[i];
            });
            try {
            const menuItems = await filterByQueryAndCategories(
                query,
                activeCategories
            );

            setMenuData(menuItems)

            } catch (e) {
            Alert.alert(e.message);
            }
        })();
        }, [filterSelections, query]);

    return (
        <View >
            <View style={{flexDirection:"row", height: 45}}>
                <View style={{flex:1}}>
                    <Image
                    placeholder="Test"
                    source={require("../assets/Logo.png")}
                    style={{justifyContent: 'flex-start', width: 250, height: 50, marginTop: 10, marginLeft: 40}} />

                </View>
                <View style={{flex:0}}>
                    <Image
                    placeholder="Test"
                    source={require("../assets/Profile.png")}
                    style={{justifyContent: 'flex-end',width: 80, height: 80,  marginTop: 10, marginRight: 20, borderRadius: 100}} />
                </View>
            </View>

            <View style={{flexDirection:"row", backgroundColor: '#495E57', padding: 5, marginTop: 50}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color: "yellow", fontSize: 40}}>{`Little Lemon\n`}</Text>
                    <Text style={{color: "white", fontSize: 30, marginTop: -50}}>{`Chicago\n`}</Text>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{justifyContent: 'flex-start',marginTop: -40, color: 'white', fontSize: 18, fontWeight: '500'}}>
                        {`\nWe are a family owned \nMediterranean restaurant,\nfocused on traditional\nrecipes served with a\nmodern twist.\n`}
                        </Text>

                        <Image
                        placeholder="Test"
                        source={{uri: `https://static.toiimg.com/photo/84895387.cms`}}
                        resizeMode="contain"
                        style={{justifyContent: 'flex-end',width: 170, height: 150, marginTop: -50, borderRadius: 15}}

                        />
                    </View>

                    <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearchBarText}
                    value={searchBarText}
                    mode="bar"
                    style={styles.input}
                    />
                </View>
            </View>

            <Text style={{fontSize: 25, fontWeight: 'bold', margin: 3}}>Oder For Delivery!</Text>
            <View style={{flexDirection:"row", padding: 10}}>
                    <Button
                    mode="elevated"
                    textColor= {enableStarter?"white" :"#495E57"}
                    buttonColor={enableStarter?"#495E57" :"white"}
                    onPress={onChangeStarter}>
                        Starters
                    </Button>
                    <Button
                    mode="elevated"
                    textColor= {enableMain?"white" :"#495E57"}
                    buttonColor={enableMain?"#495E57" :"white"}
                    onPress={onChangeMain}>
                        Mains
                    </Button>
                    <Button
                    mode="elevated"
                    textColor= {enableDessert?"white" :"#495E57"}
                    buttonColor={enableDessert?"#495E57" :"white"}
                    onPress={onChangeDessert}>
                        Desserts
                    </Button>
                    <Button
                    mode="elevated"
                    textColor= {enableDrink?"white" :"#495E57"}
                    buttonColor={enableDrink?"#495E57" :"white"}
                    onPress={onChangeDrink}>
                        Drinks
                    </Button>
            </View>


               <FlatList
                data={menuData}
                showsVerticalScrollIndicator={true}
                renderItem={({item}) => <Item item={item}/>}
                keyExtractor={item => item.id}/>
        </View>

    )
}



export default HomeScreen;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#EDEFEE',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 4,
        borderBottomColor: 'white'
      },
    description: {
        flex: 1,
        fontSize:16
    },
    title: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold'
    },
    price: {
        flex: 1,
        fontSize: 20
    },
    container: {
        flex: 1,
      },

    topHeader: {
        justifyContent: 'flex-end',

    },
    logo: {
      width: 200,
      height: 300,
      display: 'block'
    },
    profilePicture: {
        width: 100,
        height: 200,
    },
    input: {
        height: 50,
    },
  });