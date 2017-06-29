import Ember from 'ember';

export default Ember.Component.extend({
  records: 0,
  ops: 0,
  
  eligible: Ember.computed('records', 'ops', function() {
    return this.get('records') > 500000 ||  this.get('ops') > 1500000
  }),

  displayRecords: Ember.computed('records', function(){
    return numeral(this.get('records')).format('0.000a');
  }),
  displayOps: Ember.computed('ops', function(){
    return numeral(this.get('ops')).format('0.000a');
  }),

  totalCost: Ember.computed('costRecords', 'costOps', function(){
    return this.get('costOps') + this.get('costRecords');
  }),
  totalCostDisplay: Ember.computed('totalCost', function(){
    return numeral(this.get('totalCost')).format('$0,0.00');
  }),

  costRecords: Ember.computed('ops', 'records', function(){
    // return (this.get('records')/20000 * 10*(1-this.get('recordsDiscount'))) + (this.get('ops')/50000 * 5);
    return (this.get('records')/20000 * 10*(1-this.get('recordsDiscount')));
  }),
  costOps: Ember.computed('ops', 'records', function(){
    // return (this.get('records')/20000 * 10*(1-this.get('recordsDiscount'))) + (this.get('ops')/50000 * 5);
    return (this.get('ops')/50000 * 5*(1-this.get('opsDiscount')));
  }),

  recordsDiscount: Ember.computed('records', function(){
    var tranchesOverMin = ((this.get('records') - 200000)/20000) - 1;
    if(tranchesOverMin < 0){
      return 0;
    }
    return .15 + (tranchesOverMin*0.00103);
  }),

  opsDiscount: Ember.computed('ops', function(){
    var tranchesOverMin = ((this.get('ops') - 500000)/50000) - 1;
    if(tranchesOverMin < 0){
      return 0;
    }
    return .15 + (tranchesOverMin*0.00025);
  }),

  recordCostPerTranche: Ember.computed('records', function(){
    return 10*(1-this.get('recordsDiscount'));
  }),
  opsCostPerTranche: Ember.computed('ops', function(){
    return 5*(1-this.get('opsDiscount'));
  }),

  recordCostPerTrancheDisplay: Ember.computed('recordCostPerTranche', function() {
    return numeral(this.get('recordCostPerTranche')).format('$0,0.00');
  }),
  opsCostPerTrancheDisplay: Ember.computed('opsCostPerTranche', function() {
    return numeral(this.get('opsCostPerTranche')).format('$0,0.00');
  }),


});
