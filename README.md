# Checks Service

This is an API to perform various types of candidate checks using the Verifile API (https://www.verifile.co.uk/services)

*Developer Account* 

The developer guide is documented at https://developer.verifile.co.uk/guide/introduction

To access the credentials for the sandbox API, please sign in using the developer credentials below

URL: https://developer.verifile.co.uk/signin
User: sangeeta.paranjape@robasys.com
Password: Password2020

and visit the profile page.

*Sandbox API details*

The following headers are required when making the API requests

API Endpoint: https://api.verifile.co.uk/sandbox.test/api/v1
VerifileUserID: 39747fef-4dc6-4b19-b70a-b6b85a7e88ab
Ocp-Apim-Subscription-Key: xxxxxxxxxxxxxxxxxxxxxxx

To get the Ocp-Apim-Subscription-Key, visit the profile page and reveal the value of "Primary key" field.

Sample request to get all open orders
```
curl -X GET \
  https://api.verifile.co.uk/sandbox.test/api/v1/orders/GetOpenOrders \
  -H 'Ocp-Apim-Subscription-Key: xxxxxxxxxxxxxxxxxxx' \
  -H 'VerifileUserId: 39747fef-4dc6-4b19-b70a-b6b85a7e88ab' \
```

*Checks*

The checks service is currently deployed to heroku at http://checksservice.herokuapp.com

Swagger docs for the service are available at http://checksservice.herokuapp.com/docs

AML Check (anti money laundering check) has been implemented at the moment.

To get the status of the check, call the check status endpoint. 

All the endpoints support a mock query param, to return mock responses for faster development during integration.

*Tech stack*

The service is implemented as a NodeJS webserver, using the following libraries

1. express (webserver and routing)
2. @hapi/joi (for request validation)
3. acios (for making http requests to verifile API)
4. swagger-js-doc and swagger-ui-express (for generating swagger docs)
5. uuid (for generating UUID)

To start the webserver, simple call ```npm start```

* Heroku *




