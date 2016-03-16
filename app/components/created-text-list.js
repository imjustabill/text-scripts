import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'padding-top',

  createdTextList: null,

  actions: {
    removeClicked(dataObject) {
      this.get('createdTextList').removeObject(dataObject);
    }
  }

});
