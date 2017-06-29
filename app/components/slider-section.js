import Ember from 'ember';
import numeral from 'numeral';

export default Ember.Component.extend({
  recordsIndex: null,
  qpsIndex: null,

  records: null,
  ops: null,

  displayRecords: Ember.computed('records', function(){
    return numeral(this.get('records')).format('0.000a');
  }),
  displayOps: Ember.computed('ops', function(){
    return numeral(this.get('ops')).format('0.000a');
  }),



});
