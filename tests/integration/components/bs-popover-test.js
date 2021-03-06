import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { test, versionDependent } from '../../helpers/bootstrap-test';
import {
  setupForPositioning,
  assertPositioning
} from '../../helpers/contextual-help';

moduleForComponent('bs-popover', 'Integration | Component | bs-popover', {
  integration: true
});

test('should place popover on top of element', async function(assert) {
  this.render(hbs`<div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Click me{{#bs-popover placement="top" title="very very very very very very very long popover" fade=false}}very very very very very very very long popover{{/bs-popover}}</a></p></div>`);

  setupForPositioning();

  await click('#target');
  assertPositioning(assert, '.popover');
});

test('should adjust popover arrow', async function(assert) {
  let expectedArrowPosition = versionDependent(83, 81);
  this.render(hbs`<div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Click me{{#bs-popover placement="top" title="very very very very very very very long popover" fade=false}}very very very very very very very long popover{{/bs-popover}}</a></p></div>`);

  setupForPositioning();

  await click('#target');
  let arrowPosition = parseInt(find('.arrow').style.left, 10);
  assert.equal(arrowPosition, expectedArrowPosition);

  // check again to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/361
  await click('#target');
  await click('#target');
  arrowPosition = parseInt(find('.arrow').style.left, 10);
  assert.equal(arrowPosition, expectedArrowPosition);
});
