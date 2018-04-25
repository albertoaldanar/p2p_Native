import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import BookingButton from "../shared/BookingButton";

import { login, logout } from '../../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F',
  },
  address: {
    color: '#E2E2E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressInput: {
    color: '#E2E2E2',
    marginBottom: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    paddingLeft: 10
  },

  datePicker: {
    flexDirection: "row",
    marginBottom: 40
  },
  datePickerButton: {
    flex: 1
  },
  datePickerText: {
    fontSize: 15,
    textAlign: "center",
    color: "#E2E2E2"
  },
  calendar: {
    flexDirection: "row",
    padding: 15,
    flex: 1,
    marginBottom: 20
  },
  firstCalendar:{
    marginRight: 30
  }

});

class FilterModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      address: props.filter.address,
      pickerVisible: false,
      startDate: props.filter.startDate,
      endDate: props.filter.endDate
    }
  }

//Metodos de seleccino de fecha

  onSearch(){
    console.log("This button will book")
  }

  render() {

    return (
      <ScrollView style={styles.container} contentContainerStyle = {{ padding: 20 }} >
        <TextInput
          style= {styles.addressInput}
          placeholder= "Where are you going"
          placeholderTextColor = "#E2E2E2"
          autoCorrect= {false}
          value = {this.state.address}
          onChangeText = {address => this.setState({address})}
        />

        <View style = {styles.datePicker}>
          <TouchableOpacity style = {styles.datePickerButton} onPress = {()=> this.onStartDatePress()}>
            <Text style= {styles.datePickerText}> {this.state.startDate || "-" }</Text>
          </TouchableOpacity>

          <Text style = {[styles.datePickerText, {flex: 1}]}> to </Text>

          <TouchableOpacity style = {styles.datePickerButton} onPress = {()=> this.onEndDatePress()}>
            <Text style= {styles.datePickerText}> {this.state.endDate || "-" }</Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.calendar}>
          <DatePicker
            style={[ styles.firstCalendar, {width: 150}]}
            date={this.state.startDate}
            mode="date"
            placeholder="Start date"
            format="YYYY-MM-DD"
            minDate= {new Date()}
            maxDate="2019-06-01"
            confirmBtnText="Book"
            cancelBtnText="Cancel"
            onDateChange={(date) => {this.setState({startDate: date})}}
          />

          <DatePicker
            style={{width: 150}}
            date={this.state.endDate}
            mode="date"
            placeholder="End date"
            format="YYYY-MM-DD"
            minDate= {new Date()}
            maxDate="2019-06-01"
            confirmBtnText="Book"
            cancelBtnText="Cancel"
            onDateChange={(date) => {this.setState({endDate: date})}}
          />
        </View>

        <BookingButton
          onPress = {()=> this.onSearch()}
          backgroundColor = "#2F868E"
          textColor = "#E2E2E2"
          label = "Search"
        >
        </BookingButton>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.room.filter
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
