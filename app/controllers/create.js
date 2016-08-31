import Ember from 'ember';

export default Ember.Controller.extend({

  sqlIndex: 0,

  createdTextList: Ember.A(),

  /**
   * This is not efficient, but shows the idea of computed properties (but not so much caching)
   * The problem is each change requires a complete loop through everything
   * This does make removal easier since there can be multiple for one add
   */
  csvList: Ember.computed('createdTextList.[]', {
    get() {
      const csvList = Ember.A();
      const createdTextList = this.get('createdTextList');
      createdTextList.forEach(textObject => {
        const csv = `"${textObject.base}${textObject.key}","${textObject.text}",""`;
        csvList.pushObject(csv);
        if (textObject.hasRequired) {
          const keyName = `${textObject.base}${textObject.requiredPrefix}${textObject.key}${textObject.requiredSuffix}`;
          const csvRequired = `"${keyName}","${textObject.requiredErrorText}",""`;
          csvList.pushObject(csvRequired);
        }
        if (textObject.hasPlaceholder) {
          const placeholderKeyname = `${textObject.base}${textObject.key}${textObject.placeholderSuffix}`;
          const csvPlaceholder = `"${placeholderKeyname}","${textObject.placeholderText}",""`;
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
      const sqlList = Ember.A();
      const createdTextList = this.get('createdTextList');
      let queryCount = this.get('sqlIndex') || 0;
      createdTextList.forEach(textObject => {

        const key = `${textObject.base}${textObject.key}`;
        const sql = `insert into l10n_text_resource (id, created_ts, deleted, updated_ts, modified_by, modified_by_type, version, digest_value, name, local_value, bundle_id, company_id, locale_id)
  values ((select id+${queryCount} from id_seq where tbl = 'l10n_text_resource'), CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, '${textObject.ticketNumber}', 'D3SCRIPT', 0, 'none', '${key}', '${textObject.text.replace(/'/g, "''")}', (select id from l10n_resource_bundle where name = 'ui'), (select id from company where bank_structure = 'ROOT'), (select id from l10n_locale where language_code = 'en' and country_code is null));`;
        sqlList.pushObject(sql);
        queryCount++;
        if (textObject.hasRequired) {
          const requiredKeyName = `${textObject.base}${textObject.requiredPrefix}${textObject.key}${textObject.requiredSuffix}`;
          const csvRequired = `insert into l10n_text_resource (id, created_ts, deleted, updated_ts, modified_by, modified_by_type, version, digest_value, name, local_value, bundle_id, company_id, locale_id)
  values ((select id+${queryCount} from id_seq where tbl = 'l10n_text_resource'), CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, '${textObject.ticketNumber}', 'D3SCRIPT', 0, 'none', '${requiredKeyName}', '${textObject.requiredErrorText.replace(/'/g, "''")}', (select id from l10n_resource_bundle where name = 'ui'), (select id from company where bank_structure = 'ROOT'), (select id from l10n_locale where language_code = 'en' and country_code is null));`;

          sqlList.pushObject(csvRequired);
          queryCount++;
        }
        if (textObject.hasPlaceholder) {
          const placeholderKeyname = `${textObject.base}${textObject.key}${textObject.placeholderSuffix}`;
          const csvPlaceholder = `insert into l10n_text_resource (id, created_ts, deleted, updated_ts, modified_by, modified_by_type, version, digest_value, name, local_value, bundle_id, company_id, locale_id)
  values ((select id+${queryCount} from id_seq where tbl = 'l10n_text_resource'), CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, '${textObject.ticketNumber}', 'D3SCRIPT', 0, 'none', '${placeholderKeyname}', '${textObject.placeholderText.replace(/'/g, "''")}', (select id from l10n_resource_bundle where name = 'ui'), (select id from company where bank_structure = 'ROOT'), (select id from l10n_locale where language_code = 'en' and country_code is null));`;

          sqlList.pushObject(csvPlaceholder);
          queryCount++;
        }
      });

      // need final sql statement to add
      if (queryCount && createdTextList.length) {
        const finalQuery = `update id_seq set id = id+${queryCount} where tbl='l10n_text_resource';`;
        sqlList.pushObject(finalQuery);
      }
      return sqlList;
    }
  })
});
