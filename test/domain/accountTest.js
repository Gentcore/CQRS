var assert = require('assert'),
    Account = require('../../domain/aggregates/account'),
    EventEmitter = require('events').EventEmitter;

suite('Account aggregate tests ::', function() {
  setup(function() {
    accounts = [{aggregateId: 1}];
    events = [
      {aggregateId: 1, type: "AccountCreated", seq: 1}
    ];
    emitter = new EventEmitter();
    account = new Account();
  });

  suite('Account events replay ::', function() {
    test('account creation should set balance to zero', function() {
      assert.equal(account.balance, null);
      account.replay(events);
      assert.equal(account.balance, 0);
    });
    test('account deposit should increase balance', function() {
      events.push({aggregateId: 1, type: "Deposit", amount: 20});
      account.replay(events);
      assert.equal(account.balance, 20);
    });
    test('account withdraw should decrease balance', function() {
      events.push({aggregateId: 1, type: "Deposit", amount: 20});
      events.push({aggregateId: 1, type: "Withdraw", amount: 10});
      account.replay(events);
      assert.equal(account.balance, 10);
    });
    test('account withdraw should decrease balance', function() {
      account.replay(events);
      account.withdraw(10);
      assert.equal(account.balance, -10);
    });
    test('account deposit should increase balance', function() {
      account.replay(events);
      account.deposit(10);
      assert.equal(account.balance, 10);
    });
    test('account withdraw should fire event', function() {
      var withdrawn = false;
      account.on('Funds-Withdrawn', function() {
        withdrawn = true;
      });
      account.replay(events);
      account.withdraw(10);
      assert.equal(withdrawn, true);
    });
    test('account deposit should fire event', function() {
      var deposited = false;
      account.on('Funds-Deposited', function() {
        deposited = true;
      });
      account.replay(events);
      account.deposit(10);
      assert.equal(deposited, true);
    });
  });
});
