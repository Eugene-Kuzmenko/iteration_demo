import { Tab } from "semantic-ui-react";
import Counter from "./components/Counter";
import "./styles.css";

const PANES = [
  {
    menuItem: "First",
    render: () => (
      <Tab.Pane>
        <Counter />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Second",
    render: () => <Tab.Pane>placeholder 2</Tab.Pane>
  }
];

export default function App() {
  return (
    <div className="App">
      <Tab panes={PANES} />
    </div>
  );
}
