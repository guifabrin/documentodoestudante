import LoginScreen from 'react-native-login-screen';
import {useState} from 'react';
import LogoImg from '../../assets/logo.png';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../config/variables';
import DocumentoDoEstudante from '../clients/DocumentoDoEstudante';
import EstudanteCC from '../clients/EstudanteCC';

export default function LoginPage({setData}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [started, setStarted] = useState(0);
  const [errorDocumentoEstudante, setErrorDocumentoEstudante] = useState(false);
  const [errorEstudanteCC, setErrorEstudanteCC] = useState(false);
  const reset = () => {
    setErrorDocumentoEstudante(false);
    setErrorEstudanteCC(false);
    setStarted(false);
  };
  const onLoginPress = () => {
    setErrorDocumentoEstudante(false);
    setErrorEstudanteCC(false);
    setStarted(true);

    EstudanteCC.get(
      email,
      password,
      data => {
        reset();
        setData(data);
      },
      () => setErrorEstudanteCC(true),
    );

    DocumentoDoEstudante.get(
      email,
      password,
      data => {
        reset();
        setData(data);
      },
      () => setErrorDocumentoEstudante(true),
    );
  };
  const window = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.PRIMARY,
    },
    loading: {
      width: window.width,
      height: window.height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.PRIMARY,
    },
  });
  if (errorDocumentoEstudante && errorEstudanteCC) {
    return (
      <View style={styles.loading}>
        <Text>Não foi possível encontrar suas informações</Text>
        <Text>* https://www.documentodoestudante.com.br/</Text>
        <Text style={{paddingBottom: 10}}>* https://estudante.cc/</Text>
        <Button onPress={reset} title={'Tentar novamente'}></Button>
      </View>
    );
  }
  if (started) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size={100}
          color="#000"
          style={{paddingBottom: 10}}
        />
        <Text>Procurando suas informações em:</Text>
        <Text>* https://www.documentodoestudante.com.br/</Text>
        <Text>* https://estudante.cc/</Text>
      </View>
    );
  }
  return (
    <LoginScreen
      style={styles.container}
      logoImageSource={LogoImg}
      onLoginPress={onLoginPress}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      disableSignup
      disableSocialButtons
      loginButtonText={'Entrar'}
      emailPlaceholder="E-mail"
      passwordPlaceholder="Senha"
    />
  );
}
