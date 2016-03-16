import Ember from 'ember';

export default Ember.Component.extend({
  createdTextList: null,

  base: null,

  key: null,

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

  text: null,

  hasPlaceholder: false,

  placeholderSuffix: null,

  placeholderSuffixComputed: Ember.computed('placeholderSuffix', {
    get() {
      const placeholderSuffix = this.get('placeholderSuffix');
      return placeholderSuffix ? placeholderSuffix : '.text';
    }
  }),

  placeholderText: null,

  placeholderTextComputed: Ember.computed('placeholderText', 'text', {
    get() {
      const placeholderText = this.get('placeholderText');
      const text = this.get('text') || '';
      return placeholderText ? placeholderText : text;
    }
  }),

  fullPlaceholderKey: Ember.computed('fullKey', 'placeholderSuffixComputed', {
    get() {
      const fullKey = this.get('fullKey');
      const placeholderSuffixComputed = this.get('placeholderSuffixComputed');
      return fullKey + placeholderSuffixComputed;
    }
  }),

  requiredKeyDisplay: Ember.computed('base', 'key', 'requiredErrorTextComputed', 'requiredPrefixComputed', 'requiredSuffixComputed', {
    get() {
      const base = this.get('base') || '';
      const key = this.get('key') || '';
      const requiredErrorTextComputed = this.get('requiredErrorTextComputed');
      const requiredPrefixComputed = this.get('requiredPrefixComputed');
      const requiredSuffixComputed = this.get('requiredSuffixComputed');
      return `${base}${requiredPrefixComputed}${key}${requiredSuffixComputed} = ${requiredErrorTextComputed}`;
    }
  }),

  hasRequired: false,

  requiredErrorText: null,

  requiredErrorTextComputed: Ember.computed('requiredErrorText', 'text', {
    get() {
      const requiredErrorText = this.get('requiredErrorText');
      const text = this.get('text') || '';
      return requiredErrorText ? requiredErrorText : text + ' is required.';
    }
  }),

  requiredPrefix: null,

  requiredPrefixComputed: Ember.computed('requiredPrefix', {
    get() {
      const requiredPrefix = this.get('requiredPrefix');
      return requiredPrefix ? requiredPrefix : 'validate.';
    }
  }),

  requiredSuffix: null,

  requiredSuffixComputed: Ember.computed('requiredSuffix', {
    get() {
      const requiredSuffix = this.get('requiredSuffix');
      return requiredSuffix ? requiredSuffix : '.required';
    }
  }),

  ticketNumber: 'DDB-1234',

  createTextObjects: function() {
    const keyObjects = Ember.A();
    const key = {
      base: this.base || '',
      key: this.key || '',
      text: this.text || '',
      ticketNumber: this.get('ticketNumber') || '',
      hasRequired: this.get('hasRequired'),
      hasPlaceholder: this.get('hasPlaceholder')
    };

    if (this.hasRequired) {
      key.hasRequired = true;
      key.requiredPrefix = this.get('requiredPrefixComputed');
      key.requiredSuffix = this.get('requiredSuffixComputed');
      key.requiredErrorText = this.get('requiredErrorTextComputed');
    }

    if (this.hasPlaceholder) {
      key.hasPlaceholder = true;
      key.placeholderText = this.get('placeholderTextComputed');
      key.placeholderSuffix = this.get('placeholderSuffixComputed');
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
    this.set('placeholderText', null);
  },

  actions: {
    addClicked() {
      let keyObjects = this.createTextObjects();
      this.get('createdTextList').pushObjects(keyObjects);
    },
    addResetClicked() {
      let keyObjects = this.createTextObjects();
      this.get('createdTextList').pushObjects(keyObjects);
      this.resetForm();
    },
    resetClicked() {
      this.resetForm();
    }
  }
});
