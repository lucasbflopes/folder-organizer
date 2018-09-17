# Folder Organizer
A simple node app to organize folders according to its files types.

If you are like me and hate when your desktop looks like a [solitaire winning screen](https://static-s.aa-cdn.net/img/win/40600000044263/8665a9b0e83e2d21f20529d6153a2026) maybe this will help you!

I got inspired by [Declutter](https://itunes.apple.com/us/app/declutter-pro/id1187706662?mt=12) and wanted to implement a simpler and free version of the app.

## How it works

If you don't know [Declutter](https://itunes.apple.com/us/app/declutter-pro/id1187706662?mt=12), it is basically an app that automatically organizes your desktop folder by moving the files to individual folders according to their extensions (.mp3, .pdf, etc). They offer the option to run it manually or setting an interval to do it automatically.

## Setup

First of all, run `npm install` to install all dependencies.

There is a single configuration file, namely `config.json`, wherein it is possible to specify a target directory (`src`)  as well as the folders you want to move the files into. The object representing the folder has two properties: the name you want to call the folder and an array of extensions that folder is responsible for.

Example: 
```json
{
  "src": "/absolute/path/to/your/folder",
  "folders": [
    {
      "name": "My-Awesome-Images",
      "extensions": [
        ".jpg",
        ".png"
      ]
    },
    {
      "name": "Documents",
      "extensions": [
        ".pdf",
        ".doc",
        ".docx"
      ]
    }
  ]
}
```

When the app runs, all files with extension such as pdf, doc and docx will be moved from `/absolute/path/to/your/folder` to `/absolute/path/to/your/folder/Documents`. The extension is not case sensitive, therefore there is no difference between `.pdf` and `.PDF`.

In case the folder `Documents` does not exist, it will be created automatically.

## How to use

There are two ways to use this app: either you can run `npm start` and organize the directory prescribed in `config.json` just once or you can run `npm run watch` and listen to the directory so that whenever a new file is added to it, it will be automatically moved (or not) to its folder.  

If a name clash happens, i.e. you add a `stuff.pdf` to the folder being listened and it already exists in the directory responsible for pdf files, the app will notify with an alert and not move it.

So far, hidden files are never moved and unless you change the source code there is no other way to change this behaviour.
