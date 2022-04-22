'use strict';
const express=require('express');
var controllerCalcul = require("../controllers/calcul.controller");
const router =express.Router();
router.post('/createEC2Instance',controllerCalcul.createEC2Instance);
router.post('/createKeyPair',controllerCalcul.createKeyPair);
router.post('/createSecurityGroup',controllerCalcul.createSecurityGroup);
router.post('/createrNewInstance',controllerCalcul.createrNewInstance);

module.exports={
    routes:router
}