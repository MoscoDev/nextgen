const router = require("express").Router();
const User = require("../model/User");
const { signupValidation } = require("../utils/validation");

router.post("/signup", async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: true, message: error?.details[0].message });
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
