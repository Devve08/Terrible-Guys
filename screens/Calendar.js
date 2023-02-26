import React, { Component, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import AppointmentModal from "../components/Modals/AppointmentModal";
import SessionContext from "../context/SessionContext";
import getRequest from "../network/network";
import { Colors } from "../Styles/styles";

export default class App extends Component {
  static contextType = SessionContext;
  constructor(props) {
    super(props);
    this.state = {
      appointmentModalOpen: false,
      aptArray: [],
      selectedAptDates: {},
      appointmentInfo: {},
      selectedDate: "",
    };
  }

  checkDate(date) {
    let result = this.state.aptArray.filter(item => item.pa_apt_date === date);
    if (result.length > 0) {
      this.getAppointmentInfo(result[0].pa_id);
      this.setState({ appointmentModalOpen: true });
    }
  }

  getAppointmentInfo = async id => {
    try {
      let member_id = this.context.session.user.user_id;
      let g_hash = this.context.session.user.g_hash;
      let access_token = this.context.session.user.access_token;
      let pa_id = id;
      let params = { member_id, g_hash, pa_id, access_token };
      let res = await getRequest(params, "request/api/getappointmentinfo");
      this.setState({ appointmentInfo: res.apt_array });
    } catch (error) {
      console.log(error.message);
    }
  };

  closeModal() {
    this.setState({ appointmentModalOpen: false });
  }
  getMarkedDates() {
    let dates = {};
    this.state.aptArray.forEach(val => {
      dates[val.pa_apt_date] = {
        selected: true,
        selectedColor: Colors.primary,
      };
    });
    this.setState({ selectedAptDates: dates });
  }

  async componentDidMount() {
    const { getListOfAppointments } = this.context;
    let id = this.props.route.params.pp_id;
    const res = await getListOfAppointments(id);
    res.apt_array.map(item =>
      this.setState({ aptArray: [...this.state.aptArray, item] })
    );

    this.getMarkedDates();
  }
  render() {
    const { selectedAptDates } = this.state;
    return (
      <View style={styles.container}>
        {/* {console.log(this.state.aptArray)} */}
        <Calendar
          onDayPress={day => this.checkDate(day.dateString)}
          markedDates={selectedAptDates}
          theme={{
            arrowColor: Colors.primary,
            todayTextColor: Colors.primary,
            calendarBackground: 'black',
            backgroundColor: "black",
            dayTextColor: "white",
            monthTextColor: 'white'
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Contacts", {
                project_id: this.props.route.params.pp_id,
              })
            }
            style={[styles.btn, { marginTop: 40 }]}
          >
            <Text style={styles.btnText}>CREW CONTACTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ProjectFiles", {
                project_id: this.props.route.params.pp_id,
              })
            }
            style={styles.btn}
          >
            <Text style={styles.btnText}>PROJECT FILES</Text>
          </TouchableOpacity>
        </View>
        <AppointmentModal
          closeModal={() => this.setState({ appointmentModalOpen: false })}
          appointmentModalOpen={this.state.appointmentModalOpen}
          appointmentInfo={this.state.appointmentInfo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
  },
  btn: {
    width: 200,
    marginHorizontal: 80,
    backgroundColor: "#D7AF43",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  btnText: {
    color: "black",
  },
});
