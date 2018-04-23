
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import { navigate } from '../../actions/nav';
import {getRooms} from "../../actions/room";


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white"
  },

  image: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').width *4/7,
    marginBottom: 15,
  },

  text: {
    fontSize: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#555"
  },

  item: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
});


class ExploreTab extends Component {

  componentWillMount(){
    this.props.getRooms();
  }

  onPress(item) {
    this.props.navigate({ routeName: "Room", params: { item: item } });
  }

  render() {
    const {rooms} = this.props;
    return (
      <FlatList
        style={styles.container}
        data={rooms}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => this.onPress(item)} style={styles.item}>
            <Image style={styles.image} source = {{uri: "https://i.ebayimg.com/images/g/7N0AAOSwhqhaK3Qj/s-l960.jpg"}} />
            <Text style= {styles.title}> {`$ ${item.price} ${item.instant ? '' : ''} ${item.title}`} </Text>
            <Text> {`${item.homeType} ${item.bedRoom} bedrooms(s)`}</Text>
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => item.id}
      />
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.room.rooms
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  getRooms: () => dispatch(getRooms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTab);
