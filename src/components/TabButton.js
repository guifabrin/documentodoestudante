import {Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../config/variables';
import styles from './TabButton.styles';

const TabButton = ({handler, title, icon, active}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={handler}
      underlayColor={COLORS.SECONDARY}
    >
      <View>
        <View
          style={[
            styles.activeBar,
            {backgroundColor: active ? COLORS.ACTIVE : 'transparent'},
          ]}
        />
        <View
          style={[
            styles.tab,
            {backgroundColor: active ? COLORS.SECONDARY : 'transparent'},
          ]}
        >
          <Ionicons name={icon} style={styles.icon} />
          <Text style={styles.tabTitle}>{title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TabButton;
