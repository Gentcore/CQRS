var Repository = require('../domain/repository');

function Dispatcher () {
    this.repository = new Repository();
}

Dispatcher.prototype.dispatch = function(handler, cmd, fn) {
  var aggregate = this.repository.load(cmd.aggregateId);
  handler[fn](cmd, aggregate);
};

module.exports = new Dispatcher();
