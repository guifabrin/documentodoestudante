import {ActivityIndicator, Text, View} from 'react-native';
import styles from './PartialLoading.styles';

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size={100} color="#000" style={{paddingBottom: 10}} />
    <Text>Procurando suas informações em:</Text>
    <Text>* https://www.documentodoestudante.com.br/</Text>
    <Text>* https://estudante.cc/</Text>
  </View>
);
