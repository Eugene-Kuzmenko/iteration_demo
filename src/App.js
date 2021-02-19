import { Tab } from "semantic-ui-react";
import Iterator from "./components/Iterator";
import "./styles.css";

const PANES = [
  {
    menuItem: "First",
    render: () => (
      <Tab.Pane>
        <Iterator>placeholder 1</Iterator>
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
