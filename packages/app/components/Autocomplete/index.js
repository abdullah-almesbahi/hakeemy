import React, { createRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import { store } from '../../App';
import { Text } from '..';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      // text: this.props.valueInitial,
      selected: this.props.valueInitial,
      error: true,
      showInitialText: false
    };
    // console.log('props', this.state);
  }

  onFocus() {
    if (this.state.text == this.state.selected && this.state.error)
      this.setState({ error: false });
    else if (this.state.text != this.state.selected && !this.state.error) {
      // this.props.error();
      this.setState({ error: true });
    }
  }
  toLowerCase(text) {
    return text ? text.toLowerCase() : null;
  }
  _listOptions() {
    if (!this.props.array) {
      return null;
    }
    if (this.props.array.length == 0) {
      return null;
    }
    var english = /^[A-Za-z0-9\s]*$/;
    return (
      <View
        style={{
          // position: Platform.OS == 'ios' ? 'absolute' : 'relative',
          position: 'relative',
          zIndex: 9,
          width: '100%',
          top: 0
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handler'
          style={styles.autocomplete}
        >
          {this.props.array
            // .filter(object =>
            //   this.toLowerCase(object[this.props.field]).includes(
            //     this.toLowerCase(this.state.text)
            //   )
            // )
            .map((data, key) => {
              return (
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='Selecciona'
                  style={{ zIndex: 99999999 }}
                  key={data.id}
                  onPress={() => {
                    this.setState({
                      selected: english.test(this.state.text)
                        ? data.name
                        : data.name_arabic,
                      text: english.test(this.state.text)
                        ? data.name
                        : data.name_arabic,
                      error: false
                    });
                    this.props.value(
                      english.test(this.state.text)
                        ? data.name
                        : data.name_arabic
                    );
                  }}
                >
                  <Text style={styles.autocompleteText}>
                    {/* {data[this.props.field]} */}
                    {english.test(this.state.text)
                      ? data.name
                      : data.name_arabic}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  }

  _listInitial() {
    if (!this.props.initialArray) {
      return null;
    }
    if (this.props.initialArray.length == 0) {
      return null;
    }
    var lang = store.getState().language.locale;
    return (
      <View
        style={{
          // position: Platform.OS == 'ios' ? 'absolute' : 'relative',
          // position: 'absolute',
          zIndex: 9,
          width: '100%',
          top: 0
          // borderWidth: 1,
          // borderColor: 'red'
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handler'
          style={styles.autocomplete}
        >
          {this.props.initialArray.map(data => {
            return (
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Selecciona'
                style={{
                  zIndex: 99999999
                }}
                key={data.id}
                activeOpacity={2}
                onPress={() => {
                  this.setState({
                    selected:
                      lang === 'en' ? data.speciality : data.speciality_arabic,
                    text:
                      lang === 'en' ? data.speciality : data.speciality_arabic,
                    error: false
                  });
                  this.props.value(
                    lang === 'en' ? data.speciality : data.speciality_arabic
                  );
                }}
              >
                <Text style={styles.autocompleteText}>
                  {lang === 'en' ? data.speciality : data.speciality_arabic}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={{ position: 'relative' }}>
          <TextInput
            mode={this.props.mode ? this.props.mode : 'outlined'}
            label={this.props.label}
            theme={this.props.theme}
            onKeyPress={this.onFocus()}
            value={this.state.text}
            error={this.state.error}
            onChangeText={text => {
              this.setState({ text });
              this.props.onChangeText(text);
            }}
            onFocus={() => {
              this.setState({ showInitialText: true });
            }}
            // onBlur={() => {
            //   this.setState({ showInitialText: false });
            // }}
          />
          {this.props.loading ? (
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: 20
              }}
            >
              <ActivityIndicator animating={true} color={Colors.red800} />
            </View>
          ) : null}
        </View>

        <View>
          {!this.state.error &&
          this.state.showInitialText &&
          this.state.text == null
            ? this._listInitial()
            : this.state.error
            ? this._listOptions()
            : null}
        </View>
        {/*<View>{this.state.error ? this._listOptions() : null}</View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  autocomplete: {
    // position:"relative",
    elevation: 4,
    backgroundColor: 'white',
    zIndex: 9,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  autocompleteText: {
    zIndex: 9,
    flex: 1,
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  // container: {
  //   zIndex: 1
  // },
  inputContainer: {
    // ...border
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  list: {
    // ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0
  }
});
