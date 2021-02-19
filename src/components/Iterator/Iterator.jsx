import React, { PureComponent } from "react";
import { Button, Icon } from "semantic-ui-react";
import styles from "./Iterator.module.scss";

class Iterator extends PureComponent {
  static defaultProps = {
    interval: 1000,
    iterate: () => {}
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

  play = () => {
    const { interval, iterate } = this.props;
    setInterval(this.step, interval);
    iterate(this.wait);
  };
  step = () => {
    if (this.resolve) this.resolve();
  };
  wait = () => {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  };
  pause = () => {
    clearInterval(this.step);
  };
  stop = () => {
    if (this.reject) reject("stopped");
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
