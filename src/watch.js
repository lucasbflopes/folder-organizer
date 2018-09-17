const fs = require('fs');
const config = require('../config.json');
const FileOrganizer = require("./lib/file_organizer");

fs.watch(config.src, (_, filename) => {
  new FileOrganizer(filename, config).moveFile();
});