class BusinessExceptionClass {
    constructor (errorCode = null, message = null) {
        Error.captureStackTrace(this, this.constructor);
        this.name = 'BussinessException';
        this.errorCode = errorCode;
        this.message = message;
    }

    dans() {
        return {
            errorCode: this.errorCode,
            message: `DansApi Error: ${this.errorCode} ${this.message}`
        };
    }
}

const notFound = (item) => {
    return new BusinessExceptionClass(
        404,
        `${item} not found`
    );
};

module.exports = {
    ExceptionClass: BusinessExceptionClass,
    notFound: notFound
};