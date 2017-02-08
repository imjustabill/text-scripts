import Ember from 'ember';

const bundleTypeDefault = 'ui';

export default Ember.Component.extend({
  bundleType: bundleTypeDefault,
  bundleTypes: Ember.A([bundleTypeDefault, 'server', 'watch', 'security']),

  actions: {
    selectBundleType(bundleType) {
      this.set('bundleType', bundleType);
    }
  }
});
