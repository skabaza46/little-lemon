import { useState, useEffect } from "react";
import { View,Text, Image, StyleSheet,FlatList, ScrollView,  StatusBar, SafeAreaView,} from "react-native"
import { Searchbar, Button } from 'react-native-paper';
import { MenuData } from "../utils/getMenuData"

const HomeScreen = () => {
    const [searchText, setSearchText] = useState('')
    const [searchEnabled, setSearchEnabled ] = useState(false)
    const [menuData, setMenuData] = useState([])

    const onChangeSearchText = (value) => {
        setSearchText(value)
    }

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
            // Check if user is logged in, if so redirect them to Profile screen
            const menu_data = await MenuData()
            setMenuData(menu_data)

            })();
        }, [searchText]);
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
                        source={require("../assets/Profile.png")}
                        style={{justifyContent: 'flex-end',width: 170, height: 150, marginTop: -50, borderRadius: 15}} />
                    </View>

                    <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearchText}
                    value={searchText}
                    mode="bar"
                    style={styles.input}
                    />
                </View>
            </View>

            <Text style={{fontSize: 25, fontWeight: 'bold', margin: 3}}>Oder For Delivery!</Text>
            <View style={{flexDirection:"row", padding: 10}}>
                    <Button
                    mode="elevated"
                    textColor="#495E57"
                    onPress={() => console.log('Pressed')}>
                        Starters
                    </Button>
                    <Button
                    mode="elevated"
                    textColor="#495E57"
                    onPress={() => console.log('Pressed')}>
                        Mains
                    </Button>
                    <Button
                    mode="elevated"
                    textColor="#495E57"
                    onPress={() => console.log('Pressed')}>
                        Desserts
                    </Button>
                    <Button
                    mode="elevated"
                    textColor="#495E57"
                    onPress={() => console.log('Pressed')}>
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