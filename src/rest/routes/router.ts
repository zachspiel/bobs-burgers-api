import express from "express";
import {
  getRootData,
  getAllResourcesInEndpoint,
  getResourceById,
  getVisitors,
} from "../controllers/controller";

const router = express.Router();

router.get("/", getRootData);
router.get("/visitors", getVisitors);
router.get("/:route", getAllResourcesInEndpoint);
router.get("/:route/:id", getResourceById);

export = router;
