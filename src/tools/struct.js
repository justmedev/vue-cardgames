/* eslint-disable @typescript-eslint/no-var-requires */
const fsp = require('fs').promises;

const baseDir = './public/cards';
const paths = [];

// fsp.readdir(baseDir)
//   .then((subdirs) => {
//     subdirs.forEach((sub) => {
//       const target = `${baseDir}/${sub}`;
//       fsp.readdir(target)
//         .then((fileNames) => {
//           fileNames.forEach((fileName) => {
//             paths.push(`${baseDir}/${sub}/${fileName}`);
//           });
//         })
//         .catch(() => console.log);
//     });
//   })
//   .finally(() => {
//     console.log(JSON.stringify(paths));
//   })
//   .catch(() => console.log);

(async () => {
  const subdirs = await fsp.readdir(baseDir);
  if (!subdirs) return;

  // eslint-disable-next-line no-restricted-syntax
  for (const sub of subdirs) {
    const target = `${baseDir}/${sub}`;
    // eslint-disable-next-line no-await-in-loop
    const fileNames = await fsp.readdir(target);

    if (!fileNames) return;

    fileNames.forEach((fileName) => {
      paths.push({
        path: `${baseDir}/${sub}/${fileName}`,
        name: `${sub} ${fileName}`,
      });
    });
  }

  console.log(JSON.stringify(paths));

  await fsp.writeFile('./out.txt', JSON.stringify(paths));
})();
