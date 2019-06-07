const express = require("express");
const router = express.Router();

const projectsdb = require("../helpers/projectModel");



router.get("/", (req,res)=> {
    console.log("PROJECTS")
    projectsdb.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({err, message: "Can't get projects"});
    });
});

router.get("/:id", validateProjectId, (req,res)=> {
    console.log("ID PROJECTS")
    const id = req.params.id;
    console.log(id);
    projectsdb.get(id)
    .then(project => {
        if (project) {
            res.status(200).json({
                project
            });
        } else {
            res.status(201).json({message: "no project"});
        }
        
    })
    .catch(err => {
        res.status(500).json({err, message: "Can't get project"});
    });
});


router.post("/", (req, res) => {
    projectsdb.insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(error => {
        res.status(500).json({ error, message: "Error adding" });
      });
  });


  router.delete("/:id", validateProjectId, (req, res)=> {
    const id = req.params.id;
    console.log(id);
      projectsdb
      .remove(id)
      .then(response => {
          res.status(200).json({
              message: "project deleted"
          });
      })
      .catch(error => {
          res.status(500).json({
              message: "error"
          });
      });
  });
  
  

  router.put("/:id", validateProjectId, (req, res)=> {
    const id = req.params.id;
    console.log(id);
      projectsdb
      .update(id, req.body)
      .then(response => {
          res.status(200).json(
              response
          )
      })
      .catch(error => {
          res.status(500).json({
              message: "error"
          });
      });
  });
  
  router.get("/:id/actions", (req, res) => {
    projectsdb.getProjectActions(req.params.id)
      .then(actions => {
        if (actions) {
          res.status(200).json(actions);
        } else {
          res.status(404).json({ message: "No project" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "error"
        });
      });
  });
  

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
        res.status(500).json( {message: "error Validating"});
      });
  }




module.exports = router;