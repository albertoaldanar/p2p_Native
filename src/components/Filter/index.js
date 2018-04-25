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
import DateTimePicker from 'react-native-modal-datetime-picker';

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
    fontSize: 20,
    textAlign: "center",
    color: "#E2E2E2"
  }

});

class FilterModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      address: "",
      pickerVisible: false,
      initialDate: new Date()
    }
  }

//Metodos de seleccino de fecha
  onStartDatePress(){
     this.setState({ pickerVisible: true });
  }

  hidePicker(){
    this.setState({ pickerVisible: false });
  }


 setDate({date}){
    this.setState({initialDate: {date}})
    console.log(this.state.initialDate);
  };

   handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
  };


  onEndDatePress(){

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
            <Text style= {styles.datePickerText}> Start Date</Text>
          </TouchableOpacity>

          <Text style = {[styles.datePickerText, {flex: 1}]}> to </Text>

          <TouchableOpacity style = {styles.datePickerButton} onPress = {()=> this.onEndDatePress()}>
            <Text style= {styles.datePickerText}> End Date</Text>
          </TouchableOpacity>
        </View>

         <DateTimePicker
          date= {new Date()}
          mode ="date"
          isVisible={this.state.pickerVisible}
          onCancel={()=> this.hidePicker()}
          onConfirm = { ()=> this.handleDatePicked(date)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
