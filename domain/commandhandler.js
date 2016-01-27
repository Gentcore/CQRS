var util = require("util"),
    EventEmitter = require("events"),
    Repository = require('../domain/repository');

util.inherits(CommandHandler, EventEmitter);

function CommandHandler () {
    EventEmitter.call(this);
    this.repository = new Repository();
}

CommandHandler.prototype.withdraw = function(command, aggregate) {
  console.log(aggregate);
  // aggregate.withdraw(amount);
};

CommandHandler.prototype.deposit = function(command, aggregate) {
  // aggregate.deposit();
};

CommandHandler.prototype.createAccount = function(command) {
  this.repository.newAccount();
};

module.exports = new CommandHandler();
