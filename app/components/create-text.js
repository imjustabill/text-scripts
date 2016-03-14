import Ember from 'ember';

export default Ember.Component.extend({
  createdTextList: null,

  base: 'base.',

  key: 'key.name',

  /**
   * Great example of computed property
   */
  fullKey: Ember.computed('base', 'key', {
    get() {

      const base = this.get('base') || '';
      const key = this.get('key') || '';

      // This is cached until one of the dependent keys is changed
      return base + key;
    }
  }),

  text: 'This is the English Text',

  hasPlaceholder: true,

  placeHolderSuffix: null,

  hasRequired: true,

  requiredErrorText: null,

  requiredPrefix: null,

  requiredSuffix: null,

  ticketNumber: 'DDB-1234',

  createTextObjects: function() {
    let keyObjects = Ember.A();
    let key = {
      base: this.base || '',
      key: this.key || '',
      text: this.text || '',
      ticketNumber: this.ticketNumber || '',
      hasRequired: this.hasRequired,
      hasPlaceholder: this.hasPlaceholder,
      placeHolderText: this.placeHolderText || ''
    };

    if (this.hasRequired) {
      key.hasRequired = true;
      key.requiredPrefix = this.requiredPrefix ? this.requiredPrefix : 'validate.';
      key.requiredSuffix = this.requiredSuffix ? this.requiredSuffix : '.required';
      key.requiredErrorText = this.requiredErrorText ? this.requiredErrorText : ' is required.';
    }

    if (this.hasPlaceholder) {
      key.hasPlaceholder = true;
      key.placeholderSuffix = this.placeHolderSuffix ? this.placeHolderSuffix : '.text';
    }

    keyObjects.push(key);
    return keyObjects;
  },

  resetForm: function() {
    this.set('key', null);
    this.set('text', null);
    this.set('hasPlaceholder', false);
    this.set('hasRequired', false);
    this.set('requiredErrorText', null);
    this.set('placeHolderText', null);
  },

  actions: {
    addClicked() {
      let keyObjects = this.createTextObjects();
      this.createdTextList.pushObjects(keyObjects);
    },
    addResetClicked() {
      let keyObjects = this.createTextObjects();
      this.createdTextList.pushObjects(keyObjects);
      this.resetForm();
    },
    resetClicked() {
      this.resetForm();
    }
  }
});
