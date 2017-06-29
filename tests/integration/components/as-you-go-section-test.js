import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('as-you-go-section', 'Integration | Component | as you go section', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{as-you-go-section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#as-you-go-section}}
      template block text
    {{/as-you-go-section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
