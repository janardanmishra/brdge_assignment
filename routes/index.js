var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});




router.get('/getUserDetails', function (req, res) {
  User.find({}, function (err, details) {
    if (err) {
      res.json({ "status": "ERROR", "msg": "User not found" })
    } else {
      res.json({
        "status": "OK",
        "msg": "User details fetch successfully",
        "data": details
      });
    }
  })
})




// 1. GET api to return total like count per user from all posts in the attached dataset.
router.get('/totalLikeCount', function (req, res) {

  User.aggregate([
    { "$unwind": "$user.uid" },
    {
      $group: {
       "_id": "$user.uid",
        "totalLike": { $sum: "$likes" }
      }
    }

  ], function (err, result) {
    if (err) {
      // console.log("errr-----------------> ");
      // console.log(err);
      res.json({
        "status": "ERROR",
        "msg": "Total like count getting Issue",
        "data": err
      });
    } else {
      // console.log("Result-----------------> ");
      // console.log(result);
      res.json({
        "status": "OK",
        "msg": "Total like count fetch successfully",
        "data": result
      });

    }

  })
})




//2. GET api to return total like count for the user with given uid.
router.post('/totalLikeCountByUserId', function (req, res) {

// req.body.userId

  User.aggregate([
    {
      $match: {
        "user.uid": req.body.userId
      }
    },
    {
      $group: {
        _id: {},
        totalLike: { $sum: ("$likes") }
      }
    }

  ], function (err, result) {
    if (err) {
      // console.log("errr-----------------> ");
      // console.log(err);

      res.json({
        "status": "ERROR",
        "msg": "Total like count by id getting Issue",
        "data": err
      });

    } else {
      // console.log("Result-----------------> ");
      // console.log(result);

      res.json({
        "status": "OK",
        "msg": "Total like count by id fetch successfully",
        "data": result
      });

    }

  })
})




module.exports = router;
