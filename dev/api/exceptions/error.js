module.exports = class ErrorsException extends Error {
    constructor(errors = []) {
        super();
        this.errors = errors;
    }
}