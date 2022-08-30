import express from "express";
import {
  getRootData,
  getAllResourcesInEndpoint,
  getResourceById,
} from "../controllers/controller";

const router = express.Router();

router.get("/", getRootData);
router.get("/:route", getAllResourcesInEndpoint);
router.get("/:route/:id", getResourceById);

export = router;
