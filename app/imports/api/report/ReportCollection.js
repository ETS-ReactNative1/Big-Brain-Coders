import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

export const reportPublications = {
  report: 'Report',
  reportAdmin: 'ReportAdmin',
};

class ReportCollection extends BaseCollection {
  constructor() {
    super('Reports', new SimpleSchema({
      date: String,
      latitude: Number,
      longitude: Number,
      island: {
        type: String,
        allowedValues: ['Big Island', 'Oahu', 'Maui', 'Molokai', 'Kauai', 'Lanai', 'Niihau', 'Kahoolawe'],
        defaultValue: 'Oahu',
      },
      beachName: {
        type: String,
        optional: true,
      },
      description: {
        type: String,
        optional: true,
      },
      animal: {
        type: String,
        allowedValues: ['Monk Seal', 'Sea Turtle', 'Dolphin', 'Whale', 'Seabird'],
        defaultValue: 'good',
      },
      characteristics: String,
      behavior: String,
      numOfBeachgoers: Number,
      name: String,
      phoneNumber: String,
      imageUrl: {
        type: String,
        optional: true,
      },
      owner: String,
    }));
  }

  /**
   * Defines a new Report item.
   * @param date the date of the item
   * @param latitude the latitude coordinate
   * @param longitude the longitude coordinate
   * @param island the island of the report.
   * @param beachName the Beach of the item
   * @param description the description of the item.
   * @param animal the animal of the report
   * @param characteristics the characteristics of the animal.
   * @param behavior the behavior of the animal in report.
   * @param numOfBeachgoers the number of beach goers.
   * @param name the name of the reporter.
   * @param phoneNumber phone number of the reporter.
   * @param imageUrl image url uploaded by user.
   * @param owner this is the owner
   * @return {String} the docID of the new document.
   */
  define({
           date,
           latitude,
           longitude,
           island,
           beachName,
           description,
           animal,
           characteristics,
           behavior,
           numOfBeachgoers,
           name,
           phoneNumber,
           imageUrl,
           owner,
         }) {
    const docID = this._collection.insert({
      date,
      latitude,
      longitude,
      island,
      beachName,
      description,
      animal,
      characteristics,
      behavior,
      numOfBeachgoers,
      name,
      phoneNumber,
      imageUrl,
      owner,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, {
    date,
    latitude,
    longitude,
    island,
    beachName,
    description,
    animal,
    characteristics,
    behavior,
    numOfBeachgoers,
    name,
    phoneNumber,
    imageUrl,
    owner,
  }) {
    const updateData = {};
    if (date) {
      updateData.date = date;
    }
    if (latitude) {
      updateData.latitude = latitude;
    }
    if (longitude) {
      updateData.longitude = longitude;
    }
    if (island) {
      updateData.island = island;
    }
    if (beachName) {
      updateData.beachName = beachName;
    }
    if (description) {
      updateData.description = description;
    }
    if (animal) {
      updateData.animal = animal;
    }
    if (characteristics) {
      updateData.characteristics = characteristics;
    }
    if (behavior) {
      updateData.behavior = behavior;
    }
    // if (numOfBeachgoers) { NOTE: 0 is falsy so we need to check if the numOfBeachgoers is a number.
    if (_.isNumber(numOfBeachgoers)) {
      updateData.numOfBeachgoers = numOfBeachgoers;
    }
    if (name) {
      updateData.name = name;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }
    if (owner) {
      updateData.owner = owner;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the reports associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ReportCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(reportPublications.report, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(reportPublications.reportAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for report owned by the current user.
   */
  subscribeReport() {
    if (Meteor.isClient) {
      return Meteor.subscribe(reportPublications.report);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeReportAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(reportPublications.reportAdmin);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Reports = new ReportCollection();
