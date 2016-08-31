import Ember from 'ember';

export default Ember.Controller.extend({

  insertQueryCount: 0,

  isUpdateAllowed: true,

  ticketNumber: null,

  oldText: '',
  newText: '',

//  oldText: `# This is my comment that shouldn't matter
//  "settings.alerts.btn.cancel","Cancel",""
//"same","Same",""
//"update","update"
//"doublequote","double\\"",""`,

//  newText: `"settings.alerts.btn.save","Save",""
//  # Here is another comment
//"settings.alerts.btn.save2","Save2",""
//"same","Same",""
//"update","updated!",""
//"apostrophe check","apost'rophe",""
//"doublequote","double\\"update",""
//"boringkey","double\\"insert",""`,

  oldTextMapComputed: Ember.computed('oldText', {
    get() {
      const oldTextMap = Ember.Map.create();
      oldTextMap.clear();
      const oldText = this.get('oldText');

      oldText.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.indexOf(',') > -1 && trimmedLine.indexOf('#') !== 0) {
          const valuesArray = trimmedLine.split('","');
          let key;
          let value;
          if (valuesArray.length > 1 && valuesArray[0].length > 2) {
            key = valuesArray[0].substring(valuesArray[0].indexOf('"') + 1).trim();
            value = valuesArray[1].replace(/\\"/g, '"').trim();
          }

          if (key) {
            oldTextMap.set(key, value);
          }
        }
      });
      return oldTextMap;
    }
  }),

  newTextMapComputed: Ember.computed('newText', {
    get() {
      const newTextMap = Ember.Map.create();
      const newText = this.get('newText');

      newText.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.indexOf(',') > -1 && trimmedLine.indexOf('#') !== 0) {
          const valuesArray = trimmedLine.split('","');
          let key;
          let value;
          if (valuesArray.length > 1 && valuesArray[0].length > 2) {
            key = valuesArray[0].substring(valuesArray[0].indexOf('"') + 1).trim();
            value = valuesArray[1].replace(/\\"/g, '"').trim();
          }

          if (key) {
            newTextMap.set(key, value);
          }
        }
      });

      return newTextMap;
    }
  }),

  addList: Ember.A(),
  updateList: Ember.A(),
  deleteList: Ember.A(),
  sameList: Ember.A(),

  allList: Ember.computed('sqlList', {
    get() {
      const addList = this.get('addList');
      const updateList = this.get('updateList');
      const deleteList = this.get('deleteList');
      const sameList = this.get('sameList');

      return addList.concat(updateList, deleteList, sameList);
    }
  }),

  sqlList: Ember.computed('oldTextMapComputed.[]', 'newTextMapComputed.[]', 'insertQueryCount', 'isUpdateAllowed', 'ticketNumber', {
    get() {
      const addList = this.get('addList');
      const updateList = this.get('updateList');
      const deleteList = this.get('deleteList');
      const sameList = this.get('sameList');

      addList.clear();
      updateList.clear();
      deleteList.clear();
      sameList.clear();

      const newTextMapComputed = this.get('newTextMapComputed');
      const oldTextMapComputed = this.get('oldTextMapComputed');
      const isUpdateAllowed = this.get('isUpdateAllowed');
      const ticketNumber = this.get('ticketNumber');
      const sqlList = Ember.A();

      if (newTextMapComputed.size > 0 || oldTextMapComputed.size > 0) {
        let insertQueryCount = this.get('insertQueryCount');

        newTextMapComputed.forEach((value, key) => {
          const oldValue = oldTextMapComputed.get(key);

          if (oldValue === undefined) {
            addList.pushObject(`ADD,${key},${value}`);
            const sql = `INSERT INTO l10n_text_resource (id, created_ts, deleted, updated_ts, modified_by, modified_by_type, version, digest_value, name, local_value, bundle_id, company_id, locale_id)
      VALUES ((select id+${insertQueryCount} from id_seq where tbl = 'l10n_text_resource'), CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, '${ticketNumber}', 'D3SCRIPT', 0, 'none', '${key}', '${value.replace(/'/g, "''")}', (select id from l10n_resource_bundle where name = 'ui'), (select id from company where bank_structure = 'ROOT'), (select id from l10n_locale where language_code = 'en' and country_code is null));\n`;
            sqlList.pushObject(sql);
            insertQueryCount++;
          } else if (oldValue === value) {
            // do nothing
            sameList.pushObject(`SAME,${key},${oldValue}`);
          } else if (isUpdateAllowed) {
            updateList.pushObject(`UPDATE,${key},${value}`);
            const sql = `UPDATE l10n_text_resource
      SET local_value = '${value.replace(/'/g, "''")}', modified_by = '${ticketNumber}', updated_ts = CURRENT_TIMESTAMP, modified_by_type = 'D3SCRIPT'
      WHERE name = '${key}' AND locale_id = (select id from l10n_locale where language_code = 'en');\n`;
            sqlList.pushObject(sql);
          } else {
            // kept the same
            sameList.pushObject(`NOUPDATE,${key},${oldValue},${value}`);
          }
        });

        // need final sql statement to add
        if (insertQueryCount) {
          const finalQuery = `update id_seq set id = id+${insertQueryCount} where tbl='l10n_text_resource';\n`;
          sqlList.pushObject(finalQuery);
        }

        oldTextMapComputed.forEach((value, key) => {
          if (!newTextMapComputed.has(key)) {
            deleteList.pushObject(`REMOVE,${key},${value}`);
            const sql = `DELETE FROM l10n_text_resource WHERE name = '${key}';`;
            sqlList.pushObject(sql);
          }
        });
      }
      return sqlList;
    }
  })
});
