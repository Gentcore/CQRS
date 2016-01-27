exports.getEventsForAggregate = function(array, aggregateId) {
  var filtered = this.filterByAggregate(array, aggregateId);
  return this.sortBySequence(filtered);
};

exports.assertExists = function(array, aggregateId) {
  var filtered = this.filterByAggregate(array, aggregateId);
  return filtered.length === 1;
};

exports.filterByAggregate = function(array, aggregateId) {
  return array.filter(function(item) {
    return item.aggregateId === aggregateId;
  });
};

exports.sortBySequence = function(array) {
  return array.sort(function(itemA, itemB){return itemA.seq-itemB.seq;});
};
