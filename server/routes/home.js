const express = require('express');

const homeRouter = express.Router()


homeRouter.get("/", (req,res,next)=>{
   res.json('witam');
});

module.exports = {
   homeRouter,
}
