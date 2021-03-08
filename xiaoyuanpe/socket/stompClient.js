import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let baseUrl = "http://localhost:8080/socket";
export class stompClient {
  constructor() {

  }

  subscribe(url, callback) {
    let socket = new SockJS(baseUrl);
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      stompClient.subscribe(url, val => {
        callback(val);
      });
    });
  }
}

