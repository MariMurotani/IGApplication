// @flow
'use strict';

import React from 'react'
import { AppRegistry,View, ScrollView, Text, Image, ListView, StyleSheet } from 'react-native'
import { Colors, Fonts, Images } from '../Themes'
import R from 'ramda'

// Styles
//import styles from './Styles/DeviceInfoScreenStyle'
import styles from './Styles/ThemeScreenStyle'

// Colors
const colors = R.keys(Colors)
// Font Types
const types = R.keys(Fonts.type)
// Font Styles
const fontStyles = R.keys(Fonts.style)

// URL feed
var REQUEST_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=200&q=http://feeds.reuters.com/reuters/businessNews";

/*
* http://facebook.github.io/react-native/releases/0.19/docs/tutorial.html
* */
// TestScreenScene
export default class TestScreen extends React.Component {
  //  コンストラクタ
  constructor(props) {
    super(props);
    //  ステートの設定
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
    //  データ取得
    this.fetchData();
  }
  //  データ取得用
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.responseData);
        //  ステートに値を設定
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.responseData.feed),
          loaded: true,
        });
        this.render();
      })
      .done();
  }
  //  描画用のrender
  render () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.mainContainer}>
      <Text>Hello world!</Text>
      </View>
    );
    var feeds = this.state.dataSource;
    console.log(feeds);
    return this.renderListView(feeds);
  }
  //  ローディング用の表示をする
  renderLoadingView(){
    return (
      <View style={styles.mainContainer}>
        <Text>Loading......</Text>
      </View>

    );
  }
  //  リスト用の表示をする
  renderListView(feeds){
    return (
      <View style={styles.mainContainer}>
        <Text>{feeds.title}</Text>
        <Text>{feeds.description}</Text>
      </View>
    )
  }
}
