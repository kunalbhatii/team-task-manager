const router = require("express").Router();

router.get("/", (req, res) => {

  res.json({
    message: "Project Route Working",
  });

});

module.exports = router;