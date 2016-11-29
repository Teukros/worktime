var frisby = require('frisby'),
    async = require('async'),
    url = 'http://localhost:3000/',
    timeoutLength = 5000,
    idNumberGen = function(previousIdNumber){
        previousIdNumber = previousIdNumber++;
        return previousIdNumber;
    };
    previousIdNumber = 0;

frisby.create("Set new customer")
    .waits(timeoutLength)
    .post(url + "customer/set", {
        "payload": {
            "id": "1"
        }
    })
    .expectStatus(201)
    .toss();

frisby.create("get new customer")
    .waits(timeoutLength)
    .post(url + "customer/get", {
      "customerid": "1",
        "payload": {
            "id": "1"
        }
      })
    .expectStatus(200)
    .toss();

    frisby.create("get for holidays")
        .waits(timeoutLength)
        .post(url + "customer/get", {
          "customerid": "1",
            "payload": {
              "year":"2016"
            }
          })
        .expectStatus(200)
        .toss();

    frisby.create("set new holiday")
        .waits(timeoutLength)
        .post(url + "customer/set", {
          "customerid": "1",
            "payload": {
                "id": "1",
                "date": "2016-04-21"
            }
          })
        .expectStatus(200)
        .toss();
