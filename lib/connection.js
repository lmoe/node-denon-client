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

    this.socket.on('data', () => {
      this.emit('data', data);
    });

    this.socket.on('close', () => {
      this.emit('close');
    });

    this.socket.on('error', (error) => {
      this.emit('error', error);
    });

    this.socket.on('connect', () => {
      this.emit('connect');
    })
  }

  write(command) {
    return new Promise((resolve) => {
      this.socket.write(`${command}\r`, 'ascii', resolve);
    });
  }

  connect()
  {
    return new Promise((resolve, reject) => {
      this.socket.once('connect', () => {
        resolve();
        this.socket.removeListener('error', reject);
      });
      this.socket.once('error', (error) => {
        reject(error);
        console.log("Handled")
        this.socket.removeListener('connect', resolve);
      });

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
