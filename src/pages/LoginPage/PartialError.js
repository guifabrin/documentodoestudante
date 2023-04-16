import {Button, Text, View} from 'react-native';
import styles from './PartialError.styles';

export default ({reset}) => (
  <View style={styles.container}>
    <Text>Não foi possível encontrar suas informações</Text>
    <Text>* https://www.documentodoestudante.com.br/</Text>
    <Text style={{paddingBottom: 10}}>* https://estudante.cc/</Text>
    <Button onPress={reset} title={'Tentar novamente'}></Button>
  </View>
);
