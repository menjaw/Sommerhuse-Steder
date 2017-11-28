import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, ActivityIndicator, TextInput, Alert, ScrollView
} from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default class PlacesList extends React.Component{

  constructor(props){
    super(props);
    const {width,height} = Dimensions.get('screen');
    this.state = {
      loading: true,
      data: [],
      error: null
    }
  }

  _handelSearch = () => {
    Alert.alert('Function not avalible yet');
  }

  componentDidMount(){
    const url = 'http://localhost:8084/seedMaven/api/demoall/getPlaces/';
      fetch(url)
      .then(res => res.json())
      .then(res => {

        this.setState({
          data:res,
          error: res.error || null,
        });
          this.setState({loading: false})
        })
        .catch(error => {
          this.setState({ error, laoding: false});
        });
      }


  render(){
    const { navigate } = this.props.navigation;

    if(this.state.loading) {
      return (<View style={s.loading}><ActivityIndicator/></View>);
    }

    return(
      //<View>
      <ScrollView style={s.container}>
        <View style={s.searchCon}>
          <TextInput placeholder="search" placeholderTextColor= 'gray' style={s.search} onChange={this._handelSearch}/>
        </View>

        <FlatList data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigate('Details', {'HomeDetails': item})}>
              <View style={s.placeCon}>
                <Image style={s.picture} source={require('../assets/icon.png')}/>
                  <View style={s.infoRow}>
                    <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="address" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{item.street}</Text>
                  </View>
                  <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="location" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{item.zip}</Text>
                  </View>
                  <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="text-document-inverted" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{item.description.substring(0,30)} ...</Text>
                  </View>
                  <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="star" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{item.rating}/5</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )} //Row ends
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
        /*<View style={s.upload}>
          <TouchableOpacity style={s.upload} onPress={() =>navigate('Upload')}>
            <Text style={s.uploadTxt}>Upload</Text>
          </TouchableOpacity>
        </View>*/
      //</View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeCon:{
    flex:1,
    padding:5,
    margin:5,
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },

  picture:{
    flex:1,
    width:100,
    height:100,
    resizeMode: 'cover',
  },

  info:{
    flexDirection: 'row',
    flex:2.2,
  },
  infoRow:{
    flex:2.2,
  },

  iconCon:{
    width: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  name:{
    marginTop: 2,
  },
  searchCon:{
    height:35,
    marginBottom:5,
    padding:5,
    backgroundColor: '#FFF',
  },
  search:{
    padding:3,
  },
});
