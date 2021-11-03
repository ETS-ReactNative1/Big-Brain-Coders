import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection.js';
import { Reports } from '../../api/report/ReportCollection.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

/** Initialize the database with a default report document. */
function addReports(data) {
  console.log(`  Adding: (${data.animal}) report`);
  Reports.define(data);
}

/** Initialize the collection if empty. */
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Reports.count() === 0) {
  if (Meteor.settings.defaultReports) {
    console.log('Creating default reports.');
    Meteor.settings.defaultReports.map(data => addReports(data));
  }
}
