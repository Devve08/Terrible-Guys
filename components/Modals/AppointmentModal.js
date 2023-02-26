import React from 'react'
import Modal from "react-native-modal"
import { View, Text } from 'react-native'
import { Colors } from '../../Styles/styles'

export default function AppointmentModal({ appointmentModalOpen, closeModal, appointmentInfo }) {
    return (
        <Modal
            swipeDirection={"down"}
            swipeThreshold={200}
            onBackdropPress={() => closeModal()}
            onSwipeComplete={() => closeModal()}
            isVisible={appointmentModalOpen}>
            {appointmentInfo && <View style={{
                backgroundColor: "#1c1b1b",
                height: 250, borderRadius: 5,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 5, color: "#D7AF43" }}>{appointmentInfo.pa_apt_title}</Text>
                <Text style={{ fontSize: 18, paddingVertical: 5, color: "#D7AF43" }}>{appointmentInfo.pa_apt_description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%", paddingTop: 20 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ paddingVertical: 10, fontSize: 16, color: 'white' }}>Start:</Text>
                        <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold' }}>
                            {appointmentInfo.pa_apt_start_time}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ paddingVertical: 10, fontSize: 16, color: 'white' }}>End:</Text>
                        <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold' }}>{appointmentInfo.pa_apt_start_time}</Text>
                    </View>
                </View>

            </View>}
        </Modal>
    )
}
