import Ember from 'ember';

const DEFAULT_UNIQUE_TYPE = 'NONE';

export default Ember.Controller.extend({
  ticketNumber: null,

  id: null,

  hasParent: false,

  parent: null,

  parentValueForVisibility: null,

  title: null,

  valueType: null,
  valueTypes: Ember.A(['BIG_DECIMAL', 'BIG_INTEGER', 'BOOLEAN', 'BYTE', 'DATE', 'DATE_ONLY', 'DATE_TIME', 'DECIMAL', 'DOUBLE', 'DURATION', 'EXPRESSION', 'FLOAT', 'IMAGE_NAME', 'INTEGER', 'LONG', 'MONEY', 'OBSCURED', 'PERCENT', 'RESOURCE', 'SHORT', 'STORED_CONTENT', 'STRING', 'TIME_ONLY', 'URL']),
  availableValuesList: Ember.A(),
  hasAvailableValues: Ember.computed('valueType', {
    get() {
      const valueType = this.get('valueType');
      return valueType === 'STRING';
    }
  }),

  defaultValue: null,

  definitionType: null,
  definitionTypes: Ember.A(['SYSTEM_FEATURE', 'SINGULAR']),

  displayOrder: null,

  isDisplayable: true,

  isSystemOwnerOnly: false,

  groupName: null,
  groupNames: Ember.A([null, 'Accounts', 'Banking Login', 'Control Login', 'Core', 'Dashboard', 'Data Retention', 'Messages', 'Money Movement', 'Open Financial eXchange', 'Planning', 'Rewards', 'Security', 'Self Service', 'Settings', 'System', 'Transactions']),

  sectionName: null,
  sectionNames: Ember.A([null, 'Account Opening', 'Accounts', 'ACH', 'Aggregate Other FI Accounts', 'Alerts', 'Authentication', 'Banking Login', 'Bill Pay', 'Biometric Authentication', 'Brokerage Access', 'Budgets', 'Categories', 'Challenge Adapters', 'Check Image', 'Check Orders', 'Client App Information', 'Conduit', 'Conduit System Alerts', 'Core Live', 'Core Live System Alerts', 'D3 Banking', 'D3 Banking Dashboard', 'D3 Control', 'Data Retention', 'Database Alerts', 'Direct Connect', 'E-Bill', 'E-Statements', 'Elasticsearch', 'Encryption', 'Expired User Sessions', 'External Security', 'FAQ', 'Fee Billing', 'First Tennessee SSO', 'Forgot Password', 'General', 'Generic Alerts', 'Goals', 'Hide Accounts', 'iLodo Contract Web Service', 'Inactive User Definition', 'Inactive Users', 'Internal User Alerts', 'LDAP Authentication', 'Locations Search', 'Management Adapters', 'Messages', 'Mobile', 'Mobile Enrollment', 'Money Movement', 'Money Movement Service System Alerts', 'On Us Transfer', 'Open Financial eXchange', 'Out Of Band Verification', 'Overdraft Protection', 'P2P', 'Password', 'Password Reset', 'Past Due Highlighting', 'Pay Multiple', 'Planning', 'Profile', 'RDC', 'Recipients', 'Request Forms', 'Rewards', 'RSA', 'Rules', 'Scheduled Pay', 'Scheduled Transfer', 'Security', 'Self Enrollment', 'Self Service', 'Settings', 'Shadow Assist', 'Snapshot', 'Stop Payment', 'Support Information', 'Synchronization', 'System Alerts', 'Tax Forms', 'Transactions', 'User Account Change', 'User Attributes', 'User Enrollment', 'User History Migration Job', 'User Name', 'User Session', 'User Sync Operations', 'Web Connect']),

  uniqueType: DEFAULT_UNIQUE_TYPE,
  uniqueTypes: Ember.A([DEFAULT_UNIQUE_TYPE, 'GLOBAL']),

  validationPattern: null,

  validationPatterns: Ember.A([null, '[ -~]{0,10}', '[ -~]{0,16}', '[ -~]{0,20}', '[ -~]{0,23}', '[ -~]{0,80}', '[ ]*([1-9]+[0-9]*[dhms][ ])*([1-9]+[0-9]*[dhms])[ ]*', '[0-9]{9}', '[0-9]*(|\.[0-9]{0,2})', '[0-9A-Za-z]{10}', '^([0-9]|0[0-9]|1[0-2]):[0-5][0-9] [aApP][mM]$|^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$']),

  validationMin: null,

  validationMax: null,

  actions: {
    selectValueType(valueType)
    {
      this.set('valueType', valueType);
    },
    selectDefinitionType(definitionType)
    {
      this.set('definitionType', definitionType);
    },
    selectGroupName(groupName)
    {
      this.set('groupName', groupName);
    },
    selectSectionName(selectionName)
    {
      this.set('selectionName', selectionName);
    },
    selectValidationPattern(validationPattern)
    {
      this.set('validationPattern', validationPattern);
    },
    selectUniqueType(uniqueType)
    {
      this.set('uniqueType', uniqueType);
    }
  }

});
