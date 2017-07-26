import Ember from 'ember';

export default Ember.Component.extend({
  records: 0,
  ops: 0,
  baseDiscount: 0,
  minDiscountThresholdRecords: 0,
  minDiscountThresholdOps: 0,
  recordsTranche: 0,
  opsTranche: 0,
  recordsDiscountMultiplier: 0,
  opsDiscountMultiplier: 0,
  recordsTrancheCost: 0,
  opsTrancheCost: 0,
  monthlyOption: false,
  
  annualOption: Ember.computed.not('monthlyOption'),

  eligible: Ember.computed('records', 'ops', function() {
    return this.get('records') >= this.get('minDiscountThresholdRecords') ||  this.get('ops') >= this.get('minDiscountThresholdOps');
  }),

  displayRecords: Ember.computed('records', function(){
    return numeral(this.get('records')).format('0.000a');
  }),
  displayOps: Ember.computed('ops', function(){
    return numeral(this.get('ops')).format('0.000a');
  }),

  recordsDiscount: Ember.computed('records', 'baseDiscount', function(){
    var tranchesOverMin = ((this.get('records') - this.get('minDiscountThresholdRecords') + this.get('recordsTranche'))/this.get('recordsTranche')) - 1;
    if(tranchesOverMin < 0){
      return 0;
    }
    return this.get('baseDiscount') + (tranchesOverMin*this.get('recordsDiscountMultiplier'));
  }),

  opsDiscount: Ember.computed('ops', 'baseDiscount', function(){
    var tranchesOverMin = ((this.get('ops') - this.get('minDiscountThresholdOps') + this.get('opsTranche'))/this.get('opsTranche')) - 1;
    if(tranchesOverMin < 0){
      return 0;
    }
    return this.get('baseDiscount') + (tranchesOverMin*this.get('opsDiscountMultiplier'));
  }),

  recordCostPerTranche: Ember.computed('recordsTrancheCost', 'baseDiscount', 'records', 'ops', function(){
    return this.get('recordsTrancheCost')*(1-this.get('recordsDiscount'));
  }),
  opsCostPerTranche: Ember.computed('opsTrancheCost', 'baseDiscount', 'records', 'ops', function(){
    return this.get('opsTrancheCost')*(1-this.get('opsDiscount'));
  }),

  costRecords: Ember.computed('ops', 'records', 'recordsTranche', 'recordsTrancheCost', 'recordsDiscount', function(){
    return (this.get('records')/this.get('recordsTranche') * this.get('recordsTrancheCost')*(1-this.get('recordsDiscount')));
  }),
  costOps: Ember.computed('ops', 'records', 'opsTranche', 'opsTrancheCost', 'opsDiscount', function(){
    return (this.get('ops')/this.get('opsTranche') * this.get('opsTrancheCost')*(1-this.get('opsDiscount')));
  }),

  totalCost: Ember.computed('costRecords', 'costOps', 'records', 'ops', function(){
    return this.get('costOps') + this.get('costRecords');
  }),
  totalCostDisplay: Ember.computed('totalCost', function(){
    return numeral(this.get('totalCost')).format('$0,0.00');
  }),
  annualCostDisplay: Ember.computed('totalCost', function(){
    return numeral((this.get('costOps')*12) + (this.get('costRecords')*12)).format('$0,0.00');
  }),

  recordCostPerTrancheDisplay: Ember.computed('recordCostPerTranche', function() {
    return numeral(this.get('recordCostPerTranche')).format('$0,0.00');
  }),
  opsCostPerTrancheDisplay: Ember.computed('opsCostPerTranche', function() {
    return numeral(this.get('opsCostPerTranche')).format('$0,0.00');
  }),


});
