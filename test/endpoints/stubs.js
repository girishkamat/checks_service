module.exports = {
    amlCheckRequest: {
        "previousNames": [],
        "addressList": [
            {
                "dateMovedToThisAddress": "2013-04-02",
                "dateLeftThisAddress": "2016-05-25",
                "isCurrentAddress": false,
                "address": {
                    "flatNumber": "61",
                    "houseName": "Test",
                    "houseNumber": "61",
                    "streetName": "Queen Road",
                    "locality": "test",
                    "town": "Aylesbury",
                    "county": "Buckinghamshire",
                    "state": "Buckinghamshire",
                    "postcode": "AB112HB",
                    "country": "GB"
                }
            },
            {
                "dateMovedToThisAddress": "2016-05-26",
                "isCurrentAddress": true,
                "address": {
                    "flatNumber": "1",
                     "houseName": "Test",
                    "houseNumber": "1",
                    "streetName": "Jumelle Mews",
                    "locality": "test",
                    "town": "Aylesbury",
                    "county": "Buckinghamshire",
                    "state": "Buckinghamshire",
                    "postcode": "AB135BU",
                    "country": "GB"
                }
            }
        ],
        "currentName": {
            "title": "Mr",
            "firstName": "John",
            "lastName": "Smith",
            "middleNames": "Jane",
            "isFromBirth": true
        },
        "personalInfo": {
            "gender": "Male",
            "dateOfBirth": "1982-01-27",
            "hasValidDrivingLicense": true,
            "candidateEmail": "johnt@gmail.com",
            "motherMaidenName": "Laura",
            "nationalityAtBirth": "GB",
            "countryOfBirth": "GB",
            "townOfBirth": "Aylesbury",
            "mobilePhone": {
                "phoneNumber": "07450104111",
                "countryCode": "GB"
            },
            "homePhone": {
                "phoneNumber": "01494700111",
                "countryCode": "GB"
            }
        },
        "identity": {
            "passportDocument": {
                "passportIssuingCountry": "GB",
                "passportNumber": "528881111",
                "passportIssueDate": "2014-12-02",
                "passportExpiryDate": "2024-12-02",
                "passportDateOfBirth": "1982-01-27"
            },
            "drivingDocument": {
                "driverLicenseType": "Photo",
                "driverLicenseIssuingCountry": "GB",
                "driverLicenseNumber": "JOHN801272AAAA",
                "driverLicenseDate": "2016-06-21",
                "driverLicenseDateOfBirth": "1982-01-27"
            },
            "nationalInsuranceNumberDocument": {
                "nationalInsuranceNumber": "JJ123456D"
            }
        }
    },

    amlCheckResponse: {
        "OrderState": {
            "StateDescription": "Application"
        },
        "Checks": [
            {
                "CheckState": {
                    "StateDescription": "Application"
                },
                "Id": 1,
                "Comment": "",
                "CompletedDate": null,
                "CheckType": "UKIDAMLCheckUKAML"
            }
        ],
        "Candidate": {
            "CurrentName": {
                "Title": "Mr",
                "FirstName": "John",
                "LastName": "Smith",
                "MiddleNames": "Jane",
                "FullName": "Mr John Jane Smith",
                "IsFromBirth": true,
                "KnownFromDate": null
            },
            "PersonalInfo": {
                "MobilePhone": {
                    "PhoneNumber": "07450104111",
                    "CountryCode": "GB"
                },
                "HomePhone": {
                    "PhoneNumber": "01494700111",
                    "CountryCode": "GB"
                },
                "Gender": "Male",
                "DateOfBirth": "1982-01-27",
                "PositionAppliedFor": "",
                "ApplicantNotes": "",
                "FSAApproved": false,
                "HasValidDrivingLicense": true,
                "ApplicantType": "Candidate",
                "CurrentNationality": "",
                "CandidateEmail": "john@gmail.com",
                "BirthCertificationNumber": "",
                "MotherMaidenName": "Laura",
                "NationalityAtBirth": "GB",
                "CountryOfBirth": "GB",
                "TownOfBirth": "Aylesbury"
            },
            "Identity": {
                "PassportDocument": {
                    "PassportIssuingCountry": "GB",
                    "PassportNumber": "528881111",
                    "PassportIssueDate": "2014-12-02",
                    "PassportExpiryDate": "2024-12-02",
                    "PassportDateOfBirth": "1982-01-27"
                },
                "DrivingDocument": {
                    "DriverLicenseType": "Photo",
                    "DriverLicenseIssuingCountry": "GB",
                    "DriverLicenseNumber": "JOHN801272AAAA",
                    "DriverLicenseDate": "2016-06-21",
                    "DriverLicenseDateOfBirth": "1982-01-27"
                },
                "NationalInsuranceNumberDocument": {
                    "OverseasIdentityNumber": {
                        "IssuingCountry": "",
                        "IdentityNumber": ""
                    },
                    "NationalInsuranceNumber": "JJ123456D"
                }
            },
            "PreviousNames": [],
            "AddressList": [
                {
                    "Address": {
                        "BusinessName": "",
                        "FlatNumber": "1",
                        "HouseNumber": "1",
                        "HouseName": "",
                        "StreetName": "Jumelle Mews",
                        "Locality": "test",
                        "Town": "Aylesbury",
                        "County": "Buckinghamshire",
                        "State": "Buckinghamshire",
                        "Postcode": "AB112HB",
                        "AddressString": "1 Jumelle Mews Aylesbury Buckinghamshire AB112HB GB",
                        "Country": "GB"
                    },
                    "DateMovedToThisAddress": "2016-05-26",
                    "DateLeftThisAddress": null,
                    "IsCurrentAddress": true
                },
                {
                    "Address": {
                        "BusinessName": "1",
                        "FlatNumber": "1",
                        "HouseNumber": "61",
                        "HouseName": "",
                        "StreetName": "Queen Road",
                        "Locality": "test",
                        "Town": "Aylesbudy",
                        "County": "Buckinghamshire",
                        "State": "",
                        "Postcode": "HP11 2HB",
                        "AddressString": "61 Queen Road Aylesbury Buckinghamshire AB135BU GB",
                        "Country": "GB"
                    },
                    "DateMovedToThisAddress": "2013-04-02",
                    "DateLeftThisAddress": "2016-05-25",
                    "IsCurrentAddress": false
                }
            ]
        },
        "Id": 1,
        "UniqueKey": "a9a70284-60d6-11ea-bc55-0242ac130005",
        "CandidateLinkKey": null,
        "CompletedDate": null,
        "Package": ""
    }
}