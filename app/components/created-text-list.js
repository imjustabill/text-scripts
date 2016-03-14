import Ember from 'ember';

export default Ember.Component.extend({
  createdTextList: null,

  actions: {
    removeClicked(dataObject) {
      this.createdTextList.removeObject(dataObject);
    }
  }

});
