
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, BackHandler } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

import ExploreTab from '../components/MainScreen/ExploreTab';
import ProfileTab from '../components/MainScreen/ProfileTab';
import RoomScreen from '../components/RoomScreen';
import FilterModal from "../components/Filter";
import BookingModal from "../components/BookingModal";
import AuthenticationScreen from '../components/Authentication';

import Icon from 'react-native-vector-icons/Ionicons';

const tabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#FF5A60',
    inactiveTintColor: '#3A3A3A',
    labelStyle: {
      fontSize: 10,
      fontWeight: 'bold'
    },
    tabStyle: {
      paddingBottom: 0,
      borderTopWidth: 1,
      borderTopColor: 'lightgray',
      backgroundColor: 'white'
    },
    style: {
      backgroundColor: 'white',
    },
  }
}

// Diseño del tab de la navegacion

export const MainScreen = TabNavigator({
  Explore: {
    screen: ExploreTab,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-search-outline'} size={30} color={tintColor}/>
    }
  },

  Profile: {
    screen: ProfileTab,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-person-outline'} size={30} color={tintColor}/>
    }
  }
}, tabConfig);

// Rutas de navegación de la app

export const AppNavigator = StackNavigator({
  Authentication: {
    screen: AuthenticationScreen,
    navigationOptions: {
      header: null
    }
  },

  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
  Room: {
    screen: RoomScreen,
    navigationOptions: (props) =>({
      title: props.navigation.state.params.item.title,
    })
  },

  Booking: {
    screen: BookingModal,
    navigationOptions: {
      title: "Booking",
      headerStyle: {
        backgroundColor: "#007B7F",
        elevation: 0,
      },
      headerTintColor: "#E2E2E2"
    }
  },

  Filter: {
    screen: FilterModal,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#007B7F",
        elevation: 0,
      },
      headerTintColor: "#E2E2E2"
    }
  },


});


class AppWithNavigationState extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#007B7F"/>
        <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
