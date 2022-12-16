const Router = require("router");
const { signUp } = require("../controller/auth/signup");
const { signIn } = require("../controller/auth/signin");

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
