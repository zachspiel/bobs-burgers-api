import express from 'express';
import path from 'path';
import controller from '../controllers/controller';
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
  const error = new Error('Image not found');
  const filePath = path.join(
    __dirname + '/../images/' + req.params.folder + '/' + req.params.file
  );
  if (avaialableFolders.includes(req.params.folder)) {
    res.sendFile(path.resolve(filePath));
  } else {
    return res.status(404).json({
      message: error.message,
    });
  }
});

export = router;
