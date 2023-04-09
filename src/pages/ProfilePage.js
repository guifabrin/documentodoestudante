import {Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {COLORS, PROFILE_REF} from "../config/variables";

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 20,
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 10
    },
    row: {
        display: "flex",
        flexDirection: "row",
        padding: 10
    },
    rowQrCode: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        justifyContent: "center"
    },
    name: {
        fontSize: 36,
        fontWeight: "bold",
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    text: {
        fontSize: 20
    }
});

export default ({handleLogout, cardType, photo, qrCode, ...data}) => {
    const ref = PROFILE_REF[cardType]
    return (
        <ScrollView>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.name}>{data.profile[ref.name]}</Text>
                    <Image source={{uri: photo}} resizeMethod={'resize'} style={{width: 150, height: 150}}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Data de Nascimento: </Text>
                    <Text style={styles.text}>{data.profile[ref.birthDate]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>CPF: </Text>
                    <Text style={styles.text}>{data.profile[ref.cpf]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Documento: </Text>
                    <Text style={styles.text}>{data.profile[ref.documentNumber]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Curso: </Text>
                    <Text style={styles.text}>{data.profile[ref.course]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Instituição: </Text>
                    <Text style={styles.text}>{data.profile[ref.institution]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Escolaridade: </Text>
                    <Text style={styles.text}>{data.profile[ref.scholarity]}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Código: </Text>
                    <Text style={styles.text}>{data.profile[ref.code]}</Text>
                </View>
                <View style={styles.rowQrCode}>
                    <QRCode value={qrCode} size={200}/>
                </View>
            </View>
            <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                <Button title={'Sair'} onPress={handleLogout}/>
            </View>
        </ScrollView>
    )

}