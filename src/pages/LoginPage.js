import {useState} from 'react';
import LoginScreen from 'react-native-login-screen';
import DocumentoDoEstudante from '../clients/DocumentoDoEstudante';
import EstudanteCC from '../clients/EstudanteCC';
import LogoImg from '../../assets/logo.png';
import PartialLoading from './LoginPage/PartialLoading';
import PartialError from './LoginPage/PartialError';
import styles from './LoginPage.styles';

export default function LoginPage({setData}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    documentoEstudante: false,
    estudanteCC: false,
  });

  const reset = () => {
    setErrors({documentoEstudante: false, estudanteCC: false});
    setLoading(false);
  };

  const handleLoginPress = () => {
    setErrors({documentoEstudante: false, estudanteCC: false});
    setLoading(true);

    EstudanteCC.get(
      email,
      password,
      data => {
        reset();
        setData(data);
      },
      () => setErrors(prevState => ({...prevState, estudanteCC: true})),
    );

    DocumentoDoEstudante.get(
      email,
      password,
      data => {
        reset();
        setData(data);
      },
      () => setErrors(prevState => ({...prevState, documentoEstudante: true})),
    );
  };

  const {documentoEstudante, estudanteCC} = errors;
  if (documentoEstudante && estudanteCC) return <PartialError reset={reset} />;
  if (loading) return <PartialLoading />;

  return (
    <LoginScreen
      style={styles.container}
      logoImageSource={LogoImg}
      onLoginPress={handleLoginPress}
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
