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
import axios from 'axios';
import {CARD_TYPES, COLORS} from '../config/variables';

async function scrapEstudanteCC(email, password, callback, errorCallback) {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch('https://estudante.cc/api/v1/auth/sign_in', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      redirect: 'follow',
      headers,
    });
    const responseOrders = await fetch('https://estudante.cc/api/v1/orders', {
      headers: {
        uid: email,
        'access-token': response.headers.get('access-token'),
        client: response.headers.get('client'),
      },
    }).then(response => response.json());
    const order = responseOrders.orders.find(
      order => order.status === 'approved' && order.payment_status === 'paid',
    );
    if (!order) {
      return null;
    }
    let image = await fetch(order.photo_url).then(response => response.blob());
    const photo = await new Promise(_resolve => {
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(image);
      fileReaderInstance.onload = () => {
        _resolve(fileReaderInstance.result);
      };
    });
    callback({
      ...order,
      photo: photo.replace(
        'data:application/octet-stream;base64,',
        'data:image/png;base64,',
      ),
      card: `data:image/svg+xml;utf8,${order.card_svg_html.replace(
        /(\r\n|\n|\r)/gm,
        '',
      )}`,
      qrCode: `https://api.estudante.cc/student_card_validation/${order.identifier}`,
    });
  } catch (e) {
    errorCallback();
  }
}

async function scrapDocumentoDoEstudante(
  email,
  password,
  callback,
  errorCallback,
  cookie = [],
) {
  try {
    const data = new FormData();
    data.append('username', email);
    data.append('password', password);

    let response;

    try {
      response = await fetch(
        'https://www.documentodoestudante.com.br/loginPost?targetUrl=',
        {
          method: 'POST',
          headers: {
            Cookie: cookie.join('; '),
          },
          body: data,
          credentials: 'include',
          redirect: cookie.length ? '' : 'manual',
        },
      );
    } catch (error) {
      if (!error.response) errorCallback();
      return scrapDocumentoDoEstudante(
        email,
        password,
        callback,
        errorCallback,
        error.response.headers['set-cookie'],
      );
    }

    const textData = await response.text();
    const userData = textData.split('var data = ')[1].split('}')[0] + '}';
    const jsonData = JSON.parse(
      userData
        .replaceAll("'", '"')
        .replaceAll(': ', '": ')
        .replaceAll('\n                ', '                \n"'),
    );

    const responseGeneration = await axios.request({
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'https://file.documentodoestudante.com.br/preview/generate-document',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.join('; '),
      },
      data: jsonData,
    });
    const year = jsonData.birthDate.substring(6);
    const month = jsonData.birthDate.substring(3, 5);
    const day = jsonData.birthDate.substring(0, 2);
    const image = responseGeneration.data.image;
    callback({
      ...jsonData,
      card: `data:image/png;base64,${image}`,
      qrCode: `https://www.meiaentrada.org.br/validador/${jsonData.useCode}/${year}${month}${day}`,
    });
  } catch (e) {
    errorCallback();
  }
}

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
    scrapDocumentoDoEstudante(
      email,
      password,
      ({card, qrCode, url, ...profile}) => {
        reset();
        setData({
          card,
          qrCode,
          profile: {
            name: profile.name,
            birthDate: profile.birthDate,
            cpf: profile.cpf,
            documentNumber: profile.documentNumber,
            course: profile.course,
            institution: profile.institution,
            scholarity: profile.scholarity,
            code: profile.useCode,
          },
          photo: url,
          cardType: CARD_TYPES.DOCUMENTO_DO_ESTUDANTE,
        });
      },
      () => {
        setErrorDocumentoEstudante(true);
      },
    );
    scrapEstudanteCC(
      email,
      password,
      ({card, qrCode, photo, ...data}) => {
        reset();
        setData({
          card,
          qrCode,
          profile: {
            name: data.full_name,
            birthDate: data.birth_date,
            cpf: data.cpf,
            documentNumber: data.document_number,
            course: data.course_name,
            institution: data.institution_name,
            scholarity: data.course_type,
            code: data.registration_number,
          },
          photo,
          cardType: CARD_TYPES.ESTUDANTE_CC,
        });
      },
      () => {
        setErrorEstudanteCC(true);
      },
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
