import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const Base64 = require('js-base64').Base64;

let baseUrl = "http://localhost:8080/socket";
export class stompClient {
  subscribe(url, callback, failcallback = null) {
    let socket = new SockJS(baseUrl);
    let stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, frame => {
      stompClient.subscribe(url, val => {
        let res = JSON.parse(val.body);
        if (res.code === 200) {
          let decode = Base64.decode(res.data);
          let data = JSON.parse(decode);
          callback(data);
        } else {
          if (failcallback) {
            failcallback(res.msg);
          }
        }
      });
    });
  }
}

export function initStomp() {
  let client = new stompClient().subscribe('/topic/price', val => {
    this.list1 = val;
  });
  let client2 = new stompClient().subscribe('/topic/price-fast', val => {
    this.list2 = val;
  });
}
