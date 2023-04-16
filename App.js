import * as React from 'react';
import {useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from 'react-native';
import ProfilePage from './src/pages/ProfilePage';
import CardPage from './src/pages/CardPage';
import {useStorage} from './src/hooks/useStorage';
import LoginPage from './src/pages/LoginPage';
import TabButton from './src/components/TabButton';
import LogoImg from './assets/logo.png';
import styles from './App.styles';

function App() {
  const [page, setPage] = useState(0);
  const [data, setData, deleteData] = useStorage('data');
  if (!data) return <LoginPage setData={setData} />;
  const showConfirmDialog = () =>
    Alert.alert('Confirmação', 'Tem certeza que quer sair?', [
      {
        text: 'Sim',
        onPress: deleteData,
      },
      {
        text: 'Não',
      },
    ]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImg} style={styles.logo} />
        <Text style={styles.title}>Documento do Estudante</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        {page === 0 && <ProfilePage {...data} />}
        {page === 1 && <CardPage {...data} />}
      </ScrollView>

      <View style={styles.tabContainer}>
        <TabButton
          icon="person"
          title="Perfil"
          active={page === 0}
          handler={() => setPage(0)}
        />
        <TabButton
          icon="card"
          title="Cartão"
          active={page === 1}
          handler={() => setPage(1)}
        />
        <TabButton icon="log-out" handler={showConfirmDialog} title="Sair" />
      </View>
    </View>
  );
}

export default App;
