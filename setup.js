const path = require('path');
const fs = require('fs');

const express = require('express');
const fileUpload = require('express-fileupload');
const XLSX = require('xlsx');

function setup(app) {
  const indexPath = path.join(__dirname, '/src/public/index.html');
      
  // interesting
  app.use('/assets/', express.static(path.join(__dirname, '/src/public/dist')));
  // boostrap css
  app.use('/assets/css/bootstrap/', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
  // handsontable css
  app.use('/assets/css/handsontable/', express.static(__dirname + '/node_modules/handsontable/dist'));
  
  // fileupload
  app.use(fileUpload());

  // simple upload file
  app.post('/upload', (req, res) => {
    if (!req.files) return res.status(400).send('No files were uploaded.');
  
    let sampleFile = req.files.sampleFile;

    sampleFile.mv(`./src/public/upload/${sampleFile.name}`, (err) => {
      if (err) return res.json({ error: true, message: 'Error while upload' });
      res.json({ message: 'Upload successful' });
    });
  });

  // simple get upload file
  app.get('/upload', (req, res) => {
    const base = path.join(__dirname, '/src/public/upload');
    const files = fs.readdirSync(base).filter(s => s !== 'tmp');
    const fileName = req.query.file;

    if (!fileName) {
      res.json(files);
    } else {
      if (files.indexOf(fileName) > -1) {
        const workbook = XLSX.readFile(path.join(base, fileName));
        const result = {};
        workbook.SheetNames.forEach(name => {
          result[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name]);;
        });
        res.json({ data: result });
      } else {
        res.json({ error: true, message: `Can not find file ${fileName}` });
      }
    }
  });

  // again simple delete
  app.get('/delete', (req, res) => {
    const base = path.join(__dirname, '/src/public/upload');
    const files = fs.readdirSync(base);
    const fileName = req.query.file;
    if (!fileName) {
      res.json({ error: true, message: `Can not find file ${fileName}` });
    } else {
      fs.unlinkSync(path.join(base, fileName));
      res.json({ message: `File ${fileName} delete successful` });
    }
  });
  
  app.get('/', (req, res) => { res.sendFile(indexPath) });
}

module.exports = setup;