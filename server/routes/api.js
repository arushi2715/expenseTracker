const Router = require("router");
const { addBudget } = require("../controller/api/addBudget");
const { addCategories } = require("../controller/api/categories/addCategories");
const { getCategories } = require("../controller/api/categories/getCategories");
const { addExpense } = require("../controller/api/expenses/addExpense");
const { getExpense } = require("../controller/api/expenses/getExpense");
const { editExpense } = require("../controller/api/expenses/editexpense");
const { deleteExpense } = require("../controller/api/expenses/deleteExpense");
const { isValidated } = require("../middlewares/isValidated");
const router = Router();

router.get("/getCategories", isValidated, getCategories);
router.get("/getExpense", isValidated, getExpense);

router.patch("/editExpense/:id", editExpense);
router.patch("/deleteExpense/:id", deleteExpense);


router.post("/addBudget", isValidated, addBudget);
router.post("/addCategories", isValidated, addCategories);
router.post("/addExpense", isValidated, addExpense);

module.exports = router;
