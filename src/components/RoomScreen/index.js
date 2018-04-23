
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {getRoom} from "../../actions/room";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

class RoomScreen extends Component {

  componentWillMount(){
    this.props.getRoom(this.props.navigation.state.params.item.id);
  }

  render() {
    const item = this.props.navigation.state.params.item;
    const room = this.props.room;

    if (!room) return null
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{room.host.fullname}</Text>
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
