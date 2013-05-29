/*global describe, it, expect, runs, beforeEach */
'use strict';

var val = require('../lib/lx-valid');
var typeForTest, dataForConvertTest;
var schemaForTest = {
    'type': 'object',
    '$schema': 'http://json-schema.org/draft-03/schema',
    'id': '#',
    'required': false,
    'properties': {
        'UuidTest': {
            'type': 'string',
            'id': 'UuidTest',
            'required': true,
            'format': 'mongo-id'
        },
        'IntTest': {
            'type': 'integer',
            'id': 'IntTest',
            'required': false
        },
        'arrayTest': {
            'type': 'array',
            'id': 'arrayTest',
            'required': false,
            'maxItems': 3,
            'items': {
                'type': 'integer',
                'id': '0',
                'required': false
            }
        },
        'boolTest': {
            'type': 'boolean',
            'id': 'boolTest',
            'required': false
        },
        'dateTest': {
            'type': 'string',
            'id': 'dateTest',
            'required': false,
            'format': 'date-time'
        },
        'floatTest': {
            'type': 'number',
            'id': 'floatTest',
            'required': false,
            'format': 'number-float'

        },
        'nullTest': {
            'type': 'null',
            'id': 'nullTest',
            'required': false
        },
        'objectTest': {
            'type': 'object',
            'id': 'objectTest',
            'required': false,
            'properties': {
                'name': {
                    'type': 'string',
                    'id': 'name',
                    'required': false,
                    'minLength': 1,
                    'pattern': 'xen?.a'
                }
            }
        },
        'stringTest': {
            'type': 'string',
            'id': 'stringTest',
            'required': false
        },
        'urlTest': {
            'type': 'string',
            'id': 'urlTest',
            'required': false,
            'format': 'url'
        }
    }
};
var schemaForConvertTest = {
    'properties': {
        '_id': {
            'type': 'string',
            'required': false,
            'format': 'mongo-id'
        },
        'myObject': {
            type: 'object',
            'required': false,
            'properties': {
                '_id1': {
                    'type': 'string',
                    'required': false,
                    'format': 'mongo-id'
                },
                'myObject2': {
                    type: 'object',
                    'required': false,
                    'properties': {
                        '_id2': {
                            'type': 'string',
                            'required': false,
                            'format': 'mongo-id'
                        },
                        'myArray2': {
                            type: 'array',
                            'required': false,
                            items: {
                                'type': 'string',
                                'required': false,
                                'format': 'mongo-id'
                            }
                        }
                    }
                }
            }
        },
        'myArray': {
            type: 'array',
            'required': false,
            items: {
                type: 'object',
                'required': false,
                'properties': {
                    '_id3': {
                        'type': 'string',
                        'required': false,
                        'format': 'mongo-id'
                    },
                    'myObject3': {
                        type: 'object',
                        'required': false,
                        'properties': {
                            '_id4': {
                                'type': 'string',
                                'required': false,
                                'format': 'mongo-id'
                            },
                            'myArray3': {
                                type: 'array',
                                'required': false,
                                'items': {
                                    type: 'object',
                                    'required': false,
                                    properties: {
                                        '_id5': {
                                            'type': 'string',
                                            'required': false,
                                            'format': 'mongo-id'
                                        },
                                        'myArray4': {
                                            type: 'array',
                                            'required': false,
                                            items: {
                                                'type': 'string',
                                                'required': false,
                                                'format': 'mongo-id'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

function convertJson (val) {
    // json
    var toJsonTypeTest = JSON.stringify(val);
    return JSON.parse(toJsonTypeTest);
}

function convert (format, value) {
    if (typeof value !== 'string') {
        return value;
    }

    if (format === 'mongo-id') {
        return {oid: value};
    }

    if (format === 'date-time') {
        return new Date(value);
    }

    return value;
}

beforeEach(function () {
    typeForTest = {
        UuidTest: '507f191e810c19729de860ea',
        stringTest: '3.31',
        floatTest: 3.2,
        IntTest: 2,
        arrayTest: [1, 2, 3],
        boolTest: true,
        objectTest: {name: 'xenia'},
        nullTest: null,
        dateTest: '1973-06-01T15:49:00.000Z',
        urlTest: 'http://google.de'
    };

    dataForConvertTest = {
        _id: '507f191e810c19729de860ea',
        myObject: {
            _id1: '507f191e810c19729de860ea',
            myObject2: {
                _id2: '507f191e810c19729de860ea',
                myArray2: [
                    '507f191e810c19729de860ea',
                    '507f191e810c19729de860ea',
                    '507f191e810c19729de860ea'
                ]
            }
        },
        myArray: [
            {
                _id3: '507f191e810c19729de860ea',
                myObject3: {
                    _id4: '507f191e810c19729de860ea',
                    myArray3: [
                        {
                            _id5: '507f191e810c19729de860ea',
                            myArray4: [
                                '507f191e810c19729de860ea',
                                '507f191e810c19729de860ea',
                                '507f191e810c19729de860ea'
                            ]
                        }
                    ]
                }
            },
            {
                _id3: '507f191e810c19729de860ea',
                myObject3: {
                    _id4: '507f191e810c19729de860ea',
                    myArray3: [
                        {
                            _id5: '507f191e810c19729de860ea',
                            myArray4: [
                                '507f191e810c19729de860ea',
                                '507f191e810c19729de860ea',
                                '507f191e810c19729de860ea'
                            ]
                        }
                    ]
                }
            },
            {
                _id3: '507f191e810c19729de860ea',
                myObject3: {
                    _id4: '507f191e810c19729de860ea',
                    myArray3: [
                        {
                            _id5: '507f191e810c19729de860ea',
                            myArray4: [
                                '507f191e810c19729de860ea',
                                '507f191e810c19729de860ea',
                                '507f191e810c19729de860ea'
                            ]
                        }
                    ]
                }
            }
        ]
    };
});

describe('Validator', function () {
    it('validate() should return true when type conform schema', function () {
        var result = val.validate(convertJson(typeForTest), schemaForTest);

        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);
    });

    it('validate() should validate an int correctly', function () {
        var oldIntTest = typeForTest.IntTest;
        typeForTest.IntTest = '12973219837';

        var result = val.validate(convertJson(typeForTest), schemaForTest);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);

        typeForTest.IntTest = oldIntTest;

        var result2 = val.validate(convertJson(typeForTest), schemaForTest);
        expect(result2.valid).toBe(true);
        expect(result2.errors.length).toBe(0);
    });

    it('validate() should validate an object correctly', function () {
        var old = typeForTest.objectTest;
        typeForTest.objectTest = {name: 'timo'};

        var result = val.validate(convertJson(typeForTest), schemaForTest);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);

        typeForTest.objectTest = old;

        var result2 = val.validate(convertJson(typeForTest), schemaForTest);
        expect(result2.valid).toBe(true);
        expect(result2.errors.length).toBe(0);
    });

    it('getValidationFunction() should return the validation function', function () {
        var valFn = val.getValidationFunction();
        var data = convertJson(typeForTest);
        var result = valFn(data, schemaForTest);

        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);

        // delete required property
        delete data.UuidTest;
        result = valFn(data, schemaForTest, {isUpdate: true});

        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);

        result = valFn(null, schemaForTest, {isUpdate: true});

        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);
    });

    it('validate() should convert if convert function is defined', function () {
        var convertFn = function (format, value) {
            if (format === 'mongo-id') {
                return 'convertedMongoId';
            }

            if (format === 'date-time') {
                return new Date(value);
            }

            return value;
        };
        var data = convertJson(typeForTest);

        var result = val.validate(data, schemaForTest, {convert: convertFn});
        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);
        expect(data.UuidTest).toBe('convertedMongoId');
        expect(typeof data.dateTest).toBe('object');
        expect(data.dateTest.getFullYear()).toBe(1973);
    });

    it('validate() should not convert if no convert function is defined', function () {
        var result = val.validate(convertJson(typeForTest), schemaForTest);

        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);
        expect(result.convertedObject).toBeUndefined();
    });

    it('validate() should remove properties in object which are no properties of the schema', function () {
        var data = {
            UuidTest: '507f191e810c19729de860ea',
            stringTest: '3.31',
            floatTest: 3.2,
            IntTest: 2,
            arrayTest: [1, 2, 3],
            boolTest: true,
            objectTest: {name: 'xenia'},
            nullTest: null,
            dateTest: '1973-06-01T15:49:00.000Z',
            urlTest: 'http://google.de'
        };

        data.someUnknownProperty = 'wayne';
        data.someUnknownObject = {
            id: 1,
            name: 'wayne'
        };

        var result = val.validate(data, schemaForTest, {deleteUnknownProperties: true});

        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);
        expect(typeForTest.someUnknownProperty).toBeUndefined();
        expect(typeForTest.someUnknownObject).toBeUndefined();
    });

    it('validate() should validate a string correctly', function () {
        var oldType = typeForTest.stringTest,
            oldSchema = schemaForTest.properties.stringTest,
            stringTest = 'Test24Test',
            wrongStringTest = 'TestTest',
            testFormat = /^Test[0-9]{2}Test$/;

        schemaForTest.properties.stringTest.format = 'test-format';

        expect(function () { val.extendFormat(); }).toThrow();
        expect(function () { val.extendFormat(1); }).toThrow();
        expect(function () { val.extendFormat('test'); }).toThrow();
        expect(function () { val.extendFormat('test', 'test'); }).toThrow();
        expect(function () { val.extendFormat('email', 'test'); }).toThrow();

        // set new format
        val.extendFormat('test-format', testFormat);

        // test wrong value
        typeForTest.stringTest = wrongStringTest;
        var result = val.validate(convertJson(typeForTest), schemaForTest);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);

        // valid test
        typeForTest.stringTest = stringTest;
        var result2 = val.validate(convertJson(typeForTest), schemaForTest);
        expect(result2.valid).toBe(true);
        expect(result2.errors.length).toBe(0);

        typeForTest.stringTest = oldType;
        schemaForTest.properties.stringTest = oldSchema;
    });

    it('asyncValidate() should find already existing values ​​and properly validate', function () {

        // test mock
        var testDb = [
            {userName: 'user1', email: 'user1@test.de'},
            {userName: 'user2', email: 'user2@test.de'}
        ];

        // checkUser validator
        function checkUserName (userName, cb) {
            var i, max,
                result = {valid: true, errors: []};
            for (i = 0, max = testDb.length; i < max; i += 1) {
                if (testDb[i].userName === userName) {
                    result.valid = false;
                    result.errors.push({attribute: 'checkUserName',
                        property: 'userName', expected: false, actual: true,
                        message: 'userName already exists'});
                }
            }

            cb(null, result);
        }

        // checkEmail validator
        function checkEmail (email, cb) {
            var i, max,
                result = {valid: true, errors: []};
            for (i = 0, max = testDb.length; i < max; i += 1) {
                if (testDb[i].email === email) {
                    result.valid = false;
                    result.errors.push({attribute: 'checkEmail',
                        property: 'email', expected: false, actual: true,
                        message: 'email already exists'});
                }
            }

            cb(null, result);
        }

        var valResult = {valid: true, errors: []},
            flag, value;

        // register async validator
        val.asyncValidate.register(checkUserName, 'user1');
        val.asyncValidate.register(checkEmail, 'user1@test.de');

        // async validate
        runs(function () {
            flag = false;
            val.asyncValidate.exec(valResult, function (err, res) {
                if (err) {
                    value = err;
                }
                else {
                    value = res;
                }

                flag = true;
            });
        });

        runs(function () {
            expect(value.valid).toBe(false);
            expect(value.errors.length).toBe(2);
        });
    });

    it('asyncValidate() should not validate existing values ​​correctly', function () {

        // test mock
        var testDb = [
            {userName: 'user33', email: 'user33@test.de'}
        ];

        // checkUser validator
        function checkUserName (userName, cb) {
            var i, max,
                result = {valid: true, errors: []};
            for (i = 0, max = testDb.length; i < max; i += 1) {
                if (testDb[i].userName === userName) {
                    result.valid = false;
                    result.errors.push({attribute: 'checkUserName',
                        property: 'userName', expected: false, actual: true,
                        message: 'userName already exists'});
                }
            }

            cb(null, result);
        }

        // checkEmail validator
        function checkEmail (email, cb) {
            var i, max,
                result = {valid: true, errors: []};
            for (i = 0, max = testDb.length; i < max; i += 1) {
                if (testDb[i].email === email) {
                    result.valid = false;
                    result.errors.push({attribute: 'checkEmail',
                        property: 'email', expected: false, actual: true,
                        message: 'email already exists'});
                }
            }

            cb(null, result);
        }

        var valResult = {valid: true, errors: []},
            flag, value;

        // register async validator
        val.asyncValidate.register(checkUserName, 'user1');
        val.asyncValidate.register(checkEmail, 'user1@test.de');

        // async validate
        runs(function () {
            flag = false;
            val.asyncValidate.exec(valResult, function (err, res) {
                if (err) {
                    value = err;
                }
                else {
                    value = res;
                }

                flag = true;
            });
        });

        runs(function () {
            expect(value.valid).toBe(true);
            expect(value.errors.length).toBe(0);
        });
    });

    it('should convert the data if covert function is set', function () {
        var result = val.validate(dataForConvertTest, schemaForConvertTest, {convert: convert});
        var convertedMongoId = JSON.stringify({oid: '507f191e810c19729de860ea'});

        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);

        expect(JSON.stringify(dataForConvertTest._id)).toBe(convertedMongoId);
        expect(JSON.stringify(dataForConvertTest.myObject._id1)).toBe(convertedMongoId);
        expect(JSON.stringify(dataForConvertTest.myObject._id1)).toBe(convertedMongoId);
        expect(JSON.stringify(dataForConvertTest.myObject.myObject2._id2)).toBe(convertedMongoId);
        expect(dataForConvertTest.myObject.myObject2.myArray2.length).toBe(3);
        expect(JSON.stringify(dataForConvertTest.myObject.myObject2.myArray2[0])).toBe(convertedMongoId);
        expect(dataForConvertTest.myArray.length).toBe(3);
        expect(JSON.stringify(dataForConvertTest.myArray[0]._id3)).toBe(convertedMongoId);
        expect(JSON.stringify(dataForConvertTest.myArray[0].myObject3._id4)).toBe(convertedMongoId);
        expect(dataForConvertTest.myArray[0].myObject3.myArray3.length).toBe(1);
        expect(JSON.stringify(dataForConvertTest.myArray[0].myObject3.myArray3[0]._id5)).toBe(convertedMongoId);
        expect(dataForConvertTest.myArray[0].myObject3.myArray3[0].myArray4.length).toBe(3);
        expect(JSON.stringify(dataForConvertTest.myArray[0].myObject3.myArray3[0].myArray4[1])).toBe(convertedMongoId);

    });
});