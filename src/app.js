const fs = require('fs');
const config = require('../config.json');
const FileOrganizer = require("./lib/file_organizer");

fs.readdirSync(config.src)
  .map(filename => new FileOrganizer(filename, config))
  .forEach(fileOrganizer => fileOrganizer.moveFile())
