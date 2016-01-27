var util = require("util"),
    EventEmitter = require("events").EventEmitter;

module.exports = AggregateRoot;
util.inherits(AggregateRoot, EventEmitter);

function AggregateRoot () {
  EventEmitter.call(this);
}

AggregateRoot.prototype.replay = function(events) {
  for(var i = 0; i < events.length; i++) {
    var event = events[i],
    fn = "apply" + event.type;
    this[fn](event);
  }
};
