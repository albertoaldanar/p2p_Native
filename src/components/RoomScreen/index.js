
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import {getRoom} from "../../actions/room";
import Icon from "react-native-vector-icons/Ionicons";
import BookingButton from "../shared/BookingButton";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 40
  },

  image:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width*4/7
  },

  row:{
    flexDirection: 'row',
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },

  avatar:{
    width: 60,
    height: 60,
    borderRadius: 60
  },

  info:{
    flex: 1,
    alignItems: "center"
  },
  about: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  aboutText:{
    fontWeight:"bold",
    marginBottom: 10
  },
  bookingBar: {
    position: "absolute",
    bottom: 0,
    padding: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
    backgroundColor: "white",
    alignItems: "center"
  }

});

class RoomScreen extends Component {

  componentWillMount(){
    this.props.getRoom(this.props.navigation.state.params.item.id);
  }

  render() {
    const room = this.props.room;
    if (!room) return null

    const {bedRoom, bathRoom, accomadate, summary, price} = room

    return (
      <View style = {{flex: 1}}>
        <ScrollView style ={styles.container}>
          <Image source = {{uri:  "https://i.ebayimg.com/images/g/7N0AAOSwhqhaK3Qj/s-l960.jpg"}} style = {styles.image}/>
          <View style = {{padding: 30}}>
            <View style = {styles.row}>
              <Text style = {{flex: 1}}>{`Hosted by ${room.host.fullname}`}</Text>
            </View>
          </View>

          <View style = {styles.row}>
            <View style = {styles.info}>
              <Icon name = "ios-people-outline" size = {40}/>
              <Text>{accomadate} guest(s)</Text>
            </View>

            <View style = {styles.info}>
              <Icon name = "ios-alarm-outline" size = {40}/>
              <Text>{bedRoom} bedroom(s)</Text>
            </View>

            <View style = {styles.info}>
              <Icon name = "ios-home-outline" size = {40}/>
              <Text>{bathRoom} bathroom(s)</Text>
            </View>
          </View>

          <View style = {styles.about}>
            <Text style ={styles.aboutText}> About this room</Text>
            <Text> {summary} </Text>
          </View>
        </ScrollView>

        <View style = {styles.bookingBar}>
          <Text style= {{flex: 1}}>
            <Text style = {{fontWeight: "bold"}}> {`$${price}`}</Text> per night
          </Text>

        <BookingButton
          onPress = { () => {alert("Booking Button")}}
          label = "Book this room"
          backgroundColor= "#FF5A60"
          textColor = "white"
        />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room.room
});

const mapDispatchToProps = dispatch => ({
  getRoom: (roomId) => dispatch(getRoom(roomId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);
