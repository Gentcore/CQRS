var express = require('express'),
    router = express.Router(),
    CommandHandler = require('../domain/commandhandler'),
    WithdrawCommand = require('../domain/commands/WithdrawCommand'),
    DepositCommand = require('../domain/commands/DepositCommand'),
    CreateAccountCommand = require('../domain/commands/CreateAccountCommand'),
    Dispatcher = require('../domain/dispatcher');

router.post('/withdraw', function(req, res, next) {
  var command = new WithdrawCommand(req.body);
  Dispatcher.dispatch(CommandHandler, command, 'withdraw');
  res.end('Funds Withdrawn');
});

router.post('/deposit', function(req, res, next) {
  var command = new DepositCommand(req.body);
  Dispatcher.dispatch(CommandHandler, command, 'deposit');
  res.end('Funds Deposited');
});

router.post('/create', function(req, res, next) {
  var command = new CreateAccountCommand();
  CommandHandler.createAccount(command);
  res.end('Account Created');
});

module.exports = router;
