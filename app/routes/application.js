import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(error, errorList) {
      // TODO get error list from controller
      errorList = ['route error !!!!'];
      errorList.pushObjects(errorList);
    }
  }
});
