import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView
} from 'react-native';
import Dates from "react-native-dates";
import moment from "moment";
import BookingButton from "../shared/BookingButton";
import {bookRoom} from "../../actions/room";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F',
  },
  calendar:{
    marginBottom: 30,
  }
});

class BookingModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      focus: "startDate",
      startDate: null,
      endDate: null
    }
  }

  componentWillMount(){
    console.log(this.props.room);
  }

  onBooking(){
    //Este metodo va a llamar al booking room
    const {bookRoom, room} = this.props;
    const startDate = this.state.startDate.format("YYYY-MM-DD")
    const endDate = this.state.endDate.format("YYYY-MM-DD")

    bookRoom(room.id, startDate, endDate);
  }

  render() {
    const isDateBlocked = (date) =>
      date.isBefore(moment(), 'day') || this.props.room.unavailableDates.indexOf(date.format("YYYY-MM-DD")) !== -1;

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    return (
      <ScrollView style={styles.container}>
        <View style = {styles.calendar}>

          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            range
          />
        </View>

        <BookingButton
          onPress = {()=> this.onBooking()}
          backgroundColor = {!this.state.startDate ? "rgba(47,134,142,0.2)" :  "#2F868E"}
          textColor = {!this.state.startDate ? "rgba(226,226,226,0.2)" :  "#E2E2E2"}
          label = "Book this room"
          disabled = {!this.state.startDate}
          >
        </BookingButton>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room.room
});

const mapDispatchToProps = dispatch => ({
  bookRoom: (roomId, startDate, endDate) => dispatch(bookRoom(roomId, startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
