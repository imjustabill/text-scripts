import Ember from 'ember';

export default Ember.Component.extend({
  createdTextList: null,

  actions: {
    removeClicked(dataObject) {
      this.get('createdTextList').removeObject(dataObject);
    }
  }

});
