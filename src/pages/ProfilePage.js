import React from 'react';
import {Image, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './Profile.styles';

const Row = ({title, value}) => (
  <View style={styles.row}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);
const ProfilePage = ({photo, qrCode, profile}) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Text style={styles.name}>{profile.name}</Text>
    </View>

    <View style={styles.row}>
      <Image
        source={{uri: photo}}
        resizeMode={'contain'}
        style={styles.image}
      />
      <QRCode value={qrCode} size={150} />
    </View>

    <Row title="Data de Nascimento: " value={profile.birthDate} />
    <Row title="CPF: " value={profile.cpf} />
    <Row title="Documento: " value={profile.documentNumber} />
    <Row title="Curso: " value={profile.course} />
    <Row title="Instituição: " value={profile.institution} />
    <Row title="Escolaridade: " value={profile.scholarity} />
    <Row title="Código: " value={profile.useCode} />
  </View>
);

export default ProfilePage;
