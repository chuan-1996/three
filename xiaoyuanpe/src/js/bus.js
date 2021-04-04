function EventBus () {}

EventBus.prototype.on = function (name, callback) {
  // 如果没有事件对象，新增一个
  if (!this._events) {
    // 创建一个干净的没有原型链的对象
    this._events = Object.create(null)
  }
  // 如果没有这个事件的订阅，新增一个，如果有，push进去
  if (!this._events[name]) {
    this._events[name] = [callback]
  } else {
    this._events[name].push(callback)
  }
}

EventBus.prototype.emit = function (name, ...args) {
  // 发布的时候，如果有这个事件，循环执行所有这个订阅的方法
  if (this._events[name]) {
    this._events[name].forEach(callback => {
      callback(...args)
    })
  }
}

EventBus.prototype.off = function (name) {
  // 如果有这个事件的订阅，清除所有订阅
  if (this._events[name]) {
    delete this._events[name]
  }
}

EventBus.prototype.once = function (name, callback) {
  let once = (...args) => {
    callback(...args)
    this.off(name)
  }
  this.on(name, once)
}

const eventBus = new EventBus()
export {eventBus}
