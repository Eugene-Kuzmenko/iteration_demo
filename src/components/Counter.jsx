import React, { memo, PureComponent } from "react";
import Iterator from "./Iterator";

const initialState = { count: 0 };

export default class Counter extends PureComponent {
  state = initialState;

  iterate = async (wait) => {
    this.setState(initialState);
    try {
      for (let i = 0; i < 10; i++) {
        await wait();
        this.setState((state) => ({ count: state.count + 1 }));
      }
    } catch (e) {
      if (e != "stopped") throw e;
    }
  };

  render() {
    const { count } = this.state;
    return <Iterator iterate={this.iterate}>{count}</Iterator>;
  }
}
