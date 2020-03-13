const axios = require('axios')
const uuidv4 = require('uuid').v4
const axiosInstance = axios.create({
    baseURL: 'https://api.verifile.co.uk/sandbox.test/api/v1',
    timeout: 60000,
    headers: {
        'VerifileUserId': '39747fef-4dc6-4b19-b70a-b6b85a7e88ab',
        'Ocp-Apim-Subscription-Key': '6dd810282309485d860964bef66caf15',
        'Content-Type': 'application/json'
    }
  });

class VerifileProxy {
    doAMLCheck(amlCheckRequest) {
        const request = {
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
        return axiosInstance.post('/orders/cliententry', request)
    }

    getOrderStatus(id) {
        return axiosInstance.get('/orders/' + id + '/status')
    }
}

module.exports = new VerifileProxy()