import React, { Component } from "react";
import { Alert, StatusBar, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "./actions";

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  time -= minutes * 60;

  let seconds = parseInt(time % 60, 10);
  return `${minutes < 10 ? `0${seconds}` : minutes}: ${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

class Timer extends Component {
  //componentWillreceive props
  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    if (!currentProps.isPlaying && nextProps.isPlaying) {
      //start interval
      const timeInterval = setInterval(() => {
        currentProps.addSecond();
      }, 1000);
      this.setState({ timeInterval });
    } else if (currentProps.isPlaying && !nextProps.isPlaying) {
      //stop interval
      clearInterval(this.state.timeInterval);
    }
  }
  render() {
    const {
      isPlaying,
      elapsedTime,
      timerDuration,
      startTimer,
      restartTimer,
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.upper}>
          <Text style={styles.time}>
            {formatTime(timerDuration - elapsedTime)}{" "}
          </Text>
        </View>
        <View style={styles.lower}>
          {!isPlaying && <Button iconName="play-circle" onPress={startTimer} />}
          {!isPlaying && (
            <Button iconName="stop-circle" onPress={restartTimer} />
          )}
          <Button iconName="map" onPress={() => Alert.alert("Buscando")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lower: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    color: "#ffffff",
    fontSize: 120,
    fontWeight: "100",
  },
});

function mapStateToProps(state) {
  const { isPlaying, elapsedTime, timerDuration } = state;
  return {
    isPlaying,
    elapsedTime,
    timerDuration,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    startTimer: bindActionCreators(actions.startTimer, dispatch),
    restartTimer: bindActionCreators(actions.restartTimer, dispatch),
    addSecond: bindActionCreators(actions.addSecond, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
