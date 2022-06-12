const router = require("express").Router();
const authRoutes = require("./auth.routes");
const plantRouter = require('./plants.routes')

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

router.use("/auth", authRoutes);
router.use('/plants', plantRouter)

module.exports = router;
