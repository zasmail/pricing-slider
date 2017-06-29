import Ember from 'ember';

export default Ember.Component.extend({
  input: null,
  newVal: null,
  maxVal: null,
  increment: null,
  focusIn: false,
  iden: null,

  inputObserver: Ember.on('init', Ember.observer('input', function(){
    this.set('newVal', this.get('input'));
  })),

  focusObserver: Ember.on('didInsertElement', function(){
    $("#"+ this.get('iden')).focusout(function(){
      this.set('focusIn', false);
      console.log("out")
      var tryVal = Math.ceil( this.get('newVal')/this.get('increment')) * this.get('increment');
      if(tryVal <= this.get('maxVal')){
        this.set('input', tryVal);
      } else {
        this.set('input', maxVal);
      }

    }.bind(this));
    $("#"+ this.get('iden')).focusin(function(){
      this.set('focusIn', true);
      console.log("in")
    }.bind(this));
  }),

  keyDown: function(e) {
    if(this.get('focusIn')){
      if(e.keyCode == 40 || e.keyCode == 37){
        //down
        if(this.get('input') > this.get('increment')){
          this.set('input', this.get('input') - this.get('increment'));
        }
      }
      if(e.keyCode == 38 || e.keyCode == 39){
        if(this.get('input') < this.get('maxVal')){
          this.set('input', this.get('input') + this.get('increment'));
        }

        //up
      }
    }
    // this.get('controller').send('updateKey', e.keyCode);
  },

  actions:{
    focused: function(){
      debugger;
    }
  }



});
