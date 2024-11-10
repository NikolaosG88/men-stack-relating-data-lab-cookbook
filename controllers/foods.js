const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

//______________________________________________________//

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
  });


   router.get ("/new", async (req, res) => {
    res.render("foods/new.ejs");
   });


   router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        if (req.body.partOfDiet ==="on") {
          req.body.partOfDiet = true;
      } else {
          req.body.partOfDiet = false;
      }
        currentUser.pantry.push(req.body);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    res.render('foods/details.ejs', {
      food: food,
      user: currentUser
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

//__________________________________________//
module.exports = router;


