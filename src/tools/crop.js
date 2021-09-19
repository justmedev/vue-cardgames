/* eslint-disable @typescript-eslint/no-var-requires */
const sharp = require('sharp');
const fsp = require('fs').promises;

const baseDir = './public/cards';
const outDir = './public/cards-new';

fsp.readdir(baseDir)
  .then((subdirs) => {
    console.log(subdirs);
    subdirs.forEach((sub) => {
      console.log(sub);
      if (sub === 'backsides') return;

      const target = `${baseDir}/${sub}`;
      console.log(target);

      fsp.readdir(target)
        .then((fileNames) => {
          fileNames.forEach((fileName) => {
            console.log(`${baseDir}/${sub}/${fileName}`);
            sharp(`${baseDir}/${sub}/${fileName}`)
              .extract({
                left: 397,
                top: 54,
                width: 1246,
                height: 1934,
              })
              .toFile(`${outDir}/${sub}/${fileName}`, (err) => {
                console.log('nice', err);
              });
          });
        })
        .catch(() => console.log);
    });
  })
  .catch(() => console.log);
