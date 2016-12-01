'use strict';

class CallbackResponser {

    static do(error, result, callback){

        const hasError = !!error;

        const status = hasError ? 500 : 200;
        const message = hasError ? error : result;

        const response = {
            status,
            message
        };

        const callbackResult = callback(response);
        //  hasError ? callback(response) : callback(null, response);

        return callbackResult;
    }
}

module.exports = CallbackResponser;