const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'))
const valueSets = require('./valueSets')

const title = valueSets.title
const countryCodes = valueSets.countryCodeSet
const gender = valueSets.gender
const fsa = valueSets.fsa
const drivingLicenseTypes = valueSets.drivingLicenseTypes
                
module.exports = {
    checkAMLSchema: Joi.object().keys({
        currentName : Joi.object().keys({
            title: Joi.any().valid(...title).required(),
            firstName: Joi.string().min(2).max(60).required(),
            lastName: Joi.string().min(2).max(60).required(),
            middleNames:Joi.string().min(2).max(60),
            isFromBirth:Joi.boolean().required(),
            knownFromDate : Joi.when('isFromBirth', {
                is : false,
                then : Joi.date().format("YYYY-MM-DD").required(),
                otherwise : Joi.string().allow(null)
            })
        }).required(),
        previousNames: Joi.array().items(
            Joi.object().keys({
                title:Joi.any().valid(...title),
                firstName:Joi.string().min(2).max(60),
                lastName:Joi.string().min(2).max(60),
                middleNames : Joi.string().min(2).max(60),
                isFromBirth:Joi.boolean(),
                knownFromDate : Joi.date().format("YYYY-MM-DD"),
                knownToDate:Joi.date().format("YYYY-MM-DD")
            })
        ).required(),
        personalInfo: Joi.object().keys({
            mobilePhone : Joi.object().keys({
                phoneNumber:Joi.string().regex(/(^\+{0,1}[0-9]{1,})([0-9\- \(\)\.]{0,})([0-9]{1}$)/),
                countryCode: Joi.any().valid(...countryCodes)
            }),
            homePhone : Joi.object().keys({
                phoneNumber:Joi.string().regex(/(^\+{0,1}[0-9]{1,})([0-9\- \(\)\.]{0,})([0-9]{1}$)/),
                countryCode: Joi.any().valid(...countryCodes)
            }),
            gender: Joi.any().valid(...gender).required(),
            dateOfBirth: Joi.date().format("YYYY-MM-DD").required(),
            purchaseOrderNumber: Joi.string().min(1).max(50),
            otherReference: Joi.string().min(1).max(128),
            positionAppliedFor: Joi.string().min(1).max(60),
            applicantNotes : Joi.string().min(1).max(1024),
            fsaApproved:Joi.any().valid(...fsa),
            hasValidDrivingLicense:Joi.boolean(),
            currentNationality :Joi.string(),
            candidateEmail: Joi.string().email().lowercase(),
            birthCertificationNumber : Joi.string().min(1).max(50),
            motherMaidenName : Joi.string(),
            nationalityAtBirth: Joi.string(),
            countryOfBirth: Joi.string(),
            townOfBirth: Joi.string().min(1).max(50),
            visaNationality : Joi.string(),
            birthCertificateCountry : Joi.string(),
            euNationalIdCardCountry : Joi.string()
        }).required(),
        addressList :Joi.array().items(
            Joi.object().keys({
                address : Joi.object({
                    flatNumber: Joi.string().required(),
                    houseNumber: Joi.string().required(),
                    houseName: Joi.string().required(),
                    businessName : Joi.string(),
                    streetName: Joi.string(),
                    locality: Joi.string(),
                    town: Joi.string(),
                    county: Joi.string(),
                    state: Joi.string(),
                    postcode: Joi.string(),
                    country: Joi.any().valid(...countryCodes)
                }).required(),
                dateMovedToThisAddress: Joi.date().format("YYYY-MM-DD").required(),
                isCurrentAddress: Joi.boolean().required(),
                dateLeftThisAddress : Joi.when('isCurrentAddress', {
                    is: false,
                    then: [Joi.string().required()],
                    otherwise: Joi.alternatives().try(Joi.string(), Joi.string().allow(null)),
                })
            })
        ).required(),
        identity:Joi.object().keys({
            passportDocument:{
                passportIssuingCountry: Joi.string().required(),
                passportNumber : Joi.when('PassportIssuingCountry', {
                    is: 'GB',
                    then: Joi.string().min(0).max(9).required(),
                    otherwise: Joi.string()
                }),
                passportIssueDate:Joi.date().format("YYYY-MM-DD").required(),
                passportExpiryDate:Joi.date().format("YYYY-MM-DD").required(),
            },
            drivingDocument: {
                driverLicenseType: Joi.any().valid(...drivingLicenseTypes).required(),
                driverLicenseIssuingCountry: Joi.any().valid(...countryCodes),
                driverLicenseNumber : Joi.when('driverLicenseIssuingCountry', {
                    is: 'GB',
                    then: Joi.string().required(),
                    otherwise: Joi.string().min(1).max(50)
                }),
                driverLicenseDate: Joi.date().format("YYYY-MM-DD").required()
            },  
            nationalInsuranceNumberDocument:{
                overseasIdentityNumber: {
                    issuingCountry:Joi.alternatives().try(Joi.any().valid(...countryCodes) ,Joi.string().allow(null) ),
                    identityNumber: Joi.alternatives().try(Joi.string().min(1).max(97) ,Joi.string().allow(null) )
                },
                nationalInsuranceNumber: Joi.string().min(8).max(9)
            }
        }).required()
    
    })
}