// @flow
'use strict';

import React from 'react'
import { AppRegistry,View, ScrollView, Text, Image, ListView, StyleSheet } from 'react-native'
import { Colors, Fonts, Images, Metrics } from '../Themes'
import R from 'ramda'

// Styles
import styles from './Styles/DeviceInfoScreenStyle'
//import styles from './Styles/ThemeScreenStyle'

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
      title: "",
      description: "",
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
          title: responseData.responseData.title,
          description: responseData.responseData.description,
          dataSource: this.state.dataSource.cloneWithRows(responseData.responseData.feed.entries),
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
    // return (
    //   <View style={styles.mainContainer}>
    //   <Text>Hello world!</Text>
    //   </View>
    // );
    return this.renderListView();
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
  renderListView(){
    // var feeds = this.state.dataSource;
    // console.log(feeds);
    return (
      // <View style={styles.mainContainer}>
      //   <Text>{feeds.title}</Text>
      //   <Text>{feeds.description}</Text>
      // </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderListViewRows}
        style={styles.mainContainer}
      />
    );
  }
  //  一行ごとの憑依
  renderListViewRows(entry) {
    console.log(entry);
    return (
    <View style={list_styles.container}>
      <Image
        source={{uri: 'data:image/jpeg;base64,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'}}
        style={list_styles.thumbnail}
      />
      <View style={list_styles.rightContainer}>
        <Text style={list_styles.title}>{entry.title}</Text>
        <Text style={list_styles.year}>{entry.publishedDate}</Text>
      </View>
    </View>
    );
  }
}

//  スタイル
var list_styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap',
    backgroundColor: 'orange'
  },
  year: {
    fontSize: 12,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 53,
    height: 53
  },
  listView: {
    marginTop: Metrics.navBarHeight,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
