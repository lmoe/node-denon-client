'use strict';
const net = require('net');
const EventEmitter = require('events');
const Promise = require('bluebird');

class Connection extends EventEmitter {

  get host() {
    return this._host;
  }

  get socket() {
    return this._socket;
  }

  constructor(host) {
    super();

    this._host = host;
    this._socket = new net.Socket();

    this.socket.setEncoding('ascii');
    this.socket.on('data', this.onData.bind(this));
    this.socket.on('close', this.onClose.bind(this));
    this.socket.on('error', this.onError.bind(this));
  }

  write(command) {
    return new Promise((resolve) => {
      this.socket.write(`${command}\r`, 'ascii', resolve);
    });
  }

  onData(data) {
    this.emit('data', data);
  }

  onClose() {
    this.emit('close');
  }

  onError(error) {
    this.emit('error', error);
  }

  connect()
  {
    return new Promise((resolve, reject) => {
      this.socket.once('connect', resolve);
      this.socket.once('error', reject);

      try {
        this.socket.connect(23, this.host);
      } catch(ex) {
        console.log("Oh")
        console.log(ex);
      }
    });
  }

  disconnect()
  {
    this.socket.end();
  }
}

module.exports = Connection;
