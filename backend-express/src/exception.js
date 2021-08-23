import ah from 'express-async-handler';


export class RequestException extends Error {
    constructor(errcode, message) {
        super(message);
        this.code = errcode;
        this.message = message;
    }
}

export const asyncHandler = ah;