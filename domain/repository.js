var util         = require("util"),
    EventEmitter = require("events"),
    Helpers = require("./helpers/repository"),
    Account = require("./aggregates/account");

util.inherits(Repository, EventEmitter);

var database = {
    events: [
    ],
    accounts: [
    ]
};

function Repository () {
    EventEmitter.call(this);
}

Repository.prototype.load = function(aggregateId) {
  if(!Helpers.assertExists(database.accounts, aggregateId))
    throw new Error('Aggregate does not exist');
  var events = Helpers.getEventsForAggregate(aggregateId);
  var aggregate = new Account();
  aggregate.replay(events);
  return aggregate;
};

Repository.prototype.newAccount = function() {
  var newId = database.accounts.length;
  database.accounts.push({aggregateId: newId});
  database.events.push({id: newId, type: "AccountCreated", seq: 0});
  this.emit("Account-Created", newId);
};

module.exports = Repository;
