// @flow

import React from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Colors, Fonts, Images } from '../Themes'
import R from 'ramda'

// Styles
import styles from './Styles/ThemeScreenStyle'

// Colors
const colors = R.keys(Colors)
// Font Types
const types = R.keys(Fonts.type)
// Font Styles
const fontStyles = R.keys(Fonts.style)

export default class TestScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
