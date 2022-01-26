import express from 'express';
import path from 'path';
import controller from '../controllers/controller';
const fs = require('fs');

const router = express.Router();

const avaialableFolders = [
  'characters',
  'storeNextDoor',
  'pestControlTruck',
  'endCreditsSequence',
];

router.get('/', controller.getRootData);
router.get('/:route', controller.getAllData);
router.get('/:route/:id', controller.getSpecificItem);
router.get('/images/:folder/:file', (req, res) => {
  const { file, folder } = req.params;
  const errorMessage =
    file === undefined ? 'No image was provided in url' : `Image ${file} was not found`;

  if (avaialableFolders.includes(req.params.folder)) {
    const targetDirectory = path.join(__dirname, '../public/images', folder);
    let totalImages = getTotalImages(targetDirectory.toString());

    const targetId = file.split('.')[0];
    if (!Number.isNaN(Number(targetId)) && Number(targetId) <= totalImages) {
      const filePath = path.join(targetDirectory, file);
      return res.sendFile(path.resolve(filePath));
    }
    return res.status(404).json({
      message: `Image ${file} is outside of bounds ${totalImages} for directory ${folder}`,
    });
  } else {
    const error = new Error(errorMessage);
    return res.status(404).json({
      message: error.message,
    });
  }
});

const getTotalImages = (folder: string): number => {
  const totalImages = fs.readdirSync(folder).length;

  return totalImages;
};

export = router;
