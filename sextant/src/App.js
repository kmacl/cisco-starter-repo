import './App.css';
import React from 'react';

class IPDisplay extends React.Component {
  state = {ip: "Loading..."}
  render() {
    return (
      <div className="IPDisplay">
        IPV{this.props.v6 ? "6" : "4"}: {this.state.ip}<br/>
      </div>
    );
  }
  componentDidMount() {
    var ip_addr = this.state.ip;
    var url = "https://api" + (this.props.v6 ? "64" : "") + ".ipify.org";
    fetch(url)
      .then((resp) => resp.text())
      .then((text) => {
        this.setState({ip: text})
      });
  }
}

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
        <IPDisplay/>
        <IPDisplay v6="true"/>
      </Exhibit>
    </div>
  );
}

export default App;
