import express, { Response } from 'express';
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
router.get('/images/:folder/:file', (req, res: Response) => {
  const { file, folder } = req.params;
  const errorMessage =
    file === undefined ? 'No image was provided in url' : `Image ${file} was not found`;

  if (avaialableFolders.includes(req.params.folder)) {
    const targetDirectory = path.join(__dirname, '../../public/images', folder);
    const targetId = file.split('.')[0];
    let totalImages = getTotalImages(targetDirectory.toString());
    const outOfBoundsError = `Image ${file} is outside of bounds ${totalImages} for directory ${folder}`;

    if (!Number.isNaN(Number(targetId)) && Number(targetId) <= totalImages) {
      const filePath = path.join(targetDirectory, file);
      return res.sendFile(path.resolve(filePath));
    }

    sendErrorMessage(res, outOfBoundsError);
  } else {
    sendErrorMessage(res, errorMessage);
  }
});

const getTotalImages = (folder: string): number => {
  try {
    return fs.readdirSync(folder).length;
  } catch (err) {
    return 0;
  }
};

const sendErrorMessage = (response: Response, message: string) => {
  return response.status(404).json({
    message: message,
  });
};

export = router;
