var chai = require('chai'),
    sinon = require('sinon'),
    sinonchai = require('sinon-chai');

global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonchai);
