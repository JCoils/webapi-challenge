const express = require("express");
const router = express.Router();

const actionsdb = require("../helpers/actionModel");

router.get("/", (req, res) => {
    actionsdb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({error: "Unable to retrieve actions"});
    });
});






module.exports = router; 