import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ListView, ActivityIndicator, TextInput, Alert
} from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default class PlacesList extends React.Component{

  constructor(props){
    super(props);
    const {width,height} = Dimensions.get('screen');
    this.state = {
      token: null,
      isLoading: true,
      dataSource:[],
    }
  }

  _handelSearch = () => {
    Alert.alert('Function not avalible yet');
  }

  componentDidMount(){
    return fetch('http://localhost:8084/seedMaven/api/demoall/getPlaces/')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    const { navigate } = this.props.navigation;

    if(this.state.isLoading) {
      return (<View style={s.loading}><ActivityIndicator/></View>);
    }

    return(
      <View style={s.container}>
        <View style={s.searchCon}>
          <TextInput placeholder="search" placeholderTextColor= 'gray' style={s.search} onChange={this._handelSearch}/>
        </View>

        <ListView dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => navigate('Details', {'HomeDetails': rowData})}>
              <View style={s.placeCon}>
                <Image style={s.picture} source={require('../assets/icon.png')}/>
                  <View style={s.infoRow}>
                    <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="address" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{rowData.street}</Text>
                  </View>
                  <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="location" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{rowData.zip}</Text>
                  </View>
                  <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="text-document-inverted" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{rowData.description.substring(0,30)} ...</Text>
                  </View>
                  <View style={s.info}>
                    <View style={s.iconCon}>
                      <Entypo style={s.icon} name="star" size={20} color="#A9A9A9"/>
                    </View>
                    <Text style={s.name}>{rowData.rating}/5</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          }//render row ends
        />
      </View>
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
