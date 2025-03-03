const express = require("express");
const router = express.Router();
const appoinments = require("../models/appoinments.js");

router.post("/", async (req, res) => {
  try {
    const appointment = new appoinments(req.body);
    await appointment.save();
    res.status(201).send({ message: "appoinment saved successfully", appointment });
  } catch {
    res.status(500).send({ message: "error saving appooinment" }, error);
  }
});
router.get("/all", async (req, res) => {
  try {
    const appoinments = await appoinments.find();
    res.status(200).send(appoinments);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const appoinment = await appoinments.findOne({ userId });
    if (!userId) {
      res.status(404).send({ message: "user not found" });
    }
    res.send({ userId });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update/:userId", async (req, res) => {
  try {
    const appoinment = await appoinments.findOne({ userId: req.params.userId });
    if (!userId) {
      res.status(404).send({ message: "user not found" });
    }
    await appoinments.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { name: "ali" } },
      { new: true }
    );
  } catch (error) {
    res.status(500).send({ message: "error updating appopinment" });
  }

  router.delete("/:userId", async (req, res) => {
    try {
      const appoinment = await appoinments.findOne({ userId: req.params.userId });
      if (!userId) {
        res.status(404).send({ message: "appoinment not found" });
      }
      await appoinments.deleteOne({ userId: req.params.userId });
    } catch (error) {
      res.status(500).send({ message: "error updating appoinment" });
    }
  });
});
module.exports = router;
