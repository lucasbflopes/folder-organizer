const fs = require('fs');
const mv = require('mv');
const path = require('path');
const notifier = require('node-notifier');

const BLACK_LIST = /^\./

class FileOrganizer {

  constructor(filename, {src, folders}) {
    this.filename = filename;
    this.src = src;
    this.folders = folders

    this.filepath = path.join(this.src, this.filename);
    this.destinationFolder = this.lookupDestinationFolder();
  }

  moveFile() {
    if (this.destinationFolder) {
      mv(
        this.filepath,
        path.join(this.destinationFolder, this.filename),
        { mkdirp: true, clobber: false },
        err => {
          if (err && err.code === 'EEXIST') {
            notifier.notify({
              title: 'File exists',
              message: `Could not move file ${this.filename} because it already exists in ${this.destinationFolder}.`
            });
          }
        }
      );
    }
  }

  lookupDestinationFolder() {
    if(!this.isValidFile()) {
      return;
    }

    const fileExtension = path.extname(this.filename);
    const matchedFolder =  this.folders.find(folder =>
      folder.extensions.some(extension =>
        extension.toLowerCase() === fileExtension.toLowerCase()
      )
    );
    if (matchedFolder) {
      return path.join(this.src, matchedFolder.name);
    }
  }

  isValidFile() {
    return this.fileExist() &&
           this.isFile() &&
           this.isNotInBlackList()
  }

  isFile() {
    return fs.statSync(this.filepath).isFile();
  }

  fileExist() {
    return fs.existsSync(this.filepath);
  }

  isNotInBlackList() {
    return !this.filename.match(BLACK_LIST)
  }
}

module.exports = FileOrganizer;