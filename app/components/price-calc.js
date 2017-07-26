import Ember from 'ember';

export default Ember.Component.extend({
  records: 50000,
  ops: 100000,

  recordsObserver: Ember.observer('records', function(){
  }),

  displayRecords: Ember.computed('records', function(){
    return numeral(this.get('records')).format('0.000a');
  }),
  displayOps: Ember.computed('ops', function(){
    return numeral(this.get('ops')).format('0.000a');
  }),


});
