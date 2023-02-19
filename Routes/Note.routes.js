const express = require("express");
const { NoteModel } = require("../Model/Note.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const user = req.body.user;
  try {
    const notes = await NoteModel.find({ user });
    res.send(notes);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send({ msg: "Note created" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const noteId = req.params.id;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteId }, payload);
    res.send({ msg: "Note Updated" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteId = req.params.id;
  try {
    await NoteModel.findByIdAndDelete({ _id: noteId });
    res.send({ msg: "Note Deleted" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { noteRouter };
