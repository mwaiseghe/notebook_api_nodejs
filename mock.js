const forEach = require('./forEach');

// Using jest.fn() to create a mock function
const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

// In the code above, we have created a mock function using jest.fn() and passed it to the forEach function as a callback function. We then assert on the mock function to ensure that it was called twice, with the correct arguments and that it returned the correct value.


// .mock property

// The mock function has a .mock property which is where data about how the function has been called and what the function returned is kept. The .mock property also tracks the value of this for each call, so it is possible to inspect this as well:

const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ] - this is the instance of the function

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);
// > [ <b> ] - this is the context of the function

// In the code, we have created a mock function and then called it as a constructor and bound it to an object. We then inspect the .mock property to see what the value of this was for each call.

// mocking modules

// Jest allows you to mock out whole modules in your tests, which can be useful for testing if your code is calling functions from that module correctly. To mock a module, we can use jest.mock('moduleName') at the top of the test file. This will replace the ES6 module with a mock version of it (jest.mock automatically hoists all calls to mock to the top of the module).

const axios = require('axios');
const Users = require('./users');

jest.mock('axios'); // mock the module

test('should fetch users', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    axios.get.mockResolvedValue(resp);
    
    return Users.all().then(data => expect(data).toEqual(users));
});

// Here, we have mocked axios and we have set the resolved value to be an array of users. We then call the Users.all() function and assert that the data returned is the array of users that we set as the resolved value.

// Test Matchers

// Jest uses matchers to let you test values in different ways. There are a number of built-in matchers which can be used to make assertions in your tests. 

// Commonly used matchers

/*
There are a number of matchers that are used frequently in tests:

Truthiness - Tests if a value is truthy or falsy
toBeNull - Matches only null
toBeUndefined - Matches only undefined
toBeDefined - Is the opposite of toBeUndefined
toBeTruthy - Matches anything that an if statement treats as true
toBeFalsy - Matches anything that an if statement treats as false

Numbers - Tests if a value is a number or a number close to a number
toBeGreaterThan - Matches if a number is greater than another number
toBeGreaterThanOrEqual - Matches if a number is greater than or equal to another number
toBeLessThan - Matches if a number is less than another number
toBeLessThanOrEqual - Matches if a number is less than or equal to another number
toBeCloseTo - Matches if a number is close to another number

Strings - Tests if a string contains a substring
toMatch - Matches a string against a regular expression or a regular expression against a string

Arrays - Tests if an array contains a value
toContain - Matches if an array contains a value

Exceptions - Tests if a function throws an error when it is called
toThrow - Matches if a function throws an error when it is called


*/

// Example of a test using matchers

// Here is an example of a test in which we use a number of matchers to perform assertions:

test('Assert response of an API call', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    axios.get.mockResolvedValue(resp);
    
    return Users.all().then(data => {
        expect(data).toEqual(users);
        expect(data).toHaveLength(1);
        expect(data).not.toBeNull();
        expect(data).toContainEqual({name: 'Gift'});
    });
});


// Asynchronous Testing

// Jest provides a number of ways to handle asynchronous testing. The simplest way is to use the done callback. The done callback is passed to the test function as an argument. When the test is complete, you must call done() to let Jest know that the test is complete. If done() is never called, the test will fail (this is useful for testing asynchronous code that does not return a promise).

// Example of a test using the done callback

// Here is an example of a test that uses the done callback to test an asynchronous function:

test('the data is peanut butter', done => {
    function callback(data) {
        try {
            expect(data).toBe('peanut butter');
            done();
        } catch (error) {
            done(error);
        }
    }
    fetchData(callback);
})

// In the code above, we have a function called fetchData that takes a callback function as an argument. The callback function is called with the data that is returned from the API call. We then use the try/catch block to catch any errors that are thrown in the callback function and pass them to the done callback. If there are no errors, we call done() to let Jest know that the test is complete.

// Promises

// Jest also provides a way to test asynchronous code using promises. To test a promise, you can return the promise from the test function and Jest will wait for the promise to resolve before completing the test. If the promise is rejected, the test will fail.

// Example of a test using promises

// Here is an example of a test that uses promises to test an asynchronous function:

describe('fetchData', () => {
    it('should return post with the given id', async () => {
        const result = await fetchData(1);
        expect(result).toEqual({id: 1, title: 'test'});
    });

    it('should throw an error if id is not provided', async () => {
        await expect(fetchData()).rejects.toThrow('id is required');
    });
});

// try/catch

// Jest also provides a way to test asynchronous code using try/catch. To test a promise, you can return the promise from the test function and Jest will wait for the promise to resolve before completing the test. If the promise is rejected, the test will fail.

describe('fetchData', () => {
    it('should return post with the given id', async () => {
        try {
            const result = await fetchData(1);
            expect(result).toEqual({id: 1, title: 'test'});
        } catch (error) {
            expect(error).toBeNull();
        }
    });

    it('should throw an error if id is not provided', async () => {
        try {
            await fetchData();
        } catch (error) {
            expect(error).toEqual('id is required');
        }
    });
});




