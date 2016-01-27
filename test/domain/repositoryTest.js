var assert = require('assert'),
    repositoryHelpers = require('../../domain/helpers/repository');
suite('Helper functions for repository class ::', function() {
  setup(function() {
    accounts = [{aggregateId: 1}];
    events = [
      {aggregateId: 2, type: "AccountCreated", seq: 3},
      {aggregateId: 1, type: "AccountCreated", seq: 0},
      {aggregateId: 1, type: "AccountCreated", seq: 2},
      {aggregateId: 1, type: "AccountCreated", seq: 1}
    ];
  });

  suite('Array filtering and sorting ::', function() {
    test('should return true if aggregate exists in array', function() {
      assert.equal(true, repositoryHelpers.assertExists(accounts, 1));
    });
    test('should return false if aggregate does not exist in array', function() {
      assert.equal(false, repositoryHelpers.assertExists(accounts, 2));
    });
    test('should filter the array by aggregate id', function() {
      var filteredArray = repositoryHelpers.filterByAggregate(events, 1);
      assert.equal(filteredArray.length, 3);
    });
    test('should sort an array of events by sequence', function() {
      assert.equal(3, events[0].seq);
      assert.equal(0, events[1].seq);
      assert.equal(2, events[2].seq);
      assert.equal(1, events[3].seq);
      events = repositoryHelpers.sortBySequence(events);
      assert.equal(0, events[0].seq);
      assert.equal(1, events[1].seq);
      assert.equal(2, events[2].seq);
      assert.equal(3, events[3].seq);
    });
    test('get events should return sorted events for one aggregate', function() {
      var sortedEvents = repositoryHelpers.getEventsForAggregate(events, 1);
      assert.equal(3, sortedEvents.length);
      assert.equal(0, sortedEvents[0].seq);
      assert.equal(1, sortedEvents[0].aggregateId);
    });
  });
});
