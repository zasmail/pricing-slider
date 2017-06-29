import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('monthly-commit', 'Integration | Component | monthly commit', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{monthly-commit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#monthly-commit}}
      template block text
    {{/monthly-commit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
