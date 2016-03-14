import Ember from 'ember';

export default Ember.Controller.extend({
  /**
   * Main error handling
   */
  errorList: Ember.A(),

  actions: {
    clearError: function() {
      let errorList = this.get('errorList');
      errorList.clear();
    }
  }
});
