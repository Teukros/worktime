var frisby = require('frisby'),
    async = require('async'),
    url = 'http://localhost:3000/',
    timeoutLength = 5000;

frisby.create("Set new customer")
    .waits(timeoutLength)
    .post(url + "customer/set", {
        "payload": {
            "id": "1"
        }
    })
    .expectStatus(201)
    .toss();
