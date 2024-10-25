import express from 'express';


function ConfigureExpress() {
  const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
  this.use(express.json());       // to support JSON-encoded bodies
  this.use(express.urlencoded()); // to support URL-encoded bodies
  this.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

export default ConfigureExpress;