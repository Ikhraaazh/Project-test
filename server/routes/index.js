const Controller = require("../controllers");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/", Controller.user);

module.exports = router;
