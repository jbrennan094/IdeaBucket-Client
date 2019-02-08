import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';
import { CardSection, Input } from '../common';
import { Button } from 'react-native-elements'
import { WebBrowser } from 'expo';
import { sendInstallationId, teamInfo, emailChanged, passwordChanged, apiTest, createProject, updateProject, deleteProject } from '../../actions';



import { MonoText } from '../StyledText';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Idea Bucket',
  };

  constructor () {
    super()
    this.state = {
      isOpen: false
    }
  }

onEmailChange(text) {
  this.props.emailChanged(text);
}

onPasswordChange(text) {
  this.props.passwordChanged(text);
}

testApi() {
  this.props.apiTest();
}

createProject() {
  const { email, password } = this.props
  this.props.createProject(email, password);
}

updateProject() {
  const { email, password } = this.props
  this.props.updateProject(email, password);
}

deleteProject() {
  const { email } = this.props
  this.props.deleteProject(email);
}

teamInfo() {
  this.props.teamInfo();
}

componentDidMount(){
  const queryString = require('query-string');
  // var getParams = function (url) {
  //     var params = {};
  //     var parser = document.createElement('a');
  //     parser.href = url;
  //     var query = parser.search.substring(1);
  //     var vars = query.split('&');
  //     for (var i = 0; i < vars.length; i++) {
  //         var pair = vars[i].split('=');
  //         params[pair[0]] = decodeURIComponent(pair[1]);
  //     }
  //     return params;
  // };

  const url = 'https://ideabucket.herokuapp.com/qr_code_image/?team_id=MEGULO_TEAM&user_id=MEGULO_USER';
  const output = queryString.parseUrl(url);

  const team_id = output.query.team_id;
  const user_id = output.query.user_id;
  const installationId = Expo.Constants.installationId;
  console.log(team_id);
  console.log(user_id);
  console.log(installationId);
  this.props.sendInstallationId(installationId);
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
}

  render() {
    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.getStartedText}>
                Welcome to the Idea Bucket!
              </Text>
                <View style={{width:300, alignSelf: 'center'}}>
                  <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', borderBottomWidth: 0}}>
                    <Input
                      label="Name"
                      placeholder="Awesome Project"
                      onChangeText={this.onEmailChange.bind(this)}
                      value={this.props.email}
                      style={{backgroundColor:'#fff'}}
                    />
                  </CardSection>
                  <CardSection style={{backgroundColor:'rgba(224, 0, 48, 0)', borderBottomWidth: 0}}>
                    <Input
                      label="Description"
                      placeholder="An awesome app..."
                      secureTextEntry={true}
                      onChangeText={this.onPasswordChange.bind(this)}
                      value={this.props.password}
                      style={{backgroundColor:'#fff'}}
                    />
                  </CardSection>
                </View>
              <Button
              onPress={this.testApi.bind(this)}
              title='READ' />
              <Button
              onPress={this.createProject.bind(this)}
              title='CREATE' />
              <Button
              onPress={this.updateProject.bind(this)}
              title='UPDATE' />
              <Button
              onPress={this.deleteProject.bind(this)}
              title='DELETE' />
              <Button
              onPress={this.teamInfo.bind(this)}
              title='TEAM INFO' />
            </View>
          </ScrollView>
        </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00c5cd',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(255,255,255, 1)',
    lineHeight: 28,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

HomeScreen.propTypes = {

};

const mapStateToProps = (state) => {
  const { email, password } = state.auth;
  return { email, password };
};

export default connect(mapStateToProps,{ sendInstallationId, teamInfo, emailChanged, passwordChanged, apiTest, createProject, updateProject, deleteProject })(HomeScreen);
