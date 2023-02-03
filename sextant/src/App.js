import './App.css';
import React from 'react';

var W3CWebSocket = require('websocket').w3cwebsocket;

class IPDisplay extends React.Component {
  state = {ip: "Loading..."}
  render() {
    return (
      <div className="Data-point">
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

class PacketLatency extends React.Component {
  state = {latency: -1, socket: null}
  render() {
    var lat = this.state.latency;
    return (
      <div className="Data-point">
        Packet Latency: {lat >= 0 ? "" + lat + "ms" : "Loading..."}
      </div>
    );
  }
  componentDidMount() {
    var socket = new W3CWebSocket("ws://localhost:55455");
    var comp = this;
    socket.onerror = (err) => console.log('Connection Error: ' + err.toString());
    socket.onopen = (connection) => {
      comp.setState({latency: -1, socket: socket});
      console.log('WebSocket Connected');
    };
    socket.onclose = () => {
      comp.setState({latency: -1, socket: null});
      console.log('WebSocket Connection Closed');
    };
    socket.onmessage = (message) => {
      var lat = Date.now() - message.data;
      comp.setState({latency: lat, socket: socket});
    };
  }
  componentWillUnmount() {
    console.log("disconnect");
    if (this.state.socket) this.state.socket.close();
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
      <Exhibit heading="IP Addresses & Packet Latency">
        <IPDisplay/>
        <IPDisplay v6="true"/>
        <PacketLatency/>
      </Exhibit>
    </div>
  );
}

export default App;
