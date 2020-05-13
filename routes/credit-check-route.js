const router = require('express').Router()
const validationMiddleware = require('./validation-middleware')
const Joi = require('@hapi/joi')
const verifileProxy = require('../endpoints/verifile-proxy')

