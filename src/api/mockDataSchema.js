module.exports = {
  "type": "object",
  "properties": {
    "customer": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number",
          "minimum": 1,
          "maximum": 1
        },
        "photo": {
          "type": "string",
          "faker": "image.avatar"
        },
        "firstName": {
          "faker": "name.firstName"
        },
        "middleName": {
          "faker": "name.lastName"
        },
        "lastName": {
          "faker": "name.lastName"
        },
        "isCompany": {
          "type": "boolean"
        },
        "companyName": {
          "type": "string",
          "pattern": "ACME Company| ABC Company"
        },
        "companyType": {
          "type": "string",
          "pattern": "Business|Fleet|Dealer"
        },
        "customerPreferences": {
          "type": "object",
          "properties": {
            "doNotCall": {
              "type": "boolean"
            },
            "doNotMail": {
              "type": "boolean"
            },
            "doNotEmail": {
              "type": "boolean"
            },
          },
          "required": ["doNotCall", "doNotMail", "doNotEmail"]
        },
        "address": {
          "type": "object",
          "properties": {
            "customerAddressId": {
              "type": "number",
              "minimum": 1
            },
            "street": {
              "faker": "address.streetAddress"
            },
            "street2": {
              "faker": "address.secondaryAddress"
            },
            "city": {
              "faker": "address.city"
            },
            "state": {
              "faker": "address.stateAbbr"
            },
            "postal": {
              "faker": "address.zipCode"
            },
          },
          "required": ["customerAddressId", "street", "street2", "city", "state", "postal"]
        },
      },
      "required": ["id", "photo", "firstName", "middleName", "lastName", "phone", "contactEmail", "isCompany", "companyName", "companyType", "title", "address"]
    }
  },
  "required": ["customer"]
};
