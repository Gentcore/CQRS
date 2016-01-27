var util         = require("util"),
    AggregateRoot = require("./aggregate");

module.exports = Account;
util.inherits(Account, AggregateRoot);

function Account () {
  AggregateRoot.call(this);
}

Account.prototype.applyWithdraw = function(event) {
  this.balance = this.balance - event.amount;
};

Account.prototype.applyDeposit = function(event) {
  this.balance = this.balance + event.amount;
};

Account.prototype.applyAccountCreated = function() {
  this.balance = 0;
};

Account.prototype.withdraw = function(amount) {
  this.applyWithdraw({amount: amount});
  this.emit("Funds-Withdrawn", this);
};

Account.prototype.deposit = function(amount) {
  this.applyDeposit({amount: amount});
  this.emit("Funds-Deposited", this);
};
