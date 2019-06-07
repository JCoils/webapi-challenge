const express = require("express");
const router = express.Router();

const actionsdb = require("../helpers/actionModel");

router.get("/", (req, res) => {
    actionsdb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({error: "error"});
    });
});

router.post("/", validateProjectId, (req, res) => {
    const newAction = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes
    };
    actionsdb
      .insert(newAction)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "cant add an action" });
      });
  });
  
  router.get("/:id", (req, res) => {
    console.log("ID ACTIONS");
    const id = req.params.id;
    console.log(id);
    actionsdb
      .get(id)
      .then(action => {
        if (action) {
          res.status(200).json({
            action
          });
        } else {
          res.status(201).json({ message: "no action" });
        }
      })
      .catch(err => {
        res.status(500).json({ err, message: "Can't retrieve action" });
      });
  });
  
  router.put("/:id", validateActionId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
  
    console.log(changes);
    console.log(id);
  
    actionsdb
      .update(id, changes)
      .then(UpdateAction => {
        if (UpdateAction) {
          res.status(200).json(UpdateAction);
        } else {
          res.status(404).json({ message: " project doesn't exist" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "error"
        });
      });
  });
  
  router.delete("/:id", validateActionId, (req, res) => {
    const id = req.params.id;
    console.log(id);
    actionsdb
      .remove(id)
      .then(response => {
        res.status(200).json({
          message: "action deleted"
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "error"
        });
      });
  });

  
  function validateActionId(req, res, next) {
    const id = req.params.id;
    actionsdb
      .get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(400).json({ message: "Invalid Action ID" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "error can't validate" });
      });
  }
  
  function validateProjectId(req, res, next) {
    const id = req.params.id;
    projectsdb
      .get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({ message: "Invalid Project ID" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "error can't validate" });
      });
  }






module.exports = router; 