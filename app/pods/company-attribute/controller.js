import Ember from 'ember';

const DEFAULT_UNIQUE_TYPE = 'NONE';

export default Ember.Controller.extend({
  ticketNumber: null,

  id: null,

  hasParent: false,

  parent: null,

  parentValueForVisibility: null,

  title: null,

  description: null,

  valueType: null,
  valueTypes: Ember.A(['BIG_DECIMAL', 'BIG_INTEGER', 'BOOLEAN', 'BYTE', 'DATE', 'DATE_ONLY', 'DATE_TIME', 'DECIMAL', 'DOUBLE', 'DURATION', 'EXPRESSION', 'FLOAT', 'IMAGE_NAME', 'INTEGER', 'LONG', 'MONEY', 'OBSCURED', 'PERCENT', 'RESOURCE', 'SHORT', 'STORED_CONTENT', 'STRING', 'TIME_ONLY', 'URL']),
  availableValuesList: Ember.A(),
  isAvailableValuesEnabled: Ember.computed('valueType', {
    get() {
      const valueType = this.get('valueType');
      return valueType === 'STRING';
    }
  }),

  defaultValue: null,

  definitionType: 'SYSTEM_FEATURE',
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

  jsonDefinition: Ember.computed('id', 'parent', 'parentValueForVisibility', 'title', 'description', 'valueType',
    'availableValuesList.[]', 'defaultValue', 'definitionType', 'displayOrder', 'isDisplayable', 'isSystemOwnerOnly',
    'groupName', 'sectionName', 'uniqueType', 'validationPattern', 'validationMin', 'validationMax', {
      get() {
        const id = this.get('id');
        const parent = this.get('parent');
        const parentValueForVisibility = this.get('parentValueForVisibility');
        const title = this.get('title');
        const description = this.get('description');
        const valueType = this.get('valueType');
        const availableValuesList = this.get('availableValuesList');
        const defaultValue = this.get('defaultValue');
        const definitionType = this.get('definitionType');
        const displayOrder = this.get('displayOrder');
        const isDisplayable = this.get('isDisplayable');
        const isSystemOwnerOnly = this.get('isSystemOwnerOnly');
        const groupName = this.get('groupName');
        const sectionName = this.get('sectionName');
        const uniqueType = this.get('uniqueType');
        const validationPattern = this.get('validationPattern');
        const validationMin = this.get('validationMin');
        const validationMax = this.get('validationMax');
        let jsonDefinition = {
          id,
          groupName,
          sectionName,
          title,
          description,
          valueType,
          displayOrder,
          displayable: isDisplayable,
          systemOwnerOnly: isSystemOwnerOnly,
          parentValueForVisibility,
          availableValues: availableValuesList,
          validationPattern,
          validationMin,
          validationMax,
          definitionType,
          uniqueType,
          parent,
          defaultValue
        };

        return jsonDefinition;
      }
    }),

  jsonDefinitionString: Ember.computed('jsonDefinition', {
    get() {
      const jsonDefinition = this.get('jsonDefinition');
      return JSON.stringify(jsonDefinition,
        (key, value) => {
          if ((Array.isArray(value) && !value.length) || value === null) {
            return null;
          } else if (key === 'availableValues') {
            const availableValuesObject = {};
            jsonDefinition.availableValues.forEach(availableValue => {
              availableValuesObject[availableValue.key] = availableValue.value;
            });
            return availableValuesObject;
          } else if (key === 'parent') {
            return { id: value };

          } else if (typeof value === 'string') {
            return value.replace(/"/g, '\\"');
          }
          return value;
        },
        2
      );
    }
  }),

  sqlDisplayString: Ember.computed('jsonDefinition', 'ticketNumber', {
    get() {
      const ticketNumber = this.get('ticketNumber');
      const originalJsonDefinition = this.get('jsonDefinition');

      const jsonString = JSON.stringify(originalJsonDefinition,
        (key, value) => {
          if (typeof value === 'string') {
            return `'${value.replace(/'/g, "\'\'")}'`;
          }
          return value;
        },
        2
      );
      const jsonDefinition = JSON.parse(jsonString);
      let sqlDisplayString;

      sqlDisplayString = `INSERT INTO company_attribute_definition (created_ts,deleted,modified_by,modified_by_type,updated_ts,version,parent_name,name,group_name,section_name,title,description,display_order,is_displayable,system_owner_only,validation_pattern,validation_min,validation_max,value_type,definition_type,unique_type,parent_value_for_visibility)
  VALUES (CURRENT_TIMESTAMP,0,'${ticketNumber}','D3SCRIPT',CURRENT_TIMESTAMP,0,${jsonDefinition.parent},${jsonDefinition.id},${jsonDefinition.groupName},${jsonDefinition.sectionName},${jsonDefinition.title},${jsonDefinition.description},${jsonDefinition.displayOrder},${jsonDefinition.isDisplayable ? '1' : '0'},${jsonDefinition.isSystemOwnerOnly ? '1' : '0'},${jsonDefinition.validationPattern},${jsonDefinition.validationMin},${jsonDefinition.validationMax},${jsonDefinition.valueType},${jsonDefinition.definitionType},${jsonDefinition.uniqueType},${jsonDefinition.parentValueForVisibility});`;

      // loop through available values
      if (jsonDefinition.availableValues) {
        jsonDefinition.availableValues.forEach(availableValue => {
          sqlDisplayString = `${sqlDisplayString}\nINSERT INTO company_attribute_values (definition_id,name,description)
  VALUES (${jsonDefinition.id},${availableValue.key},${availableValue.value});`;
        });
      }

      sqlDisplayString = `${sqlDisplayString}\nINSERT INTO company_attribute (created_ts,deleted,modified_by,modified_by_type,updated_ts,version,id,value_string,company_id,definition)
  VALUES (CURRENT_TIMESTAMP,0,'${ticketNumber}','D3SCRIPT',CURRENT_TIMESTAMP,0,(SELECT id+0 FROM id_seq WHERE tbl='company_attribute'),${jsonDefinition.defaultValue},(SELECT id FROM company WHERE source_company_id = 'ROOT'),${jsonDefinition.id});`;
      sqlDisplayString = `${sqlDisplayString}\nUPDATE id_seq SET id=id+1 WHERE tbl='company_attribute';\n`;

      return sqlDisplayString;
    }
  }),

  actions: {
    selectValueType(valueType) {
      this.set('valueType', valueType);
    },
    selectDefinitionType(definitionType) {
      this.set('definitionType', definitionType);
    },
    selectGroupName(groupName) {
      this.set('groupName', groupName);
    },
    selectSectionName(sectionName) {
      this.set('sectionName', sectionName);
    },
    selectValidationPattern(validationPattern){
      this.set('validationPattern', validationPattern);
    },
    selectUniqueType(uniqueType) {
      this.set('uniqueType', uniqueType);
    }
  }

});
