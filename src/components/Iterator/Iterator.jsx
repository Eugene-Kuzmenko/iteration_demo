import React, { PureComponent } from "react";
import { Button, Icon } from "semantic-ui-react";
import styles from "./Iterator.module.scss";

class Iterator extends PureComponent {
  static defaultProps = {
    interval: 1000
  };

  state = {
    isPlaying: false
  };

  renderButton(name, onClick) {
    return (
      <Button onClick={onClick}>
        <Button.Content>
          <Icon name={name} />
        </Button.Content>
      </Button>
    );
  }

  interval = null;
  resolve = null;
  reject = null;

  startIteration = () => {
    const { iterate } = this.props;
    if (!this.resolve && iterate)
      iterate(this.wait).then(() => {
        if (this.state.isPlaying) this.setState({ isPlaying: false });
        clearInterval(this.interval);
        this.resolve = null;
        this.reject = null;
      });
  };
  play = () => {
    const { interval } = this.props;
    this.startIteration();
    this.setState({ isPlaying: true });
    this.interval = setInterval(this.step, interval);
  };
  step = () => {
    this.startIteration();
    if (this.resolve) this.resolve();
  };
  wait = () => {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  };
  pause = () => {
    clearInterval(this.interval);
    this.setState({ isPlaying: false });
  };
  stop = () => {
    if (this.reject) this.reject("stopped");
    if (this.state.isPlaying) this.setState({ isPlaying: false });
    clearInterval(this.interval);
    this.resolve = null;
    this.reject = null;
  };

  render() {
    const { children } = this.props;
    const { isPlaying } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.display}>{children}</div>
        <div className={styles.controls}>
          {this.renderButton("stop", this.stop)}
          {isPlaying
            ? this.renderButton("pause", this.pause)
            : this.renderButton("play", this.play)}
          {this.renderButton("step forward", this.step)}
        </div>
      </div>
    );
  }
}

export default Iterator;
