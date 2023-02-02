import './App.css';

function Exhibit(props) {
  return (
    <div className="Exhibit">
      <div className="Exhibit-heading">
        {props.heading}
      </div>
      <div className="Exhibit-children">
        {props.children}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        Sextant
      </div>
      <Exhibit heading="Heading here...">
        <div>Hi, there.</div>
        <p>How are you?</p>
        <h2>Yet another test</h2>
        <div>Okay, this is the last element.</div>
        <h2>Just kidding!</h2>
      </Exhibit>
    </div>
  );
}

export default App;
