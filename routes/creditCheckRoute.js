const router = require('express').Router()
const validationMiddleware = require('./validationMiddleware')
const Joi = require('@hapi/joi')
const verifileProxy = require('../endpoints/verifileProxy')
const logger = require('log4js').getLogger('creditCheckRoute');
const rTracer = require('cls-rtracer')