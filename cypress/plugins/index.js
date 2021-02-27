/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
import * as dotenv from "dotenv";

dotenv.config();

const mongoose = require("mongoose");
import { Note } from "../../src/models/note";

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on("task", {
    addNoteToDB(noteObj) {
      return new Promise((resolve) => {
        mongoose.connect(
          `${process.env.MONGO_TEST_URI}`,
          { useNewUrlParser: true, useUnifiedTopology: true },
          (err) => {
            const { slackID, audioUrl, responseUrl } = noteObj;
            const note = new Note({ slackID, audioUrl, responseUrl });
            note.save((err) => {
              resolve("done");
            });
          }
        );
      });
    },
  });

  on("task", {
    dropDb() {
      return new Promise((resolve) => {
        mongoose.connect(
          `${process.env.MONGO_TEST_URI}`,
          { useNewUrlParser: true, useUnifiedTopology: true },
          (err) => {
            mongoose.connection.db.dropDatabase(
              console.log("database dropped")
            );
          }
        );
      });
    },
  });
};
