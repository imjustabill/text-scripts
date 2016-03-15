import Ember from 'ember';

export default Ember.Controller.extend({

  createdTextList: Ember.A(),

  /**
   * This is not efficient, but shows the idea of computed properties (but not so much caching)
   * The problem is each change requires a complete loop through everything
   * This does make removal easier since there can be multiple for one add
   */
  csvList: Ember.computed('createdTextList.[]', {
    get() {
      let csvList = Ember.A();
      let createdTextList = this.get('createdTextList');
      createdTextList.forEach(function(textObject) {
        let csv = `"${textObject.base}${textObject.key}","${textObject.text}",""`;
        csvList.pushObject(csv);
        if (textObject.hasRequired) {
          let keyName = `${textObject.base}${textObject.requiredPrefix}${textObject.key}${textObject.requiredSuffix}`;
          let csvRequired = `"${keyName}","${textObject.text} ${textObject.requiredErrorText}",""`;
          csvList.pushObject(csvRequired);
        }
        if (textObject.hasPlaceholder) {
          let placeHolderKeyname = `${textObject.base}${textObject.key}${textObject.placeholderSuffix}`;
          let csvPlaceholder = `"${placeHolderKeyname}","${textObject.placeHolderText}",""`;
          csvList.pushObject(csvPlaceholder);
        }
      });
      return csvList;
    }
  }),

  /**
   * This is not efficient, but shows the idea of computed properties (but not so much caching)
   * The problem is each change requires a complete loop through everything
   * This does make removal easier since there can be multiple for one add
   */
  sqlList: Ember.computed('createdTextList.[]', {
    get() {
      let sqlList = Ember.A();
      let createdTextList = this.get('createdTextList');
      let queryCount = 0;
      createdTextList.forEach(function(textObject) {

        let key = `${textObject.base}${textObject.key}`;
        let sql = `insert into l10n_text_resource (id, created_ts, deleted, updated_ts, modified_by, modified_by_type, version, digest_value, name, local_value, bundle_id, company_id, locale_id)
          values ((select id+${queryCount} from id_seq where tbl = 'l10n_text_resource'), CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, '${textObject.ticketNumber}', 'D3SCRIPT', 0, 'none', '${key}', '${textObject.text}', (select id from l10n_resource_bundle where name = 'ui'), (select id from company where bank_structure = 'ROOT'), (select id from l10n_locale where language_code = 'en'));`;
        sqlList.pushObject(sql);
        queryCount++;
        if (textObject.hasRequired) {
          let requiredKeyName = `${textObject.base}${textObject.requiredPrefix}${textObject.key}${textObject.requiredSuffix}`;
          let csvRequired = `insert into l10n_text_resource (id, created_ts, deleted, updated_ts, modified_by, modified_by_type, version, digest_value, name, local_value, bundle_id, company_id, locale_id)
            values ((select id+${queryCount} from id_seq where tbl = 'l10n_text_resource'), CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, '${textObject.ticketNumber}', 'D3SCRIPT', 0, 'none', '${requiredKeyName}', '${textObject.text}', (select id from l10n_resource_bundle where name = 'ui'), (select id from company where bank_structure = 'ROOT'), (select id from l10n_locale where language_code = 'en'));`;

          sqlList.pushObject(csvRequired);
          queryCount++;
        }
        if (textObject.hasPlaceholder) {
          let placeHolderKeyname = `${textObject.base}${textObject.key}${textObject.placeholderSuffix}`;
          let csvPlaceholder = `insert into l10n_text_resource (id, created_ts, deleted, updated_ts, modified_by, modified_by_type, version, digest_value, name, local_value, bundle_id, company_id, locale_id)
            values ((select id+${queryCount} from id_seq where tbl = 'l10n_text_resource'), CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, '${textObject.ticketNumber}', 'D3SCRIPT', 0, 'none', '${placeHolderKeyname}', '${textObject.placeHolderText}', (select id from l10n_resource_bundle where name = 'ui'), (select id from company where bank_structure = 'ROOT'), (select id from l10n_locale where language_code = 'en'));`;

          sqlList.pushObject(csvPlaceholder);
          queryCount++;
        }
      });

      // need final sql statement to add
      if (queryCount) {
        let finalQuery = `update id_seq set id = id+${queryCount} where tbl='l10n_text_resource';`;
        sqlList.pushObject(finalQuery);
      }
      return sqlList;
    }
  }),
});