const chai = require('chai')
const should = chai.should()
chai.use(require("chai-as-promised"));
const moxios = require('moxios')
const stubs = require('./stubs')

const verifileProxy = require('../../endpoints/verifileProxy')

describe('VerifileProxy', function () {

    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install(verifileProxy.axiosInstance)
    })
    
    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall(verifileProxy.axiosInstance)
    })

    it('doAMLCheck should return a successful order response', function () {

        //given
        moxios.stubRequest('/orders/cliententry', {
            status: 201,
            response: stubs.amlCheckResponse
        })

        //when
        const promise = verifileProxy.doAMLCheck(stubs.amlCheckRequest)

        //then
        return promise.should.eventually.deep.equal({
            id: 1,
            status: 'Application'
        })
    })
})