console.log = function () { };
const { expect, assert } = require('chai');
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('public/main.js', 'utf8');

describe('', function () {
  it('', function () {

    let funcPresentStruct = function () {
      const shortenUrl = async () => { }
    };

    let funcPresent = Structured.match(code, funcPresentStruct);
    expect(funcPresent, 'Did you accidentally delete `shortenUrl`? It should still be an `async` arrow function that takes zero parameters.').to.not.be.false;


    let fetchPresentStruct = function () {
      const shortenUrl = async () => {
        try {
          const response = await fetch();
        } catch (_) { }
      }
    }

    let fetchPresent = Structured.match(code, fetchPresentStruct);
    expect(fetchPresent, 'Is there still a `try` block in `getSuggestions` that creates a variable named `response` that `await`s a call to `fetch()`?').to.not.be.false;


    let fetchArgsBaseStruct = function () {
      const shortenUrl = async () => {
        const response = await fetch(url, {})
      }
    }

    let fetchArgsBase = Structured.match(code, fetchArgsBaseStruct);
    expect(fetchArgsBase, 'Did you pass `url` as the first argument to `fetch()` and an object as the second?').to.not.be.false;


    let methodStruct = function () {
      const shortenUrl = async () => {
        const response = await fetch(url, {
          $method: $POST
        })
      }
    }

    const methodVarCallbacks = {
      "$method": function (method) {
        // value for string key, name for identifier key
        if (method.value !== 'method' && method.name !== 'method') {
          return { failure: "Did you create the key-value pair with a key of `method`?" }
        }
        return true
      },
      "$POST": function (POST) {
        if (POST.value !== 'POST') {
          return { failure: "Did you create the key-value pair with a value of `'POST'`?" }
        }
        return true
      }
    }

    let method = Structured.match(code, methodStruct, { varCallbacks: methodVarCallbacks });
    expect(method, methodVarCallbacks.failure || "Did you create the key-value pair of `method` and `'POST'` inside the second argument of `fetch()`?").to.not.be.false;


    let bodyStruct = function () {
      const shortenUrl = async () => {
        const response = await fetch(url, {
          $body: data
        })
      }
    }

    const bodyVarCallbacks = {
      "$body": function (body) {
        // value for string key, name for identifier key
        if (body.value !== 'body' && body.name !== 'body') {
          return { failure: "Did you create the key-value pair with a key of `body`?" }
        }
        return true
      }
    }

    let body = Structured.match(code, bodyStruct, { varCallbacks: bodyVarCallbacks });
    expect(body, bodyVarCallbacks.failure || 'Did you create a `body` property with a value of `data` inside the second argument of `fetch()`?').to.not.be.false;


    let headersDefStruct = function () {
      const shortenUrl = async () => {
        const response = await fetch(url, {
          $headers: {}
        })
      }
    }

    const headersVarCallbacks = {
      "$headers": function (headers) {
        // value for string key, name for identifier key
        if (headers.value !== 'headers' && headers.name !== 'headers') {
          return { failure: "Did you create the key-value pair with a key of `headers`?" }
        }
        return true
      }
    }

    let headersDef = Structured.match(code, headersDefStruct, { varCallbacks: headersVarCallbacks });
    assert.isOk(headersDef, headersVarCallbacks.failure || "Did you create the key-value pair inside the second argument of `fetch()` where the key is `headers` and the value is an object?");


    let headersItemsStruct = function () {
      const shortenUrl = async () => {
        const response = await fetch(url, {
          $headers: {
            _: _,
            _: _
          }
        })
      }
    }

    let headersItems = Structured.match(code, headersItemsStruct, { varCallbacks: headersVarCallbacks });
    assert.isOk(headersItems, "Within the `headers` object, did you create two key-value pairs?");


    let contentTypeStruct = function () {
      const shortenUrl = async () => {
        const response = await fetch(url, {
          $headers: {
            $contentType: $appJson
          }
        })
      }
    }

    const contentTypeVarCallbacks = {
      ...headersVarCallbacks,
      "$contentType": function (contentType) {
        if (contentType.value !== 'Content-type') {
          return { failure: "Did you create a key-value pair on the `headers` object with a key of `'Content-type'`?" }
        }
        return true
      },
      "$appJson": function (appJson) {
        if (appJson.value !== 'application/json') {
          return { failure: "Did you create a key-value pair on the `headers` object with a key of `'Content-type'` and a value of `'application/json'`?" }
        }
        return true
      }
    }

    let contentType = Structured.match(code, contentTypeStruct, { varCallbacks: contentTypeVarCallbacks });
    assert.isOk(contentType, contentTypeVarCallbacks.failure || "Did you create a key-value pair on the `headers` object with a key of `'Content-type'` and a value of `'application/json'`?");


    let apikeyStruct = function () {
      const shortenUrl = async () => {
        const response = await fetch(url, {
          $headers: {
            $apikeyKey: apiKey
          }
        })
      }
    }

    const apikeyVarCallbacks = {
      ...headersVarCallbacks,
      "$apikeyKey": function (apikeyKey) {
        if (apikeyKey.value !== 'apikey' && apikeyKey.name !== 'apikey') {
          return { failure: "Did you create the key-value pair on the `headers` object with a key of `apikey`?" }
        }
        return true
      }
    }

    let apikey = Structured.match(code, apikeyStruct, { varCallbacks: apikeyVarCallbacks });
    assert.isOk(apikey, apikeyVarCallbacks.failure || "Did you create a key-value pair on the `headers` object with a key of `'apikey'` and your `apiKey` as the value?");

  });
});
