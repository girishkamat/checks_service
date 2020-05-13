const axios = require('axios')
const uuidv4 = require('uuid').v4
const config = require("config")
const HttpStatus = require('http-status-codes');
const VerifileException = require('../exceptions/verifile-exception')
const axiosInstance = axios.create({
    baseURL: `${config.get('verifile.endPoint')}/api/v1`,
    timeout: config.get('verifile.readTimeout'),
    headers: {
        'VerifileUserId': config.get('verifile.userId'),
        'Ocp-Apim-Subscription-Key': config.get('verifile.ocpAPISubscriptionKey'),
        'Content-Type': 'application/json'
    }
})

class VerifileProxy {

    doAMLCheck(amlCheckRequest) {
        const request = this.buildAMLCheckRequest(amlCheckRequest)
        return axiosInstance
            .post('/orders/cliententry', request)
            .then(response => {
                return {
                    id: response.data.Id,
                    status: response.data.OrderState.StateDescription
                }
            })
            .catch(error => {
                if (error.response) {
                    throw new VerifileException(
                        error.response.status, 
                        'VERIFILE_ERROR', 
                        `field=${error.response.data.validationErrors[0].fieldPath}, message=${error.response.data.validationErrors[0].message}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    throw new VerifileException(HttpStatus.INTERNAL_SERVER_ERROR,
                        'VERIFILE_NO_RESPONSE_ERROR', 
                        error.message)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    throw new VerifileException(HttpStatus.INTERNAL_SERVER_ERROR, 
                        'VERIFILE_REQUEST_ERROR', 
                        error.message);
                }
            })
    }

    getOrderStatus(id) {
        return axiosInstance.get('/orders/' + id + '/status')
    }

    buildAMLCheckRequest(amlCheckRequest) {
        return {
            UniqueKey: uuidv4(),
            Checks: [{
                CheckType: "UKIDAMLCheckUKAML"
            }],
            Candidate: {
                PreviousNames: amlCheckRequest.previousNames.map(p => {
                    return {
                        Title: p.title,
                        FirstName: p.firstName,
                        LastName: p.lastName,
                        MiddleNames: p.middleNames,
                        IsFromBirth: p.isFromBirth,
                        KnownFromDate: p.knownFromDate,
                        KnownToDate: p.knownToDate
                    }
                }),
                AddressList: amlCheckRequest.addressList.map(a => {
                    return {
                        DateMovedToThisAddress: a.dateMovedToThisAddress,
                        DateLeftThisAddress: a.dateLeftThisAddress,
                        IsCurrentAddress: a.isCurrentAddress,
                        Address: {
                            HouseNumber: a.address.houseNumber,
                            StreetName: a.address.streetName,
                            Locality: a.address.locality,
                            Town: a.address.town,
                            County: a.address.county,
                            State: a.address.state,
                            Postcode: a.address.postcode,
                            Country: a.address.country
                        }
                    }
                }),
                CurrentName: {
                    Title: amlCheckRequest.currentName.title,
                    FirstName: amlCheckRequest.currentName.firstName,
                    LastName: amlCheckRequest.currentName.lastName,
                    MiddleNames: amlCheckRequest.currentName.middleNames,
                    IsFromBirth: amlCheckRequest.currentName.isFromBirth
                },
                PersonalInfo: {
                    ApplicantType: "Candidate",
                    Gender: amlCheckRequest.personalInfo.gender,
                    DateOfBirth: amlCheckRequest.personalInfo.dateOfBirth,
                    HasValidDrivingLicense: amlCheckRequest.personalInfo.hasValidDrivingLicense,
                    CandidateEmail: amlCheckRequest.personalInfo.candidateEmail,
                    MotherMaidenName: amlCheckRequest.personalInfo.motherMaidenName,
                    NationalityAtBirth: amlCheckRequest.personalInfo.nationalityAtBirth,
                    CountryOfBirth: amlCheckRequest.personalInfo.countryOfBirth,
                    TownOfBirth: amlCheckRequest.personalInfo.townOfBirth,
                    MobilePhone: {
                        PhoneNumber: amlCheckRequest.personalInfo.mobilePhone.phoneNumber,
                        CountryCode: amlCheckRequest.personalInfo.mobilePhone.countryCode
                    },
                    HomePhone: {
                        PhoneNumber: amlCheckRequest.personalInfo.homePhone.phoneNumber,
                        CountryCode: amlCheckRequest.personalInfo.homePhone.countryCode
                    }
                },
                Identity: {
                    PassportDocument: {
                        PassportIssuingCountry: amlCheckRequest.identity.passportDocument.passportIssuingCountry,
                        PassportNumber: amlCheckRequest.identity.passportDocument.passportNumber,
                        PassportIssueDate: amlCheckRequest.identity.passportDocument.passportIssueDate,
                        PassportExpiryDate: amlCheckRequest.identity.passportDocument.passportExpiryDate,
                        PassportDateOfBirth: amlCheckRequest.identity.passportDocument.passportDateOfBirth
                    },
                    DrivingDocument: {
                        DriverLicenseType: amlCheckRequest.identity.drivingDocument.driverLicenseType,
                        DriverLicenseIssuingCountry: amlCheckRequest.identity.drivingDocument.driverLicenseIssuingCountry,
                        DriverLicenseNumber: amlCheckRequest.identity.drivingDocument.driverLicenseNumber,
                        DriverLicenseDate: amlCheckRequest.identity.drivingDocument.driverLicenseDate,
                        DriverLicenseDateOfBirth: amlCheckRequest.identity.drivingDocument.driverLicenseDateOfBirth
                    },
                    NationalInsuranceNumberDocument: {
                        NationalInsuranceNumber: amlCheckRequest.identity.nationalInsuranceNumberDocument.nationalInsuranceNumber
                    }
                }
            }
        }
    }
}

module.exports = new VerifileProxy()