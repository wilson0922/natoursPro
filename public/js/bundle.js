(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/stripe/cjs/net/HttpClient.js
  var require_HttpClient = __commonJS({
    "node_modules/stripe/cjs/net/HttpClient.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HttpClientResponse = exports.HttpClient = void 0;
      var HttpClient = class _HttpClient {
        /** The client name used for diagnostics. */
        getClientName() {
          throw new Error("getClientName not implemented.");
        }
        makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
          throw new Error("makeRequest not implemented.");
        }
        /** Helper to make a consistent timeout error across implementations. */
        static makeTimeoutError() {
          const timeoutErr = new TypeError(_HttpClient.TIMEOUT_ERROR_CODE);
          timeoutErr.code = _HttpClient.TIMEOUT_ERROR_CODE;
          return timeoutErr;
        }
      };
      exports.HttpClient = HttpClient;
      HttpClient.CONNECTION_CLOSED_ERROR_CODES = ["ECONNRESET", "EPIPE"];
      HttpClient.TIMEOUT_ERROR_CODE = "ETIMEDOUT";
      var HttpClientResponse = class {
        constructor(statusCode, headers) {
          this._statusCode = statusCode;
          this._headers = headers;
        }
        getStatusCode() {
          return this._statusCode;
        }
        getHeaders() {
          return this._headers;
        }
        getRawResponse() {
          throw new Error("getRawResponse not implemented.");
        }
        toStream(streamCompleteCallback) {
          throw new Error("toStream not implemented.");
        }
        toJSON() {
          throw new Error("toJSON not implemented.");
        }
      };
      exports.HttpClientResponse = HttpClientResponse;
    }
  });

  // node_modules/stripe/cjs/net/FetchHttpClient.js
  var require_FetchHttpClient = __commonJS({
    "node_modules/stripe/cjs/net/FetchHttpClient.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FetchHttpClientResponse = exports.FetchHttpClient = void 0;
      var HttpClient_js_1 = require_HttpClient();
      var FetchHttpClient = class extends HttpClient_js_1.HttpClient {
        constructor(fetchFn) {
          super();
          this._fetchFn = fetchFn;
        }
        /** @override. */
        getClientName() {
          return "fetch";
        }
        makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
          const isInsecureConnection = protocol === "http";
          const url = new URL(path, `${isInsecureConnection ? "http" : "https"}://${host}`);
          url.port = port;
          const methodHasPayload = method == "POST" || method == "PUT" || method == "PATCH";
          const body = requestData || (methodHasPayload ? "" : void 0);
          const fetchFn = this._fetchFn || fetch;
          const fetchPromise = fetchFn(url.toString(), {
            method,
            // @ts-ignore
            headers,
            // @ts-ignore
            body
          });
          let pendingTimeoutId;
          const timeoutPromise = new Promise((_, reject) => {
            pendingTimeoutId = setTimeout(() => {
              pendingTimeoutId = null;
              reject(HttpClient_js_1.HttpClient.makeTimeoutError());
            }, timeout);
          });
          return Promise.race([fetchPromise, timeoutPromise]).then((res) => {
            return new FetchHttpClientResponse(res);
          }).finally(() => {
            if (pendingTimeoutId) {
              clearTimeout(pendingTimeoutId);
            }
          });
        }
      };
      exports.FetchHttpClient = FetchHttpClient;
      var FetchHttpClientResponse = class _FetchHttpClientResponse extends HttpClient_js_1.HttpClientResponse {
        constructor(res) {
          super(res.status, _FetchHttpClientResponse._transformHeadersToObject(res.headers));
          this._res = res;
        }
        getRawResponse() {
          return this._res;
        }
        toStream(streamCompleteCallback) {
          streamCompleteCallback();
          return this._res.body;
        }
        toJSON() {
          return this._res.json();
        }
        static _transformHeadersToObject(headers) {
          const headersObj = {};
          for (const entry of headers) {
            if (!Array.isArray(entry) || entry.length != 2) {
              throw new Error("Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.");
            }
            headersObj[entry[0]] = entry[1];
          }
          return headersObj;
        }
      };
      exports.FetchHttpClientResponse = FetchHttpClientResponse;
    }
  });

  // node_modules/stripe/cjs/crypto/CryptoProvider.js
  var require_CryptoProvider = __commonJS({
    "node_modules/stripe/cjs/crypto/CryptoProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CryptoProviderOnlySupportsAsyncError = exports.CryptoProvider = void 0;
      var CryptoProvider = class {
        /**
         * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
         * The output HMAC should be encoded in hexadecimal.
         *
         * Sample values for implementations:
         * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
         * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
         */
        computeHMACSignature(payload, secret) {
          throw new Error("computeHMACSignature not implemented.");
        }
        /**
         * Asynchronous version of `computeHMACSignature`. Some implementations may
         * only allow support async signature computation.
         *
         * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
         * The output HMAC should be encoded in hexadecimal.
         *
         * Sample values for implementations:
         * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
         * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
         */
        computeHMACSignatureAsync(payload, secret) {
          throw new Error("computeHMACSignatureAsync not implemented.");
        }
      };
      exports.CryptoProvider = CryptoProvider;
      var CryptoProviderOnlySupportsAsyncError = class extends Error {
      };
      exports.CryptoProviderOnlySupportsAsyncError = CryptoProviderOnlySupportsAsyncError;
    }
  });

  // node_modules/stripe/cjs/crypto/SubtleCryptoProvider.js
  var require_SubtleCryptoProvider = __commonJS({
    "node_modules/stripe/cjs/crypto/SubtleCryptoProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SubtleCryptoProvider = void 0;
      var CryptoProvider_js_1 = require_CryptoProvider();
      var SubtleCryptoProvider = class extends CryptoProvider_js_1.CryptoProvider {
        constructor(subtleCrypto) {
          super();
          this.subtleCrypto = subtleCrypto || crypto.subtle;
        }
        /** @override */
        computeHMACSignature(payload, secret) {
          throw new CryptoProvider_js_1.CryptoProviderOnlySupportsAsyncError("SubtleCryptoProvider cannot be used in a synchronous context.");
        }
        /** @override */
        async computeHMACSignatureAsync(payload, secret) {
          const encoder = new TextEncoder();
          const key = await this.subtleCrypto.importKey("raw", encoder.encode(secret), {
            name: "HMAC",
            hash: { name: "SHA-256" }
          }, false, ["sign"]);
          const signatureBuffer = await this.subtleCrypto.sign("hmac", key, encoder.encode(payload));
          const signatureBytes = new Uint8Array(signatureBuffer);
          const signatureHexCodes = new Array(signatureBytes.length);
          for (let i = 0; i < signatureBytes.length; i++) {
            signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
          }
          return signatureHexCodes.join("");
        }
      };
      exports.SubtleCryptoProvider = SubtleCryptoProvider;
      var byteHexMapping = new Array(256);
      for (let i = 0; i < byteHexMapping.length; i++) {
        byteHexMapping[i] = i.toString(16).padStart(2, "0");
      }
    }
  });

  // node_modules/stripe/cjs/platform/PlatformFunctions.js
  var require_PlatformFunctions = __commonJS({
    "node_modules/stripe/cjs/platform/PlatformFunctions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PlatformFunctions = void 0;
      var FetchHttpClient_js_1 = require_FetchHttpClient();
      var SubtleCryptoProvider_js_1 = require_SubtleCryptoProvider();
      var PlatformFunctions = class {
        constructor() {
          this._fetchFn = null;
          this._agent = null;
        }
        /**
         * Gets uname with Node's built-in `exec` function, if available.
         */
        getUname() {
          throw new Error("getUname not implemented.");
        }
        /**
         * Generates a v4 UUID. See https://stackoverflow.com/a/2117523
         */
        uuid4() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : r & 3 | 8;
            return v.toString(16);
          });
        }
        /**
         * Compares strings in constant time.
         */
        secureCompare(a, b) {
          if (a.length !== b.length) {
            return false;
          }
          const len = a.length;
          let result = 0;
          for (let i = 0; i < len; ++i) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
          }
          return result === 0;
        }
        /**
         * Creates an event emitter.
         */
        createEmitter() {
          throw new Error("createEmitter not implemented.");
        }
        /**
         * Checks if the request data is a stream. If so, read the entire stream
         * to a buffer and return the buffer.
         */
        tryBufferData(data) {
          throw new Error("tryBufferData not implemented.");
        }
        /**
         * Creates an HTTP client which uses the Node `http` and `https` packages
         * to issue requests.
         */
        createNodeHttpClient(agent) {
          throw new Error("createNodeHttpClient not implemented.");
        }
        /**
         * Creates an HTTP client for issuing Stripe API requests which uses the Web
         * Fetch API.
         *
         * A fetch function can optionally be passed in as a parameter. If none is
         * passed, will default to the default `fetch` function in the global scope.
         */
        createFetchHttpClient(fetchFn) {
          return new FetchHttpClient_js_1.FetchHttpClient(fetchFn);
        }
        /**
         * Creates an HTTP client using runtime-specific APIs.
         */
        createDefaultHttpClient() {
          throw new Error("createDefaultHttpClient not implemented.");
        }
        /**
         * Creates a CryptoProvider which uses the Node `crypto` package for its computations.
         */
        createNodeCryptoProvider() {
          throw new Error("createNodeCryptoProvider not implemented.");
        }
        /**
         * Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
         */
        createSubtleCryptoProvider(subtleCrypto) {
          return new SubtleCryptoProvider_js_1.SubtleCryptoProvider(subtleCrypto);
        }
        createDefaultCryptoProvider() {
          throw new Error("createDefaultCryptoProvider not implemented.");
        }
      };
      exports.PlatformFunctions = PlatformFunctions;
    }
  });

  // node_modules/stripe/cjs/StripeEmitter.js
  var require_StripeEmitter = __commonJS({
    "node_modules/stripe/cjs/StripeEmitter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.StripeEmitter = void 0;
      var _StripeEvent = class extends Event {
        constructor(eventName, data) {
          super(eventName);
          this.data = data;
        }
      };
      var StripeEmitter = class {
        constructor() {
          this.eventTarget = new EventTarget();
          this.listenerMapping = /* @__PURE__ */ new Map();
        }
        on(eventName, listener) {
          const listenerWrapper = (event) => {
            listener(event.data);
          };
          this.listenerMapping.set(listener, listenerWrapper);
          return this.eventTarget.addEventListener(eventName, listenerWrapper);
        }
        removeListener(eventName, listener) {
          const listenerWrapper = this.listenerMapping.get(listener);
          this.listenerMapping.delete(listener);
          return this.eventTarget.removeEventListener(eventName, listenerWrapper);
        }
        once(eventName, listener) {
          const listenerWrapper = (event) => {
            listener(event.data);
          };
          this.listenerMapping.set(listener, listenerWrapper);
          return this.eventTarget.addEventListener(eventName, listenerWrapper, {
            once: true
          });
        }
        emit(eventName, data) {
          return this.eventTarget.dispatchEvent(new _StripeEvent(eventName, data));
        }
      };
      exports.StripeEmitter = StripeEmitter;
    }
  });

  // node_modules/stripe/cjs/platform/WebPlatformFunctions.js
  var require_WebPlatformFunctions = __commonJS({
    "node_modules/stripe/cjs/platform/WebPlatformFunctions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebPlatformFunctions = void 0;
      var PlatformFunctions_js_1 = require_PlatformFunctions();
      var StripeEmitter_js_1 = require_StripeEmitter();
      var WebPlatformFunctions = class extends PlatformFunctions_js_1.PlatformFunctions {
        /** @override */
        getUname() {
          return Promise.resolve(null);
        }
        /** @override */
        createEmitter() {
          return new StripeEmitter_js_1.StripeEmitter();
        }
        /** @override */
        tryBufferData(data) {
          if (data.file.data instanceof ReadableStream) {
            throw new Error("Uploading a file as a stream is not supported in non-Node environments. Please open or upvote an issue at github.com/stripe/stripe-node if you use this, detailing your use-case.");
          }
          return Promise.resolve(data);
        }
        /** @override */
        createNodeHttpClient() {
          throw new Error("Stripe: `createNodeHttpClient()` is not available in non-Node environments. Please use `createFetchHttpClient()` instead.");
        }
        /** @override */
        createDefaultHttpClient() {
          return super.createFetchHttpClient();
        }
        /** @override */
        createNodeCryptoProvider() {
          throw new Error("Stripe: `createNodeCryptoProvider()` is not available in non-Node environments. Please use `createSubtleCryptoProvider()` instead.");
        }
        /** @override */
        createDefaultCryptoProvider() {
          return this.createSubtleCryptoProvider();
        }
      };
      exports.WebPlatformFunctions = WebPlatformFunctions;
    }
  });

  // node_modules/stripe/cjs/Error.js
  var require_Error = __commonJS({
    "node_modules/stripe/cjs/Error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.StripeUnknownError = exports.StripeInvalidGrantError = exports.StripeIdempotencyError = exports.StripeSignatureVerificationError = exports.StripeConnectionError = exports.StripeRateLimitError = exports.StripePermissionError = exports.StripeAuthenticationError = exports.StripeAPIError = exports.StripeInvalidRequestError = exports.StripeCardError = exports.StripeError = exports.generate = void 0;
      var generate = (rawStripeError) => {
        switch (rawStripeError.type) {
          case "card_error":
            return new StripeCardError(rawStripeError);
          case "invalid_request_error":
            return new StripeInvalidRequestError(rawStripeError);
          case "api_error":
            return new StripeAPIError(rawStripeError);
          case "authentication_error":
            return new StripeAuthenticationError(rawStripeError);
          case "rate_limit_error":
            return new StripeRateLimitError(rawStripeError);
          case "idempotency_error":
            return new StripeIdempotencyError(rawStripeError);
          case "invalid_grant":
            return new StripeInvalidGrantError(rawStripeError);
          default:
            return new StripeUnknownError(rawStripeError);
        }
      };
      exports.generate = generate;
      var StripeError = class extends Error {
        constructor(raw = {}) {
          super(raw.message);
          this.type = this.constructor.name;
          this.raw = raw;
          this.rawType = raw.type;
          this.code = raw.code;
          this.doc_url = raw.doc_url;
          this.param = raw.param;
          this.detail = raw.detail;
          this.headers = raw.headers;
          this.requestId = raw.requestId;
          this.statusCode = raw.statusCode;
          this.message = raw.message;
          this.charge = raw.charge;
          this.decline_code = raw.decline_code;
          this.payment_intent = raw.payment_intent;
          this.payment_method = raw.payment_method;
          this.payment_method_type = raw.payment_method_type;
          this.setup_intent = raw.setup_intent;
          this.source = raw.source;
        }
      };
      exports.StripeError = StripeError;
      StripeError.generate = exports.generate;
      var StripeCardError = class extends StripeError {
      };
      exports.StripeCardError = StripeCardError;
      var StripeInvalidRequestError = class extends StripeError {
      };
      exports.StripeInvalidRequestError = StripeInvalidRequestError;
      var StripeAPIError = class extends StripeError {
      };
      exports.StripeAPIError = StripeAPIError;
      var StripeAuthenticationError = class extends StripeError {
      };
      exports.StripeAuthenticationError = StripeAuthenticationError;
      var StripePermissionError = class extends StripeError {
      };
      exports.StripePermissionError = StripePermissionError;
      var StripeRateLimitError = class extends StripeError {
      };
      exports.StripeRateLimitError = StripeRateLimitError;
      var StripeConnectionError = class extends StripeError {
      };
      exports.StripeConnectionError = StripeConnectionError;
      var StripeSignatureVerificationError = class extends StripeError {
        constructor(header, payload, raw = {}) {
          super(raw);
          this.header = header;
          this.payload = payload;
        }
      };
      exports.StripeSignatureVerificationError = StripeSignatureVerificationError;
      var StripeIdempotencyError = class extends StripeError {
      };
      exports.StripeIdempotencyError = StripeIdempotencyError;
      var StripeInvalidGrantError = class extends StripeError {
      };
      exports.StripeInvalidGrantError = StripeInvalidGrantError;
      var StripeUnknownError = class extends StripeError {
      };
      exports.StripeUnknownError = StripeUnknownError;
    }
  });

  // node_modules/stripe/cjs/apiVersion.js
  var require_apiVersion = __commonJS({
    "node_modules/stripe/cjs/apiVersion.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ApiVersion = void 0;
      exports.ApiVersion = "2022-11-15";
    }
  });

  // node_modules/stripe/cjs/ResourceNamespace.js
  var require_ResourceNamespace = __commonJS({
    "node_modules/stripe/cjs/ResourceNamespace.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resourceNamespace = void 0;
      function ResourceNamespace(stripe2, resources) {
        for (const name in resources) {
          const camelCaseName = name[0].toLowerCase() + name.substring(1);
          const resource = new resources[name](stripe2);
          this[camelCaseName] = resource;
        }
      }
      function resourceNamespace(namespace, resources) {
        return function(stripe2) {
          return new ResourceNamespace(stripe2, resources);
        };
      }
      exports.resourceNamespace = resourceNamespace;
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports, module) {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (sym in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports, module) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/has-proto/index.js
  var require_has_proto = __commonJS({
    "node_modules/has-proto/index.js"(exports, module) {
      "use strict";
      var test = {
        foo: {}
      };
      var $Object = Object;
      module.exports = function hasProto() {
        return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
      };
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js"(exports, module) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var slice = Array.prototype.slice;
      var toStr = Object.prototype.toString;
      var funcType = "[object Function]";
      module.exports = function bind2(that) {
        var target = this;
        if (typeof target !== "function" || toStr.call(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slice.call(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          } else {
            return target.apply(
              that,
              args.concat(slice.call(arguments))
            );
          }
        };
        var boundLength = Math.max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs.push("$" + i);
        }
        bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports, module) {
      "use strict";
      var implementation = require_implementation();
      module.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/has/src/index.js
  var require_src = __commonJS({
    "node_modules/has/src/index.js"(exports, module) {
      "use strict";
      var bind2 = require_function_bind();
      module.exports = bind2.call(Function.call, Object.prototype.hasOwnProperty);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports, module) {
      "use strict";
      var undefined2;
      var $SyntaxError = SyntaxError;
      var $Function = Function;
      var $TypeError = TypeError;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = Object.getOwnPropertyDescriptor;
      if ($gOPD) {
        try {
          $gOPD({}, "");
        } catch (e) {
          $gOPD = null;
        }
      }
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var hasProto = require_has_proto()();
      var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
        return x.__proto__;
      } : null);
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": EvalError,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": Object,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": RangeError,
        "%ReferenceError%": ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
      };
      if (getProto) {
        try {
          null.error;
        } catch (e) {
          errorProto = getProto(getProto(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind2 = require_function_bind();
      var hasOwn = require_src();
      var $concat = bind2.call(Function.call, Array.prototype.concat);
      var $spliceApply = bind2.call(Function.apply, Array.prototype.splice);
      var $replace = bind2.call(Function.call, String.prototype.replace);
      var $strSlice = bind2.call(Function.call, String.prototype.slice);
      var $exec = bind2.call(Function.call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void 0;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "node_modules/call-bind/index.js"(exports, module) {
      "use strict";
      var bind2 = require_function_bind();
      var GetIntrinsic = require_get_intrinsic();
      var $apply = GetIntrinsic("%Function.prototype.apply%");
      var $call = GetIntrinsic("%Function.prototype.call%");
      var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind2.call($call, $apply);
      var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
      var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
      var $max = GetIntrinsic("%Math.max%");
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = null;
        }
      }
      module.exports = function callBind(originalFunction) {
        var func = $reflectApply(bind2, $call, arguments);
        if ($gOPD && $defineProperty) {
          var desc = $gOPD(func, "length");
          if (desc.configurable) {
            $defineProperty(
              func,
              "length",
              { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
            );
          }
        }
        return func;
      };
      var applyBind = function applyBind2() {
        return $reflectApply(bind2, $apply, arguments);
      };
      if ($defineProperty) {
        $defineProperty(module.exports, "apply", { value: applyBind });
      } else {
        module.exports.apply = applyBind;
      }
    }
  });

  // node_modules/call-bind/callBound.js
  var require_callBound = __commonJS({
    "node_modules/call-bind/callBound.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBind = require_call_bind();
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }
  });

  // (disabled):node_modules/object-inspect/util.inspect
  var require_util = __commonJS({
    "(disabled):node_modules/object-inspect/util.inspect"() {
    }
  });

  // node_modules/object-inspect/index.js
  var require_object_inspect = __commonJS({
    "node_modules/object-inspect/index.js"(exports, module) {
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
        return O.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
          return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = require_util();
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
      module.exports = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
          throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
          throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        }
        if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") {
          return "undefined";
        }
        if (obj === null) {
          return "null";
        }
        if (typeof obj === "boolean") {
          return obj ? "true" : "false";
        }
        if (typeof obj === "string") {
          return inspectString(obj, opts);
        }
        if (typeof obj === "number") {
          if (obj === 0) {
            return Infinity / obj > 0 ? "0" : "-0";
          }
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") {
          depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
          return isArray2(obj) ? "[Array]" : "[Object]";
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") {
          seen = [];
        } else if (indexOf(seen, obj) >= 0) {
          return "[Circular]";
        }
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has(opts, "quoteStyle")) {
              newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp2(obj)) {
          var name = nameOf(obj);
          var keys = arrObjKeys(obj, inspect);
          return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
        }
        if (isSymbol(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
          var s = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i = 0; i < attrs.length; i++) {
            s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
          }
          s += ">";
          if (obj.childNodes && obj.childNodes.length) {
            s += "...";
          }
          s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s;
        }
        if (isArray2(obj)) {
          if (obj.length === 0) {
            return "[]";
          }
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) {
            return "[" + indentedJoin(xs, indent) + "]";
          }
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError(obj)) {
          var parts = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
            return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
          }
          if (parts.length === 0) {
            return "[" + String(obj) + "]";
          }
          return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) {
          if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
          } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
            return obj.inspect();
          }
        }
        if (isMap(obj)) {
          var mapParts = [];
          if (mapForEach) {
            mapForEach.call(obj, function(value, key) {
              mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
            });
          }
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
          var setParts = [];
          if (setForEach) {
            setForEach.call(obj, function(value) {
              setParts.push(inspect(value, obj));
            });
          }
          return collectionOf("Set", setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
          return weakCollectionOf("WeakMap");
        }
        if (isWeakSet(obj)) {
          return weakCollectionOf("WeakSet");
        }
        if (isWeakRef(obj)) {
          return weakCollectionOf("WeakRef");
        }
        if (isNumber2(obj)) {
          return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
          return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean2(obj)) {
          return markBoxed(booleanValueOf.call(obj));
        }
        if (isString2(obj)) {
          return markBoxed(inspect(String(obj)));
        }
        if (!isDate2(obj) && !isRegExp2(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) {
            return tag + "{}";
          }
          if (indent) {
            return tag + "{" + indentedJoin(ys, indent) + "}";
          }
          return tag + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s, defaultStyle, opts) {
        var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
        return quoteChar + s + quoteChar;
      }
      function quote(s) {
        return $replace.call(String(s), /"/g, "&quot;");
      }
      function isArray2(obj) {
        return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isDate2(obj) {
        return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isRegExp2(obj) {
        return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isError(obj) {
        return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isString2(obj) {
        return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isNumber2(obj) {
        return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isBoolean2(obj) {
        return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isSymbol(obj) {
        if (hasShammedSymbols) {
          return obj && typeof obj === "object" && obj instanceof Symbol;
        }
        if (typeof obj === "symbol") {
          return true;
        }
        if (!obj || typeof obj !== "object" || !symToString) {
          return false;
        }
        try {
          symToString.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isBigInt(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) {
          return false;
        }
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
      };
      function has(obj, key) {
        return hasOwn.call(obj, key);
      }
      function toStr(obj) {
        return objectToString.call(obj);
      }
      function nameOf(f) {
        if (f.name) {
          return f.name;
        }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) {
          return m[1];
        }
        return null;
      }
      function indexOf(xs, x) {
        if (xs.indexOf) {
          return xs.indexOf(x);
        }
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) {
            return i;
          }
        }
        return -1;
      }
      function isMap(x) {
        if (!mapSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          mapSize.call(x);
          try {
            setSize.call(x);
          } catch (s) {
            return true;
          }
          return x instanceof Map;
        } catch (e) {
        }
        return false;
      }
      function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakMapHas.call(x, weakMapHas);
          try {
            weakSetHas.call(x, weakSetHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakMap;
        } catch (e) {
        }
        return false;
      }
      function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakRefDeref.call(x);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isSet(x) {
        if (!setSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          setSize.call(x);
          try {
            mapSize.call(x);
          } catch (m) {
            return true;
          }
          return x instanceof Set;
        } catch (e) {
        }
        return false;
      }
      function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakSetHas.call(x, weakSetHas);
          try {
            weakMapHas.call(x, weakMapHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakSet;
        } catch (e) {
        }
        return false;
      }
      function isElement(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
          return true;
        }
        return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, "single", opts);
      }
      function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n];
        if (x) {
          return "\\" + x;
        }
        return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type) {
        return type + " { ? }";
      }
      function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) {
          if (indexOf(xs[i], "\n") >= 0) {
            return false;
          }
        }
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "	") {
          baseIndent = "	";
        } else if (typeof opts.indent === "number" && opts.indent > 0) {
          baseIndent = $join.call(Array(opts.indent + 1), " ");
        } else {
          return null;
        }
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) {
          return "";
        }
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray2(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
          }
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k = 0; k < syms.length; k++) {
            symMap["$" + syms[k]] = syms[k];
          }
        }
        for (var key in obj) {
          if (!has(obj, key)) {
            continue;
          }
          if (isArr && String(Number(key)) === key && key < obj.length) {
            continue;
          }
          if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
            continue;
          } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
          } else {
            xs.push(key + ": " + inspect(obj[key], obj));
          }
        }
        if (typeof gOPS === "function") {
          for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
              xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
            }
          }
        }
        return xs;
      }
    }
  });

  // node_modules/side-channel/index.js
  var require_side_channel = __commonJS({
    "node_modules/side-channel/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_callBound();
      var inspect = require_object_inspect();
      var $TypeError = GetIntrinsic("%TypeError%");
      var $WeakMap = GetIntrinsic("%WeakMap%", true);
      var $Map = GetIntrinsic("%Map%", true);
      var $weakMapGet = callBound("WeakMap.prototype.get", true);
      var $weakMapSet = callBound("WeakMap.prototype.set", true);
      var $weakMapHas = callBound("WeakMap.prototype.has", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSet = callBound("Map.prototype.set", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var listGetNode = function(list, key) {
        for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
          if (curr.key === key) {
            prev.next = curr.next;
            curr.next = list.next;
            list.next = curr;
            return curr;
          }
        }
      };
      var listGet = function(objects, key) {
        var node = listGetNode(objects, key);
        return node && node.value;
      };
      var listSet = function(objects, key, value) {
        var node = listGetNode(objects, key);
        if (node) {
          node.value = value;
        } else {
          objects.next = {
            // eslint-disable-line no-param-reassign
            key,
            next: objects.next,
            value
          };
        }
      };
      var listHas = function(objects, key) {
        return !!listGetNode(objects, key);
      };
      module.exports = function getSideChannel() {
        var $wm;
        var $m;
        var $o;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            } else if ($Map) {
              if ($m) {
                return $mapGet($m, key);
              }
            } else {
              if ($o) {
                return listGet($o, key);
              }
            }
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            } else if ($Map) {
              if ($m) {
                return $mapHas($m, key);
              }
            } else {
              if ($o) {
                return listHas($o, key);
              }
            }
            return false;
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if ($Map) {
              if (!$m) {
                $m = new $Map();
              }
              $mapSet($m, key, value);
            } else {
              if (!$o) {
                $o = { key: {}, next: null };
              }
              listSet($o, key, value);
            }
          }
        };
        return channel;
      };
    }
  });

  // node_modules/qs/lib/formats.js
  var require_formats = __commonJS({
    "node_modules/qs/lib/formats.js"(exports, module) {
      "use strict";
      var replace = String.prototype.replace;
      var percentTwenties = /%20/g;
      var Format = {
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
      };
      module.exports = {
        "default": Format.RFC3986,
        formatters: {
          RFC1738: function(value) {
            return replace.call(value, percentTwenties, "+");
          },
          RFC3986: function(value) {
            return String(value);
          }
        },
        RFC1738: Format.RFC1738,
        RFC3986: Format.RFC3986
      };
    }
  });

  // node_modules/qs/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/qs/lib/utils.js"(exports, module) {
      "use strict";
      var formats = require_formats();
      var has = Object.prototype.hasOwnProperty;
      var isArray2 = Array.isArray;
      var hexTable = function() {
        var array = [];
        for (var i = 0; i < 256; ++i) {
          array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
        }
        return array;
      }();
      var compactQueue = function compactQueue2(queue) {
        while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];
          if (isArray2(obj)) {
            var compacted = [];
            for (var j = 0; j < obj.length; ++j) {
              if (typeof obj[j] !== "undefined") {
                compacted.push(obj[j]);
              }
            }
            item.obj[item.prop] = compacted;
          }
        }
      };
      var arrayToObject2 = function arrayToObject3(source, options) {
        var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== "undefined") {
            obj[i] = source[i];
          }
        }
        return obj;
      };
      var merge2 = function merge3(target, source, options) {
        if (!source) {
          return target;
        }
        if (typeof source !== "object") {
          if (isArray2(target)) {
            target.push(source);
          } else if (target && typeof target === "object") {
            if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
              target[source] = true;
            }
          } else {
            return [target, source];
          }
          return target;
        }
        if (!target || typeof target !== "object") {
          return [target].concat(source);
        }
        var mergeTarget = target;
        if (isArray2(target) && !isArray2(source)) {
          mergeTarget = arrayToObject2(target, options);
        }
        if (isArray2(target) && isArray2(source)) {
          source.forEach(function(item, i) {
            if (has.call(target, i)) {
              var targetItem = target[i];
              if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
                target[i] = merge3(targetItem, item, options);
              } else {
                target.push(item);
              }
            } else {
              target[i] = item;
            }
          });
          return target;
        }
        return Object.keys(source).reduce(function(acc, key) {
          var value = source[key];
          if (has.call(acc, key)) {
            acc[key] = merge3(acc[key], value, options);
          } else {
            acc[key] = value;
          }
          return acc;
        }, mergeTarget);
      };
      var assign = function assignSingleSource(target, source) {
        return Object.keys(source).reduce(function(acc, key) {
          acc[key] = source[key];
          return acc;
        }, target);
      };
      var decode = function(str, decoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, " ");
        if (charset === "iso-8859-1") {
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      };
      var encode3 = function encode4(str, defaultEncoder, charset, kind, format) {
        if (str.length === 0) {
          return str;
        }
        var string = str;
        if (typeof str === "symbol") {
          string = Symbol.prototype.toString.call(str);
        } else if (typeof str !== "string") {
          string = String(str);
        }
        if (charset === "iso-8859-1") {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
            return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
          });
        }
        var out = "";
        for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);
          if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
            out += string.charAt(i);
            continue;
          }
          if (c < 128) {
            out = out + hexTable[c];
            continue;
          }
          if (c < 2048) {
            out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
            continue;
          }
          if (c < 55296 || c >= 57344) {
            out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
          out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
        }
        return out;
      };
      var compact = function compact2(value) {
        var queue = [{ obj: { o: value }, prop: "o" }];
        var refs = [];
        for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];
          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
              queue.push({ obj, prop: key });
              refs.push(val);
            }
          }
        }
        compactQueue(queue);
        return value;
      };
      var isRegExp2 = function isRegExp3(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
      };
      var isBuffer2 = function isBuffer3(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
      };
      var combine = function combine2(a, b) {
        return [].concat(a, b);
      };
      var maybeMap = function maybeMap2(val, fn) {
        if (isArray2(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
          }
          return mapped;
        }
        return fn(val);
      };
      module.exports = {
        arrayToObject: arrayToObject2,
        assign,
        combine,
        compact,
        decode,
        encode: encode3,
        isBuffer: isBuffer2,
        isRegExp: isRegExp2,
        maybeMap,
        merge: merge2
      };
    }
  });

  // node_modules/qs/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/qs/lib/stringify.js"(exports, module) {
      "use strict";
      var getSideChannel = require_side_channel();
      var utils = require_utils();
      var formats = require_formats();
      var has = Object.prototype.hasOwnProperty;
      var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
          return prefix + "[]";
        },
        comma: "comma",
        indices: function indices(prefix, key) {
          return prefix + "[" + key + "]";
        },
        repeat: function repeat(prefix) {
          return prefix;
        }
      };
      var isArray2 = Array.isArray;
      var split = String.prototype.split;
      var push = Array.prototype.push;
      var pushToArray = function(arr, valueOrArray) {
        push.apply(arr, isArray2(valueOrArray) ? valueOrArray : [valueOrArray]);
      };
      var toISO = Date.prototype.toISOString;
      var defaultFormat = formats["default"];
      var defaults2 = {
        addQueryPrefix: false,
        allowDots: false,
        charset: "utf-8",
        charsetSentinel: false,
        delimiter: "&",
        encode: true,
        encoder: utils.encode,
        encodeValuesOnly: false,
        format: defaultFormat,
        formatter: formats.formatters[defaultFormat],
        // deprecated
        indices: false,
        serializeDate: function serializeDate(date) {
          return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
      };
      var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
        return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
      };
      var sentinel = {};
      var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter2, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
        var obj = object;
        var tmpSc = sideChannel;
        var step = 0;
        var findFlag = false;
        while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
          var pos = tmpSc.get(object);
          step += 1;
          if (typeof pos !== "undefined") {
            if (pos === step) {
              throw new RangeError("Cyclic object value");
            } else {
              findFlag = true;
            }
          }
          if (typeof tmpSc.get(sentinel) === "undefined") {
            step = 0;
          }
        }
        if (typeof filter2 === "function") {
          obj = filter2(prefix, obj);
        } else if (obj instanceof Date) {
          obj = serializeDate(obj);
        } else if (generateArrayPrefix === "comma" && isArray2(obj)) {
          obj = utils.maybeMap(obj, function(value2) {
            if (value2 instanceof Date) {
              return serializeDate(value2);
            }
            return value2;
          });
        }
        if (obj === null) {
          if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults2.encoder, charset, "key", format) : prefix;
          }
          obj = "";
        }
        if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
          if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults2.encoder, charset, "key", format);
            if (generateArrayPrefix === "comma" && encodeValuesOnly) {
              var valuesArray = split.call(String(obj), ",");
              var valuesJoined = "";
              for (var i = 0; i < valuesArray.length; ++i) {
                valuesJoined += (i === 0 ? "" : ",") + formatter(encoder(valuesArray[i], defaults2.encoder, charset, "value", format));
              }
              return [formatter(keyValue) + (commaRoundTrip && isArray2(obj) && valuesArray.length === 1 ? "[]" : "") + "=" + valuesJoined];
            }
            return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults2.encoder, charset, "value", format))];
          }
          return [formatter(prefix) + "=" + formatter(String(obj))];
        }
        var values = [];
        if (typeof obj === "undefined") {
          return values;
        }
        var objKeys;
        if (generateArrayPrefix === "comma" && isArray2(obj)) {
          objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
        } else if (isArray2(filter2)) {
          objKeys = filter2;
        } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
        }
        var adjustedPrefix = commaRoundTrip && isArray2(obj) && obj.length === 1 ? prefix + "[]" : prefix;
        for (var j = 0; j < objKeys.length; ++j) {
          var key = objKeys[j];
          var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
          if (skipNulls && value === null) {
            continue;
          }
          var keyPrefix = isArray2(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
          sideChannel.set(object, step);
          var valueSideChannel = getSideChannel();
          valueSideChannel.set(sentinel, sideChannel);
          pushToArray(values, stringify2(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            strictNullHandling,
            skipNulls,
            encoder,
            filter2,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
          ));
        }
        return values;
      };
      var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
        if (!opts) {
          return defaults2;
        }
        if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
          throw new TypeError("Encoder has to be a function.");
        }
        var charset = opts.charset || defaults2.charset;
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        var format = formats["default"];
        if (typeof opts.format !== "undefined") {
          if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError("Unknown format option provided.");
          }
          format = opts.format;
        }
        var formatter = formats.formatters[format];
        var filter2 = defaults2.filter;
        if (typeof opts.filter === "function" || isArray2(opts.filter)) {
          filter2 = opts.filter;
        }
        return {
          addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults2.addQueryPrefix,
          allowDots: typeof opts.allowDots === "undefined" ? defaults2.allowDots : !!opts.allowDots,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults2.charsetSentinel,
          delimiter: typeof opts.delimiter === "undefined" ? defaults2.delimiter : opts.delimiter,
          encode: typeof opts.encode === "boolean" ? opts.encode : defaults2.encode,
          encoder: typeof opts.encoder === "function" ? opts.encoder : defaults2.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults2.encodeValuesOnly,
          filter: filter2,
          format,
          formatter,
          serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults2.serializeDate,
          skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults2.skipNulls,
          sort: typeof opts.sort === "function" ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults2.strictNullHandling
        };
      };
      module.exports = function(object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);
        var objKeys;
        var filter2;
        if (typeof options.filter === "function") {
          filter2 = options.filter;
          obj = filter2("", obj);
        } else if (isArray2(options.filter)) {
          filter2 = options.filter;
          objKeys = filter2;
        }
        var keys = [];
        if (typeof obj !== "object" || obj === null) {
          return "";
        }
        var arrayFormat;
        if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
        } else if (opts && "indices" in opts) {
          arrayFormat = opts.indices ? "indices" : "repeat";
        } else {
          arrayFormat = "indices";
        }
        var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
        if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
          throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        }
        var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
        if (!objKeys) {
          objKeys = Object.keys(obj);
        }
        if (options.sort) {
          objKeys.sort(options.sort);
        }
        var sideChannel = getSideChannel();
        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
          if (options.skipNulls && obj[key] === null) {
            continue;
          }
          pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
          ));
        }
        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? "?" : "";
        if (options.charsetSentinel) {
          if (options.charset === "iso-8859-1") {
            prefix += "utf8=%26%2310003%3B&";
          } else {
            prefix += "utf8=%E2%9C%93&";
          }
        }
        return joined.length > 0 ? prefix + joined : "";
      };
    }
  });

  // node_modules/qs/lib/parse.js
  var require_parse = __commonJS({
    "node_modules/qs/lib/parse.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var has = Object.prototype.hasOwnProperty;
      var isArray2 = Array.isArray;
      var defaults2 = {
        allowDots: false,
        allowPrototypes: false,
        allowSparse: false,
        arrayLimit: 20,
        charset: "utf-8",
        charsetSentinel: false,
        comma: false,
        decoder: utils.decode,
        delimiter: "&",
        depth: 5,
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1e3,
        parseArrays: true,
        plainObjects: false,
        strictNullHandling: false
      };
      var interpretNumericEntities = function(str) {
        return str.replace(/&#(\d+);/g, function($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
        });
      };
      var parseArrayValue = function(val, options) {
        if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
          return val.split(",");
        }
        return val;
      };
      var isoSentinel = "utf8=%26%2310003%3B";
      var charsetSentinel = "utf8=%E2%9C%93";
      var parseValues = function parseQueryStringValues(str, options) {
        var obj = {};
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
        var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, limit);
        var skipIndex = -1;
        var i;
        var charset = options.charset;
        if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf("utf8=") === 0) {
              if (parts[i] === charsetSentinel) {
                charset = "utf-8";
              } else if (parts[i] === isoSentinel) {
                charset = "iso-8859-1";
              }
              skipIndex = i;
              i = parts.length;
            }
          }
        }
        for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
            continue;
          }
          var part = parts[i];
          var bracketEqualsPos = part.indexOf("]=");
          var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
          var key, val;
          if (pos === -1) {
            key = options.decoder(part, defaults2.decoder, charset, "key");
            val = options.strictNullHandling ? null : "";
          } else {
            key = options.decoder(part.slice(0, pos), defaults2.decoder, charset, "key");
            val = utils.maybeMap(
              parseArrayValue(part.slice(pos + 1), options),
              function(encodedVal) {
                return options.decoder(encodedVal, defaults2.decoder, charset, "value");
              }
            );
          }
          if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
            val = interpretNumericEntities(val);
          }
          if (part.indexOf("[]=") > -1) {
            val = isArray2(val) ? [val] : val;
          }
          if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
          } else {
            obj[key] = val;
          }
        }
        return obj;
      };
      var parseObject = function(chain, val, options, valuesParsed) {
        var leaf = valuesParsed ? val : parseArrayValue(val, options);
        for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];
          if (root === "[]" && options.parseArrays) {
            obj = [].concat(leaf);
          } else {
            obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
            var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === "") {
              obj = { 0: leaf };
            } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
              obj = [];
              obj[index] = leaf;
            } else if (cleanRoot !== "__proto__") {
              obj[cleanRoot] = leaf;
            }
          }
          leaf = obj;
        }
        return leaf;
      };
      var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
        if (!givenKey) {
          return;
        }
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;
        var segment = options.depth > 0 && brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;
        var keys = [];
        if (parent) {
          if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys.push(parent);
        }
        var i = 0;
        while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys.push(segment[1]);
        }
        if (segment) {
          keys.push("[" + key.slice(segment.index) + "]");
        }
        return parseObject(keys, val, options, valuesParsed);
      };
      var normalizeParseOptions = function normalizeParseOptions2(opts) {
        if (!opts) {
          return defaults2;
        }
        if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
          throw new TypeError("Decoder has to be a function.");
        }
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        var charset = typeof opts.charset === "undefined" ? defaults2.charset : opts.charset;
        return {
          allowDots: typeof opts.allowDots === "undefined" ? defaults2.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults2.allowPrototypes,
          allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults2.allowSparse,
          arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults2.arrayLimit,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults2.charsetSentinel,
          comma: typeof opts.comma === "boolean" ? opts.comma : defaults2.comma,
          decoder: typeof opts.decoder === "function" ? opts.decoder : defaults2.decoder,
          delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults2.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults2.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults2.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults2.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults2.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults2.strictNullHandling
        };
      };
      module.exports = function(str, opts) {
        var options = normalizeParseOptions(opts);
        if (str === "" || str === null || typeof str === "undefined") {
          return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        }
        var tempObj = typeof str === "string" ? parseValues(str, options) : str;
        var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
          obj = utils.merge(obj, newObj, options);
        }
        if (options.allowSparse === true) {
          return obj;
        }
        return utils.compact(obj);
      };
    }
  });

  // node_modules/qs/lib/index.js
  var require_lib = __commonJS({
    "node_modules/qs/lib/index.js"(exports, module) {
      "use strict";
      var stringify = require_stringify();
      var parse = require_parse();
      var formats = require_formats();
      module.exports = {
        formats,
        parse,
        stringify
      };
    }
  });

  // node_modules/stripe/cjs/utils.js
  var require_utils2 = __commonJS({
    "node_modules/stripe/cjs/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.concat = exports.determineProcessUserAgentProperties = exports.validateInteger = exports.flattenAndStringify = exports.isObject = exports.emitWarning = exports.pascalToCamelCase = exports.callbackifyPromiseWithTimeout = exports.normalizeHeader = exports.normalizeHeaders = exports.removeNullish = exports.protoExtend = exports.getOptionsFromArgs = exports.getDataFromArgs = exports.extractUrlParams = exports.makeURLInterpolator = exports.stringifyRequestData = exports.isOptionsHash = void 0;
      var qs = require_lib();
      var OPTIONS_KEYS = [
        "apiKey",
        "idempotencyKey",
        "stripeAccount",
        "apiVersion",
        "maxNetworkRetries",
        "timeout",
        "host"
      ];
      function isOptionsHash(o) {
        return o && typeof o === "object" && OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop));
      }
      exports.isOptionsHash = isOptionsHash;
      function stringifyRequestData(data) {
        return qs.stringify(data, {
          serializeDate: (d) => Math.floor(d.getTime() / 1e3).toString()
        }).replace(/%5B/g, "[").replace(/%5D/g, "]");
      }
      exports.stringifyRequestData = stringifyRequestData;
      exports.makeURLInterpolator = (() => {
        const rc = {
          "\n": "\\n",
          '"': '\\"',
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        return (str) => {
          const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
          return (outputs) => {
            return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => (
              // @ts-ignore
              encodeURIComponent(outputs[$1] || "")
            ));
          };
        };
      })();
      function extractUrlParams(path) {
        const params = path.match(/\{\w+\}/g);
        if (!params) {
          return [];
        }
        return params.map((param) => param.replace(/[{}]/g, ""));
      }
      exports.extractUrlParams = extractUrlParams;
      function getDataFromArgs(args) {
        if (!Array.isArray(args) || !args[0] || typeof args[0] !== "object") {
          return {};
        }
        if (!isOptionsHash(args[0])) {
          return args.shift();
        }
        const argKeys = Object.keys(args[0]);
        const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
        if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) {
          emitWarning(`Options found in arguments (${optionKeysInArgs.join(", ")}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
        }
        return {};
      }
      exports.getDataFromArgs = getDataFromArgs;
      function getOptionsFromArgs(args) {
        const opts = {
          auth: null,
          host: null,
          headers: {},
          settings: {}
        };
        if (args.length > 0) {
          const arg = args[args.length - 1];
          if (typeof arg === "string") {
            opts.auth = args.pop();
          } else if (isOptionsHash(arg)) {
            const params = Object.assign({}, args.pop());
            const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key));
            if (extraKeys.length) {
              emitWarning(`Invalid options found (${extraKeys.join(", ")}); ignoring.`);
            }
            if (params.apiKey) {
              opts.auth = params.apiKey;
            }
            if (params.idempotencyKey) {
              opts.headers["Idempotency-Key"] = params.idempotencyKey;
            }
            if (params.stripeAccount) {
              opts.headers["Stripe-Account"] = params.stripeAccount;
            }
            if (params.apiVersion) {
              opts.headers["Stripe-Version"] = params.apiVersion;
            }
            if (Number.isInteger(params.maxNetworkRetries)) {
              opts.settings.maxNetworkRetries = params.maxNetworkRetries;
            }
            if (Number.isInteger(params.timeout)) {
              opts.settings.timeout = params.timeout;
            }
            if (params.host) {
              opts.host = params.host;
            }
          }
        }
        return opts;
      }
      exports.getOptionsFromArgs = getOptionsFromArgs;
      function protoExtend(sub) {
        const Super = this;
        const Constructor = Object.prototype.hasOwnProperty.call(sub, "constructor") ? sub.constructor : function(...args) {
          Super.apply(this, args);
        };
        Object.assign(Constructor, Super);
        Constructor.prototype = Object.create(Super.prototype);
        Object.assign(Constructor.prototype, sub);
        return Constructor;
      }
      exports.protoExtend = protoExtend;
      function removeNullish(obj) {
        if (typeof obj !== "object") {
          throw new Error("Argument must be an object");
        }
        return Object.keys(obj).reduce((result, key) => {
          if (obj[key] != null) {
            result[key] = obj[key];
          }
          return result;
        }, {});
      }
      exports.removeNullish = removeNullish;
      function normalizeHeaders(obj) {
        if (!(obj && typeof obj === "object")) {
          return obj;
        }
        return Object.keys(obj).reduce((result, header) => {
          result[normalizeHeader2(header)] = obj[header];
          return result;
        }, {});
      }
      exports.normalizeHeaders = normalizeHeaders;
      function normalizeHeader2(header) {
        return header.split("-").map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()).join("-");
      }
      exports.normalizeHeader = normalizeHeader2;
      function callbackifyPromiseWithTimeout(promise, callback) {
        if (callback) {
          return promise.then((res) => {
            setTimeout(() => {
              callback(null, res);
            }, 0);
          }, (err) => {
            setTimeout(() => {
              callback(err, null);
            }, 0);
          });
        }
        return promise;
      }
      exports.callbackifyPromiseWithTimeout = callbackifyPromiseWithTimeout;
      function pascalToCamelCase(name) {
        if (name === "OAuth") {
          return "oauth";
        } else {
          return name[0].toLowerCase() + name.substring(1);
        }
      }
      exports.pascalToCamelCase = pascalToCamelCase;
      function emitWarning(warning) {
        if (typeof process.emitWarning !== "function") {
          return console.warn(`Stripe: ${warning}`);
        }
        return process.emitWarning(warning, "Stripe");
      }
      exports.emitWarning = emitWarning;
      function isObject2(obj) {
        const type = typeof obj;
        return (type === "function" || type === "object") && !!obj;
      }
      exports.isObject = isObject2;
      function flattenAndStringify(data) {
        const result = {};
        const step = (obj, prevKey) => {
          Object.keys(obj).forEach((key) => {
            const value = obj[key];
            const newKey = prevKey ? `${prevKey}[${key}]` : key;
            if (isObject2(value)) {
              if (!(value instanceof Uint8Array) && !Object.prototype.hasOwnProperty.call(value, "data")) {
                return step(value, newKey);
              } else {
                result[newKey] = value;
              }
            } else {
              result[newKey] = String(value);
            }
          });
        };
        step(data, null);
        return result;
      }
      exports.flattenAndStringify = flattenAndStringify;
      function validateInteger(name, n, defaultVal) {
        if (!Number.isInteger(n)) {
          if (defaultVal !== void 0) {
            return defaultVal;
          } else {
            throw new Error(`${name} must be an integer`);
          }
        }
        return n;
      }
      exports.validateInteger = validateInteger;
      function determineProcessUserAgentProperties() {
        return typeof process === "undefined" ? {} : {
          lang_version: process.version,
          platform: process.platform
        };
      }
      exports.determineProcessUserAgentProperties = determineProcessUserAgentProperties;
      function concat(arrays) {
        const totalLength = arrays.reduce((len, array) => len + array.length, 0);
        const merged = new Uint8Array(totalLength);
        let offset = 0;
        arrays.forEach((array) => {
          merged.set(array, offset);
          offset += array.length;
        });
        return merged;
      }
      exports.concat = concat;
    }
  });

  // node_modules/stripe/cjs/autoPagination.js
  var require_autoPagination = __commonJS({
    "node_modules/stripe/cjs/autoPagination.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.makeAutoPaginationMethods = void 0;
      var utils_js_1 = require_utils2();
      var StripeIterator = class {
        constructor(firstPagePromise, requestArgs, spec, stripeResource) {
          this.index = 0;
          this.pagePromise = firstPagePromise;
          this.promiseCache = { currentPromise: null };
          this.requestArgs = requestArgs;
          this.spec = spec;
          this.stripeResource = stripeResource;
        }
        async iterate(pageResult) {
          if (!(pageResult && pageResult.data && typeof pageResult.data.length === "number")) {
            throw Error("Unexpected: Stripe API response does not have a well-formed `data` array.");
          }
          const reverseIteration = isReverseIteration(this.requestArgs);
          if (this.index < pageResult.data.length) {
            const idx = reverseIteration ? pageResult.data.length - 1 - this.index : this.index;
            const value = pageResult.data[idx];
            this.index += 1;
            return { value, done: false };
          } else if (pageResult.has_more) {
            this.index = 0;
            this.pagePromise = this.getNextPage(pageResult);
            const nextPageResult = await this.pagePromise;
            return this.iterate(nextPageResult);
          }
          return { done: true, value: void 0 };
        }
        /** @abstract */
        getNextPage(_pageResult) {
          throw new Error("Unimplemented");
        }
        async _next() {
          return this.iterate(await this.pagePromise);
        }
        next() {
          if (this.promiseCache.currentPromise) {
            return this.promiseCache.currentPromise;
          }
          const nextPromise = (async () => {
            const ret = await this._next();
            this.promiseCache.currentPromise = null;
            return ret;
          })();
          this.promiseCache.currentPromise = nextPromise;
          return nextPromise;
        }
      };
      var ListIterator = class extends StripeIterator {
        getNextPage(pageResult) {
          const reverseIteration = isReverseIteration(this.requestArgs);
          const lastId = getLastId(pageResult, reverseIteration);
          return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            [reverseIteration ? "ending_before" : "starting_after"]: lastId
          });
        }
      };
      var SearchIterator = class extends StripeIterator {
        getNextPage(pageResult) {
          if (!pageResult.next_page) {
            throw Error("Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.");
          }
          return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            page: pageResult.next_page
          });
        }
      };
      var makeAutoPaginationMethods = (stripeResource, requestArgs, spec, firstPagePromise) => {
        if (spec.methodType === "search") {
          return makeAutoPaginationMethodsFromIterator(new SearchIterator(firstPagePromise, requestArgs, spec, stripeResource));
        }
        if (spec.methodType === "list") {
          return makeAutoPaginationMethodsFromIterator(new ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
        }
        return null;
      };
      exports.makeAutoPaginationMethods = makeAutoPaginationMethods;
      var makeAutoPaginationMethodsFromIterator = (iterator) => {
        const autoPagingEach = makeAutoPagingEach((...args) => iterator.next(...args));
        const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
        const autoPaginationMethods = {
          autoPagingEach,
          autoPagingToArray,
          // Async iterator functions:
          next: () => iterator.next(),
          return: () => {
            return {};
          },
          [getAsyncIteratorSymbol()]: () => {
            return autoPaginationMethods;
          }
        };
        return autoPaginationMethods;
      };
      function getAsyncIteratorSymbol() {
        if (typeof Symbol !== "undefined" && Symbol.asyncIterator) {
          return Symbol.asyncIterator;
        }
        return "@@asyncIterator";
      }
      function getDoneCallback(args) {
        if (args.length < 2) {
          return null;
        }
        const onDone = args[1];
        if (typeof onDone !== "function") {
          throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
        }
        return onDone;
      }
      function getItemCallback(args) {
        if (args.length === 0) {
          return void 0;
        }
        const onItem = args[0];
        if (typeof onItem !== "function") {
          throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
        }
        if (onItem.length === 2) {
          return onItem;
        }
        if (onItem.length > 2) {
          throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
        }
        return function _onItem(item, next) {
          const shouldContinue = onItem(item);
          next(shouldContinue);
        };
      }
      function getLastId(listResult, reverseIteration) {
        const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
        const lastItem = listResult.data[lastIdx];
        const lastId = lastItem && lastItem.id;
        if (!lastId) {
          throw Error("Unexpected: No `id` found on the last item while auto-paging a list.");
        }
        return lastId;
      }
      function makeAutoPagingEach(asyncIteratorNext) {
        return function autoPagingEach() {
          const args = [].slice.call(arguments);
          const onItem = getItemCallback(args);
          const onDone = getDoneCallback(args);
          if (args.length > 2) {
            throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
          }
          const autoPagePromise = wrapAsyncIteratorWithCallback(
            asyncIteratorNext,
            // @ts-ignore we might need a null check
            onItem
          );
          return (0, utils_js_1.callbackifyPromiseWithTimeout)(autoPagePromise, onDone);
        };
      }
      function makeAutoPagingToArray(autoPagingEach) {
        return function autoPagingToArray(opts, onDone) {
          const limit = opts && opts.limit;
          if (!limit) {
            throw Error("You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.");
          }
          if (limit > 1e4) {
            throw Error("You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.");
          }
          const promise = new Promise((resolve, reject) => {
            const items = [];
            autoPagingEach((item) => {
              items.push(item);
              if (items.length >= limit) {
                return false;
              }
            }).then(() => {
              resolve(items);
            }).catch(reject);
          });
          return (0, utils_js_1.callbackifyPromiseWithTimeout)(promise, onDone);
        };
      }
      function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
        return new Promise((resolve, reject) => {
          function handleIteration(iterResult) {
            if (iterResult.done) {
              resolve();
              return;
            }
            const item = iterResult.value;
            return new Promise((next) => {
              onItem(item, next);
            }).then((shouldContinue) => {
              if (shouldContinue === false) {
                return handleIteration({ done: true, value: void 0 });
              } else {
                return asyncIteratorNext().then(handleIteration);
              }
            });
          }
          asyncIteratorNext().then(handleIteration).catch(reject);
        });
      }
      function isReverseIteration(requestArgs) {
        const args = [].slice.call(requestArgs);
        const dataFromArgs = (0, utils_js_1.getDataFromArgs)(args);
        return !!dataFromArgs.ending_before;
      }
    }
  });

  // node_modules/stripe/cjs/StripeMethod.js
  var require_StripeMethod = __commonJS({
    "node_modules/stripe/cjs/StripeMethod.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stripeMethod = void 0;
      var utils_js_1 = require_utils2();
      var autoPagination_js_1 = require_autoPagination();
      function stripeMethod(spec) {
        if (spec.path !== void 0 && spec.fullPath !== void 0) {
          throw new Error(`Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`);
        }
        return function(...args) {
          const callback = typeof args[args.length - 1] == "function" && args.pop();
          spec.urlParams = (0, utils_js_1.extractUrlParams)(spec.fullPath || this.createResourcePathWithSymbols(spec.path || ""));
          const requestPromise = (0, utils_js_1.callbackifyPromiseWithTimeout)(this._makeRequest(args, spec, {}), callback);
          Object.assign(requestPromise, (0, autoPagination_js_1.makeAutoPaginationMethods)(this, args, spec, requestPromise));
          return requestPromise;
        };
      }
      exports.stripeMethod = stripeMethod;
    }
  });

  // node_modules/stripe/cjs/StripeResource.js
  var require_StripeResource = __commonJS({
    "node_modules/stripe/cjs/StripeResource.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.StripeResource = void 0;
      var utils_js_1 = require_utils2();
      var StripeMethod_js_1 = require_StripeMethod();
      StripeResource.extend = utils_js_1.protoExtend;
      StripeResource.method = StripeMethod_js_1.stripeMethod;
      StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
      function StripeResource(stripe2, deprecatedUrlData) {
        this._stripe = stripe2;
        if (deprecatedUrlData) {
          throw new Error("Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.");
        }
        this.basePath = (0, utils_js_1.makeURLInterpolator)(
          // @ts-ignore changing type of basePath
          this.basePath || stripe2.getApiField("basePath")
        );
        this.resourcePath = this.path;
        this.path = (0, utils_js_1.makeURLInterpolator)(this.path);
        this.initialize(...arguments);
      }
      exports.StripeResource = StripeResource;
      StripeResource.prototype = {
        _stripe: null,
        // @ts-ignore the type of path changes in ctor
        path: "",
        resourcePath: "",
        // Methods that don't use the API's default '/v1' path can override it with this setting.
        basePath: null,
        initialize() {
        },
        // Function to override the default data processor. This allows full control
        // over how a StripeResource's request data will get converted into an HTTP
        // body. This is useful for non-standard HTTP requests. The function should
        // take method name, data, and headers as arguments.
        requestDataProcessor: null,
        // Function to add a validation checks before sending the request, errors should
        // be thrown, and they will be passed to the callback/promise.
        validateRequest: null,
        createFullPath(commandPath, urlData) {
          const urlParts = [this.basePath(urlData), this.path(urlData)];
          if (typeof commandPath === "function") {
            const computedCommandPath = commandPath(urlData);
            if (computedCommandPath) {
              urlParts.push(computedCommandPath);
            }
          } else {
            urlParts.push(commandPath);
          }
          return this._joinUrlParts(urlParts);
        },
        // Creates a relative resource path with symbols left in (unlike
        // createFullPath which takes some data to replace them with). For example it
        // might produce: /invoices/{id}
        createResourcePathWithSymbols(pathWithSymbols) {
          if (pathWithSymbols) {
            return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
          } else {
            return `/${this.resourcePath}`;
          }
        },
        _joinUrlParts(parts) {
          return parts.join("/").replace(/\/{2,}/g, "/");
        },
        _getRequestOpts(requestArgs, spec, overrideData) {
          const requestMethod = (spec.method || "GET").toUpperCase();
          const urlParams = spec.urlParams || [];
          const encode3 = spec.encode || ((data2) => data2);
          const isUsingFullPath = !!spec.fullPath;
          const commandPath = (0, utils_js_1.makeURLInterpolator)(isUsingFullPath ? spec.fullPath : spec.path || "");
          const path = isUsingFullPath ? spec.fullPath : this.createResourcePathWithSymbols(spec.path);
          const args = [].slice.call(requestArgs);
          const urlData = urlParams.reduce((urlData2, param) => {
            const arg = args.shift();
            if (typeof arg !== "string") {
              throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
            }
            urlData2[param] = arg;
            return urlData2;
          }, {});
          const dataFromArgs = (0, utils_js_1.getDataFromArgs)(args);
          const data = encode3(Object.assign({}, dataFromArgs, overrideData));
          const options = (0, utils_js_1.getOptionsFromArgs)(args);
          const host = options.host || spec.host;
          const streaming = !!spec.streaming;
          if (args.filter((x) => x != null).length) {
            throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
          }
          const requestPath = isUsingFullPath ? commandPath(urlData) : this.createFullPath(commandPath, urlData);
          const headers = Object.assign(options.headers, spec.headers);
          if (spec.validator) {
            spec.validator(data, { headers });
          }
          const dataInQuery = spec.method === "GET" || spec.method === "DELETE";
          const bodyData = dataInQuery ? {} : data;
          const queryData = dataInQuery ? data : {};
          return {
            requestMethod,
            requestPath,
            bodyData,
            queryData,
            auth: options.auth,
            headers,
            host: host !== null && host !== void 0 ? host : null,
            streaming,
            settings: options.settings
          };
        },
        _makeRequest(requestArgs, spec, overrideData) {
          return new Promise((resolve, reject) => {
            var _a;
            let opts;
            try {
              opts = this._getRequestOpts(requestArgs, spec, overrideData);
            } catch (err) {
              reject(err);
              return;
            }
            function requestCallback(err, response) {
              if (err) {
                reject(err);
              } else {
                resolve(spec.transformResponseData ? spec.transformResponseData(response) : response);
              }
            }
            const emptyQuery = Object.keys(opts.queryData).length === 0;
            const path = [
              opts.requestPath,
              emptyQuery ? "" : "?",
              (0, utils_js_1.stringifyRequestData)(opts.queryData)
            ].join("");
            const { headers, settings } = opts;
            this._stripe._requestSender._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.auth, { headers, settings, streaming: opts.streaming }, requestCallback, (_a = this.requestDataProcessor) === null || _a === void 0 ? void 0 : _a.bind(this));
          });
        }
      };
    }
  });

  // node_modules/stripe/cjs/resources/FinancialConnections/Accounts.js
  var require_Accounts = __commonJS({
    "node_modules/stripe/cjs/resources/FinancialConnections/Accounts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Accounts = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Accounts = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/financial_connections/accounts/{account}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/financial_connections/accounts",
          methodType: "list"
        }),
        disconnect: stripeMethod({
          method: "POST",
          fullPath: "/v1/financial_connections/accounts/{account}/disconnect"
        }),
        listOwners: stripeMethod({
          method: "GET",
          fullPath: "/v1/financial_connections/accounts/{account}/owners",
          methodType: "list"
        }),
        refresh: stripeMethod({
          method: "POST",
          fullPath: "/v1/financial_connections/accounts/{account}/refresh"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Issuing/Authorizations.js
  var require_Authorizations = __commonJS({
    "node_modules/stripe/cjs/resources/Issuing/Authorizations.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Authorizations = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Authorizations = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/authorizations/{authorization}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/issuing/authorizations/{authorization}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/authorizations",
          methodType: "list"
        }),
        approve: stripeMethod({
          method: "POST",
          fullPath: "/v1/issuing/authorizations/{authorization}/approve"
        }),
        decline: stripeMethod({
          method: "POST",
          fullPath: "/v1/issuing/authorizations/{authorization}/decline"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Tax/Calculations.js
  var require_Calculations = __commonJS({
    "node_modules/stripe/cjs/resources/Tax/Calculations.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Calculations = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Calculations = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/tax/calculations" }),
        listLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/tax/calculations/{calculation}/line_items",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Issuing/Cardholders.js
  var require_Cardholders = __commonJS({
    "node_modules/stripe/cjs/resources/Issuing/Cardholders.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Cardholders = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Cardholders = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/issuing/cardholders" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/cardholders/{cardholder}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/issuing/cardholders/{cardholder}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/cardholders",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Issuing/Cards.js
  var require_Cards = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Issuing/Cards.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Cards = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Cards = StripeResource_js_1.StripeResource.extend({
        deliverCard: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/deliver"
        }),
        failCard: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/fail"
        }),
        returnCard: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/return"
        }),
        shipCard: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/ship"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Issuing/Cards.js
  var require_Cards2 = __commonJS({
    "node_modules/stripe/cjs/resources/Issuing/Cards.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Cards = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Cards = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/issuing/cards" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/issuing/cards/{card}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/issuing/cards/{card}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/cards",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/BillingPortal/Configurations.js
  var require_Configurations = __commonJS({
    "node_modules/stripe/cjs/resources/BillingPortal/Configurations.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Configurations = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Configurations = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/billing_portal/configurations"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/billing_portal/configurations/{configuration}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/billing_portal/configurations/{configuration}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/billing_portal/configurations",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Terminal/Configurations.js
  var require_Configurations2 = __commonJS({
    "node_modules/stripe/cjs/resources/Terminal/Configurations.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Configurations = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Configurations = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/configurations"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/terminal/configurations/{configuration}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/configurations/{configuration}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/terminal/configurations",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/terminal/configurations/{configuration}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Terminal/ConnectionTokens.js
  var require_ConnectionTokens = __commonJS({
    "node_modules/stripe/cjs/resources/Terminal/ConnectionTokens.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ConnectionTokens = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ConnectionTokens = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/connection_tokens"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/CreditReversals.js
  var require_CreditReversals = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/CreditReversals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CreditReversals = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.CreditReversals = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/credit_reversals"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/credit_reversals/{credit_reversal}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/credit_reversals",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Customers.js
  var require_Customers = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Customers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Customers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Customers = StripeResource_js_1.StripeResource.extend({
        fundCashBalance: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/customers/{customer}/fund_cash_balance"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/DebitReversals.js
  var require_DebitReversals = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/DebitReversals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DebitReversals = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.DebitReversals = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/debit_reversals"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/debit_reversals/{debit_reversal}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/debit_reversals",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Issuing/Disputes.js
  var require_Disputes = __commonJS({
    "node_modules/stripe/cjs/resources/Issuing/Disputes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Disputes = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Disputes = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/issuing/disputes" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/disputes/{dispute}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/issuing/disputes/{dispute}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/disputes",
          methodType: "list"
        }),
        submit: stripeMethod({
          method: "POST",
          fullPath: "/v1/issuing/disputes/{dispute}/submit"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Radar/EarlyFraudWarnings.js
  var require_EarlyFraudWarnings = __commonJS({
    "node_modules/stripe/cjs/resources/Radar/EarlyFraudWarnings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EarlyFraudWarnings = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.EarlyFraudWarnings = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/radar/early_fraud_warnings/{early_fraud_warning}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/radar/early_fraud_warnings",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/FinancialAccounts.js
  var require_FinancialAccounts = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/FinancialAccounts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FinancialAccounts = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.FinancialAccounts = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/financial_accounts"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/financial_accounts/{financial_account}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/financial_accounts/{financial_account}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/financial_accounts",
          methodType: "list"
        }),
        retrieveFeatures: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/financial_accounts/{financial_account}/features"
        }),
        updateFeatures: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/financial_accounts/{financial_account}/features"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Treasury/InboundTransfers.js
  var require_InboundTransfers = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Treasury/InboundTransfers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InboundTransfers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.InboundTransfers = StripeResource_js_1.StripeResource.extend({
        fail: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/fail"
        }),
        returnInboundTransfer: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/return"
        }),
        succeed: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/InboundTransfers.js
  var require_InboundTransfers2 = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/InboundTransfers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InboundTransfers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.InboundTransfers = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/inbound_transfers"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/inbound_transfers/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/inbound_transfers",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Terminal/Locations.js
  var require_Locations = __commonJS({
    "node_modules/stripe/cjs/resources/Terminal/Locations.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Locations = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Locations = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/terminal/locations" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/terminal/locations/{location}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/locations/{location}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/terminal/locations",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/terminal/locations/{location}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundPayments.js
  var require_OutboundPayments = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundPayments.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OutboundPayments = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.OutboundPayments = StripeResource_js_1.StripeResource.extend({
        fail: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/fail"
        }),
        post: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/post"
        }),
        returnOutboundPayment: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/return"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/OutboundPayments.js
  var require_OutboundPayments2 = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/OutboundPayments.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OutboundPayments = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.OutboundPayments = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/outbound_payments"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/outbound_payments/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/outbound_payments",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/outbound_payments/{id}/cancel"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundTransfers.js
  var require_OutboundTransfers = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Treasury/OutboundTransfers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OutboundTransfers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.OutboundTransfers = StripeResource_js_1.StripeResource.extend({
        fail: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail"
        }),
        post: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post"
        }),
        returnOutboundTransfer: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/OutboundTransfers.js
  var require_OutboundTransfers2 = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/OutboundTransfers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OutboundTransfers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.OutboundTransfers = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/outbound_transfers"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/outbound_transfers",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Terminal/Readers.js
  var require_Readers = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Terminal/Readers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Readers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Readers = StripeResource_js_1.StripeResource.extend({
        presentPaymentMethod: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/terminal/readers/{reader}/present_payment_method"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Terminal/Readers.js
  var require_Readers2 = __commonJS({
    "node_modules/stripe/cjs/resources/Terminal/Readers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Readers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Readers = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/terminal/readers" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/terminal/readers/{reader}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/readers/{reader}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/terminal/readers",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/terminal/readers/{reader}"
        }),
        cancelAction: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/readers/{reader}/cancel_action"
        }),
        processPaymentIntent: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/readers/{reader}/process_payment_intent"
        }),
        processSetupIntent: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/readers/{reader}/process_setup_intent"
        }),
        refundPayment: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/readers/{reader}/refund_payment"
        }),
        setReaderDisplay: stripeMethod({
          method: "POST",
          fullPath: "/v1/terminal/readers/{reader}/set_reader_display"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedCredits.js
  var require_ReceivedCredits = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedCredits.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReceivedCredits = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ReceivedCredits = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/received_credits"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/ReceivedCredits.js
  var require_ReceivedCredits2 = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/ReceivedCredits.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReceivedCredits = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ReceivedCredits = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/received_credits/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/received_credits",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedDebits.js
  var require_ReceivedDebits = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Treasury/ReceivedDebits.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReceivedDebits = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ReceivedDebits = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/treasury/received_debits"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/ReceivedDebits.js
  var require_ReceivedDebits2 = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/ReceivedDebits.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReceivedDebits = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ReceivedDebits = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/received_debits/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/received_debits",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/Refunds.js
  var require_Refunds = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/Refunds.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Refunds = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Refunds = StripeResource_js_1.StripeResource.extend({
        expire: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/refunds/{refund}/expire"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Reporting/ReportRuns.js
  var require_ReportRuns = __commonJS({
    "node_modules/stripe/cjs/resources/Reporting/ReportRuns.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReportRuns = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ReportRuns = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/reporting/report_runs" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/reporting/report_runs/{report_run}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/reporting/report_runs",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Reporting/ReportTypes.js
  var require_ReportTypes = __commonJS({
    "node_modules/stripe/cjs/resources/Reporting/ReportTypes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReportTypes = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ReportTypes = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/reporting/report_types/{report_type}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/reporting/report_types",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Sigma/ScheduledQueryRuns.js
  var require_ScheduledQueryRuns = __commonJS({
    "node_modules/stripe/cjs/resources/Sigma/ScheduledQueryRuns.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ScheduledQueryRuns = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ScheduledQueryRuns = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/sigma/scheduled_query_runs/{scheduled_query_run}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/sigma/scheduled_query_runs",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Apps/Secrets.js
  var require_Secrets = __commonJS({
    "node_modules/stripe/cjs/resources/Apps/Secrets.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Secrets = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Secrets = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/apps/secrets" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/apps/secrets",
          methodType: "list"
        }),
        deleteWhere: stripeMethod({
          method: "POST",
          fullPath: "/v1/apps/secrets/delete"
        }),
        find: stripeMethod({ method: "GET", fullPath: "/v1/apps/secrets/find" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/BillingPortal/Sessions.js
  var require_Sessions = __commonJS({
    "node_modules/stripe/cjs/resources/BillingPortal/Sessions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Sessions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Sessions = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/billing_portal/sessions"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Checkout/Sessions.js
  var require_Sessions2 = __commonJS({
    "node_modules/stripe/cjs/resources/Checkout/Sessions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Sessions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Sessions = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/checkout/sessions" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/checkout/sessions/{session}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/checkout/sessions",
          methodType: "list"
        }),
        expire: stripeMethod({
          method: "POST",
          fullPath: "/v1/checkout/sessions/{session}/expire"
        }),
        listLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/checkout/sessions/{session}/line_items",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/FinancialConnections/Sessions.js
  var require_Sessions3 = __commonJS({
    "node_modules/stripe/cjs/resources/FinancialConnections/Sessions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Sessions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Sessions = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/financial_connections/sessions"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/financial_connections/sessions/{session}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Tax/Settings.js
  var require_Settings = __commonJS({
    "node_modules/stripe/cjs/resources/Tax/Settings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Settings = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Settings = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tax/settings" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/tax/settings" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TestHelpers/TestClocks.js
  var require_TestClocks = __commonJS({
    "node_modules/stripe/cjs/resources/TestHelpers/TestClocks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TestClocks = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.TestClocks = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/test_clocks"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/test_helpers/test_clocks/{test_clock}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/test_helpers/test_clocks",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/test_helpers/test_clocks/{test_clock}"
        }),
        advance: stripeMethod({
          method: "POST",
          fullPath: "/v1/test_helpers/test_clocks/{test_clock}/advance"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/TransactionEntries.js
  var require_TransactionEntries = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/TransactionEntries.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TransactionEntries = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.TransactionEntries = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/transaction_entries/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/transaction_entries",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Issuing/Transactions.js
  var require_Transactions = __commonJS({
    "node_modules/stripe/cjs/resources/Issuing/Transactions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transactions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Transactions = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/transactions/{transaction}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/issuing/transactions/{transaction}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/issuing/transactions",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Tax/Transactions.js
  var require_Transactions2 = __commonJS({
    "node_modules/stripe/cjs/resources/Tax/Transactions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transactions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Transactions = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/tax/transactions/{transaction}"
        }),
        createFromCalculation: stripeMethod({
          method: "POST",
          fullPath: "/v1/tax/transactions/create_from_calculation"
        }),
        createReversal: stripeMethod({
          method: "POST",
          fullPath: "/v1/tax/transactions/create_reversal"
        }),
        listLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/tax/transactions/{transaction}/line_items",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Treasury/Transactions.js
  var require_Transactions3 = __commonJS({
    "node_modules/stripe/cjs/resources/Treasury/Transactions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transactions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Transactions = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/transactions/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/treasury/transactions",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Radar/ValueListItems.js
  var require_ValueListItems = __commonJS({
    "node_modules/stripe/cjs/resources/Radar/ValueListItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValueListItems = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ValueListItems = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/radar/value_list_items"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/radar/value_list_items/{item}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/radar/value_list_items",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/radar/value_list_items/{item}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Radar/ValueLists.js
  var require_ValueLists = __commonJS({
    "node_modules/stripe/cjs/resources/Radar/ValueLists.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValueLists = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ValueLists = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/radar/value_lists" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/radar/value_lists/{value_list}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/radar/value_lists/{value_list}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/radar/value_lists",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/radar/value_lists/{value_list}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Identity/VerificationReports.js
  var require_VerificationReports = __commonJS({
    "node_modules/stripe/cjs/resources/Identity/VerificationReports.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VerificationReports = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.VerificationReports = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/identity/verification_reports/{report}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/identity/verification_reports",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Identity/VerificationSessions.js
  var require_VerificationSessions = __commonJS({
    "node_modules/stripe/cjs/resources/Identity/VerificationSessions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VerificationSessions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.VerificationSessions = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/identity/verification_sessions"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/identity/verification_sessions/{session}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/identity/verification_sessions/{session}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/identity/verification_sessions",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/identity/verification_sessions/{session}/cancel"
        }),
        redact: stripeMethod({
          method: "POST",
          fullPath: "/v1/identity/verification_sessions/{session}/redact"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Accounts.js
  var require_Accounts2 = __commonJS({
    "node_modules/stripe/cjs/resources/Accounts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Accounts = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Accounts = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/accounts" }),
        retrieve(id, ...args) {
          if (typeof id === "string") {
            return stripeMethod({
              method: "GET",
              fullPath: "/v1/accounts/{id}"
            }).apply(this, [id, ...args]);
          } else {
            if (id === null || id === void 0) {
              [].shift.apply([id, ...args]);
            }
            return stripeMethod({
              method: "GET",
              fullPath: "/v1/account"
            }).apply(this, [id, ...args]);
          }
        },
        update: stripeMethod({ method: "POST", fullPath: "/v1/accounts/{account}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/accounts",
          methodType: "list"
        }),
        del: stripeMethod({ method: "DELETE", fullPath: "/v1/accounts/{account}" }),
        createExternalAccount: stripeMethod({
          method: "POST",
          fullPath: "/v1/accounts/{account}/external_accounts"
        }),
        createLoginLink: stripeMethod({
          method: "POST",
          fullPath: "/v1/accounts/{account}/login_links"
        }),
        createPerson: stripeMethod({
          method: "POST",
          fullPath: "/v1/accounts/{account}/persons"
        }),
        deleteExternalAccount: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/accounts/{account}/external_accounts/{id}"
        }),
        deletePerson: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/accounts/{account}/persons/{person}"
        }),
        listCapabilities: stripeMethod({
          method: "GET",
          fullPath: "/v1/accounts/{account}/capabilities",
          methodType: "list"
        }),
        listExternalAccounts: stripeMethod({
          method: "GET",
          fullPath: "/v1/accounts/{account}/external_accounts",
          methodType: "list"
        }),
        listPersons: stripeMethod({
          method: "GET",
          fullPath: "/v1/accounts/{account}/persons",
          methodType: "list"
        }),
        reject: stripeMethod({
          method: "POST",
          fullPath: "/v1/accounts/{account}/reject"
        }),
        retrieveCapability: stripeMethod({
          method: "GET",
          fullPath: "/v1/accounts/{account}/capabilities/{capability}"
        }),
        retrieveExternalAccount: stripeMethod({
          method: "GET",
          fullPath: "/v1/accounts/{account}/external_accounts/{id}"
        }),
        retrievePerson: stripeMethod({
          method: "GET",
          fullPath: "/v1/accounts/{account}/persons/{person}"
        }),
        updateCapability: stripeMethod({
          method: "POST",
          fullPath: "/v1/accounts/{account}/capabilities/{capability}"
        }),
        updateExternalAccount: stripeMethod({
          method: "POST",
          fullPath: "/v1/accounts/{account}/external_accounts/{id}"
        }),
        updatePerson: stripeMethod({
          method: "POST",
          fullPath: "/v1/accounts/{account}/persons/{person}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/AccountLinks.js
  var require_AccountLinks = __commonJS({
    "node_modules/stripe/cjs/resources/AccountLinks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AccountLinks = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.AccountLinks = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/account_links" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/ApplePayDomains.js
  var require_ApplePayDomains = __commonJS({
    "node_modules/stripe/cjs/resources/ApplePayDomains.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ApplePayDomains = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ApplePayDomains = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/apple_pay/domains" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/apple_pay/domains/{domain}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/apple_pay/domains",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/apple_pay/domains/{domain}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/ApplicationFees.js
  var require_ApplicationFees = __commonJS({
    "node_modules/stripe/cjs/resources/ApplicationFees.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ApplicationFees = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ApplicationFees = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/application_fees/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/application_fees",
          methodType: "list"
        }),
        createRefund: stripeMethod({
          method: "POST",
          fullPath: "/v1/application_fees/{id}/refunds"
        }),
        listRefunds: stripeMethod({
          method: "GET",
          fullPath: "/v1/application_fees/{id}/refunds",
          methodType: "list"
        }),
        retrieveRefund: stripeMethod({
          method: "GET",
          fullPath: "/v1/application_fees/{fee}/refunds/{id}"
        }),
        updateRefund: stripeMethod({
          method: "POST",
          fullPath: "/v1/application_fees/{fee}/refunds/{id}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Balance.js
  var require_Balance = __commonJS({
    "node_modules/stripe/cjs/resources/Balance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Balance = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Balance = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/balance" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/BalanceTransactions.js
  var require_BalanceTransactions = __commonJS({
    "node_modules/stripe/cjs/resources/BalanceTransactions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BalanceTransactions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.BalanceTransactions = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/balance_transactions/{id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/balance_transactions",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Charges.js
  var require_Charges = __commonJS({
    "node_modules/stripe/cjs/resources/Charges.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Charges = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Charges = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/charges" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/charges/{charge}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/charges/{charge}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/charges",
          methodType: "list"
        }),
        capture: stripeMethod({
          method: "POST",
          fullPath: "/v1/charges/{charge}/capture"
        }),
        search: stripeMethod({
          method: "GET",
          fullPath: "/v1/charges/search",
          methodType: "search"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/CountrySpecs.js
  var require_CountrySpecs = __commonJS({
    "node_modules/stripe/cjs/resources/CountrySpecs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CountrySpecs = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.CountrySpecs = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/country_specs/{country}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/country_specs",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Coupons.js
  var require_Coupons = __commonJS({
    "node_modules/stripe/cjs/resources/Coupons.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Coupons = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Coupons = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/coupons" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/coupons/{coupon}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/coupons/{coupon}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/coupons",
          methodType: "list"
        }),
        del: stripeMethod({ method: "DELETE", fullPath: "/v1/coupons/{coupon}" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/CreditNotes.js
  var require_CreditNotes = __commonJS({
    "node_modules/stripe/cjs/resources/CreditNotes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CreditNotes = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.CreditNotes = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/credit_notes" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/credit_notes/{id}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/credit_notes/{id}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/credit_notes",
          methodType: "list"
        }),
        listLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/credit_notes/{credit_note}/lines",
          methodType: "list"
        }),
        listPreviewLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/credit_notes/preview/lines",
          methodType: "list"
        }),
        preview: stripeMethod({ method: "GET", fullPath: "/v1/credit_notes/preview" }),
        voidCreditNote: stripeMethod({
          method: "POST",
          fullPath: "/v1/credit_notes/{id}/void"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Customers.js
  var require_Customers2 = __commonJS({
    "node_modules/stripe/cjs/resources/Customers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Customers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Customers = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/customers" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/customers/{customer}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/customers/{customer}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers",
          methodType: "list"
        }),
        del: stripeMethod({ method: "DELETE", fullPath: "/v1/customers/{customer}" }),
        createFundingInstructions: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/funding_instructions"
        }),
        createBalanceTransaction: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/balance_transactions"
        }),
        createSource: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/sources"
        }),
        createTaxId: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/tax_ids"
        }),
        deleteDiscount: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/customers/{customer}/discount"
        }),
        deleteSource: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/customers/{customer}/sources/{id}"
        }),
        deleteTaxId: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/customers/{customer}/tax_ids/{id}"
        }),
        listPaymentMethods: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/payment_methods",
          methodType: "list"
        }),
        listBalanceTransactions: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/balance_transactions",
          methodType: "list"
        }),
        listCashBalanceTransactions: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/cash_balance_transactions",
          methodType: "list"
        }),
        listSources: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/sources",
          methodType: "list"
        }),
        listTaxIds: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/tax_ids",
          methodType: "list"
        }),
        retrievePaymentMethod: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/payment_methods/{payment_method}"
        }),
        retrieveBalanceTransaction: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}"
        }),
        retrieveCashBalance: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/cash_balance"
        }),
        retrieveCashBalanceTransaction: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/cash_balance_transactions/{transaction}"
        }),
        retrieveSource: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/sources/{id}"
        }),
        retrieveTaxId: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/{customer}/tax_ids/{id}"
        }),
        search: stripeMethod({
          method: "GET",
          fullPath: "/v1/customers/search",
          methodType: "search"
        }),
        updateBalanceTransaction: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}"
        }),
        updateCashBalance: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/cash_balance"
        }),
        updateSource: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/sources/{id}"
        }),
        verifySource: stripeMethod({
          method: "POST",
          fullPath: "/v1/customers/{customer}/sources/{id}/verify"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Disputes.js
  var require_Disputes2 = __commonJS({
    "node_modules/stripe/cjs/resources/Disputes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Disputes = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Disputes = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/disputes/{dispute}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/disputes/{dispute}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/disputes",
          methodType: "list"
        }),
        close: stripeMethod({
          method: "POST",
          fullPath: "/v1/disputes/{dispute}/close"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/EphemeralKeys.js
  var require_EphemeralKeys = __commonJS({
    "node_modules/stripe/cjs/resources/EphemeralKeys.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EphemeralKeys = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.EphemeralKeys = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/ephemeral_keys",
          validator: (data, options) => {
            if (!options.headers || !options.headers["Stripe-Version"]) {
              throw new Error("Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node");
            }
          }
        }),
        del: stripeMethod({ method: "DELETE", fullPath: "/v1/ephemeral_keys/{key}" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Events.js
  var require_Events = __commonJS({
    "node_modules/stripe/cjs/resources/Events.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Events = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Events = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/events/{id}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/events",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/ExchangeRates.js
  var require_ExchangeRates = __commonJS({
    "node_modules/stripe/cjs/resources/ExchangeRates.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExchangeRates = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ExchangeRates = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/exchange_rates/{rate_id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/exchange_rates",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/FileLinks.js
  var require_FileLinks = __commonJS({
    "node_modules/stripe/cjs/resources/FileLinks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FileLinks = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.FileLinks = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/file_links" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/file_links/{link}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/file_links/{link}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/file_links",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/multipart.js
  var require_multipart = __commonJS({
    "node_modules/stripe/cjs/multipart.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.multipartRequestDataProcessor = void 0;
      var utils_js_1 = require_utils2();
      var multipartDataGenerator = (method, data, headers) => {
        const segno = (Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)).toString();
        headers["Content-Type"] = `multipart/form-data; boundary=${segno}`;
        const textEncoder = new TextEncoder();
        let buffer = new Uint8Array(0);
        const endBuffer = textEncoder.encode("\r\n");
        function push(l) {
          const prevBuffer = buffer;
          const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
          buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
          buffer.set(prevBuffer);
          buffer.set(newBuffer, prevBuffer.length);
          buffer.set(endBuffer, buffer.length - 2);
        }
        function q(s) {
          return `"${s.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
        }
        const flattenedData = (0, utils_js_1.flattenAndStringify)(data);
        for (const k in flattenedData) {
          const v = flattenedData[k];
          push(`--${segno}`);
          if (Object.prototype.hasOwnProperty.call(v, "data")) {
            const typedEntry = v;
            push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || "blob")}`);
            push(`Content-Type: ${typedEntry.type || "application/octet-stream"}`);
            push("");
            push(typedEntry.data);
          } else {
            push(`Content-Disposition: form-data; name=${q(k)}`);
            push("");
            push(v);
          }
        }
        push(`--${segno}--`);
        return buffer;
      };
      function multipartRequestDataProcessor(method, data, headers, callback) {
        data = data || {};
        if (method !== "POST") {
          return callback(null, (0, utils_js_1.stringifyRequestData)(data));
        }
        this._stripe._platformFunctions.tryBufferData(data).then((bufferedData) => {
          const buffer = multipartDataGenerator(method, bufferedData, headers);
          return callback(null, buffer);
        }).catch((err) => callback(err, null));
      }
      exports.multipartRequestDataProcessor = multipartRequestDataProcessor;
    }
  });

  // node_modules/stripe/cjs/resources/Files.js
  var require_Files = __commonJS({
    "node_modules/stripe/cjs/resources/Files.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Files = void 0;
      var multipart_js_1 = require_multipart();
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Files = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/files",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          host: "files.stripe.com"
        }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/files/{file}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/files",
          methodType: "list"
        }),
        requestDataProcessor: multipart_js_1.multipartRequestDataProcessor
      });
    }
  });

  // node_modules/stripe/cjs/resources/InvoiceItems.js
  var require_InvoiceItems = __commonJS({
    "node_modules/stripe/cjs/resources/InvoiceItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvoiceItems = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.InvoiceItems = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/invoiceitems" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/invoiceitems/{invoiceitem}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/invoiceitems/{invoiceitem}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/invoiceitems",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/invoiceitems/{invoiceitem}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Invoices.js
  var require_Invoices = __commonJS({
    "node_modules/stripe/cjs/resources/Invoices.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Invoices = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Invoices = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/invoices" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/invoices/{invoice}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/invoices/{invoice}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/invoices",
          methodType: "list"
        }),
        del: stripeMethod({ method: "DELETE", fullPath: "/v1/invoices/{invoice}" }),
        finalizeInvoice: stripeMethod({
          method: "POST",
          fullPath: "/v1/invoices/{invoice}/finalize"
        }),
        listLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/invoices/{invoice}/lines",
          methodType: "list"
        }),
        listUpcomingLines: stripeMethod({
          method: "GET",
          fullPath: "/v1/invoices/upcoming/lines",
          methodType: "list"
        }),
        markUncollectible: stripeMethod({
          method: "POST",
          fullPath: "/v1/invoices/{invoice}/mark_uncollectible"
        }),
        pay: stripeMethod({ method: "POST", fullPath: "/v1/invoices/{invoice}/pay" }),
        retrieveUpcoming: stripeMethod({
          method: "GET",
          fullPath: "/v1/invoices/upcoming"
        }),
        search: stripeMethod({
          method: "GET",
          fullPath: "/v1/invoices/search",
          methodType: "search"
        }),
        sendInvoice: stripeMethod({
          method: "POST",
          fullPath: "/v1/invoices/{invoice}/send"
        }),
        voidInvoice: stripeMethod({
          method: "POST",
          fullPath: "/v1/invoices/{invoice}/void"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Mandates.js
  var require_Mandates = __commonJS({
    "node_modules/stripe/cjs/resources/Mandates.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Mandates = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Mandates = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/mandates/{mandate}" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/OAuth.js
  var require_OAuth = __commonJS({
    "node_modules/stripe/cjs/resources/OAuth.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OAuth = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var utils_js_1 = require_utils2();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      var oAuthHost = "connect.stripe.com";
      exports.OAuth = StripeResource_js_1.StripeResource.extend({
        basePath: "/",
        authorizeUrl(params, options) {
          params = params || {};
          options = options || {};
          let path = "oauth/authorize";
          if (options.express) {
            path = `express/${path}`;
          }
          if (!params.response_type) {
            params.response_type = "code";
          }
          if (!params.client_id) {
            params.client_id = this._stripe.getClientId();
          }
          if (!params.scope) {
            params.scope = "read_write";
          }
          return `https://${oAuthHost}/${path}?${(0, utils_js_1.stringifyRequestData)(params)}`;
        },
        token: stripeMethod({
          method: "POST",
          path: "oauth/token",
          host: oAuthHost
        }),
        deauthorize(spec, ...args) {
          if (!spec.client_id) {
            spec.client_id = this._stripe.getClientId();
          }
          return stripeMethod({
            method: "POST",
            path: "oauth/deauthorize",
            host: oAuthHost
          }).apply(this, [spec, ...args]);
        }
      });
    }
  });

  // node_modules/stripe/cjs/resources/PaymentIntents.js
  var require_PaymentIntents = __commonJS({
    "node_modules/stripe/cjs/resources/PaymentIntents.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PaymentIntents = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.PaymentIntents = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/payment_intents" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_intents/{intent}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_intents/{intent}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_intents",
          methodType: "list"
        }),
        applyCustomerBalance: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_intents/{intent}/apply_customer_balance"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_intents/{intent}/cancel"
        }),
        capture: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_intents/{intent}/capture"
        }),
        confirm: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_intents/{intent}/confirm"
        }),
        incrementAuthorization: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_intents/{intent}/increment_authorization"
        }),
        search: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_intents/search",
          methodType: "search"
        }),
        verifyMicrodeposits: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_intents/{intent}/verify_microdeposits"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/PaymentLinks.js
  var require_PaymentLinks = __commonJS({
    "node_modules/stripe/cjs/resources/PaymentLinks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PaymentLinks = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.PaymentLinks = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/payment_links" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_links/{payment_link}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_links/{payment_link}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_links",
          methodType: "list"
        }),
        listLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_links/{payment_link}/line_items",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/PaymentMethods.js
  var require_PaymentMethods = __commonJS({
    "node_modules/stripe/cjs/resources/PaymentMethods.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PaymentMethods = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.PaymentMethods = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/payment_methods" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_methods/{payment_method}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_methods/{payment_method}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/payment_methods",
          methodType: "list"
        }),
        attach: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_methods/{payment_method}/attach"
        }),
        detach: stripeMethod({
          method: "POST",
          fullPath: "/v1/payment_methods/{payment_method}/detach"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Payouts.js
  var require_Payouts = __commonJS({
    "node_modules/stripe/cjs/resources/Payouts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Payouts = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Payouts = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/payouts" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/payouts/{payout}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/payouts/{payout}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/payouts",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/payouts/{payout}/cancel"
        }),
        reverse: stripeMethod({
          method: "POST",
          fullPath: "/v1/payouts/{payout}/reverse"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Plans.js
  var require_Plans = __commonJS({
    "node_modules/stripe/cjs/resources/Plans.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Plans = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Plans = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/plans" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/plans/{plan}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/plans/{plan}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/plans",
          methodType: "list"
        }),
        del: stripeMethod({ method: "DELETE", fullPath: "/v1/plans/{plan}" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Prices.js
  var require_Prices = __commonJS({
    "node_modules/stripe/cjs/resources/Prices.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Prices = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Prices = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/prices" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/prices/{price}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/prices/{price}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/prices",
          methodType: "list"
        }),
        search: stripeMethod({
          method: "GET",
          fullPath: "/v1/prices/search",
          methodType: "search"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Products.js
  var require_Products = __commonJS({
    "node_modules/stripe/cjs/resources/Products.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Products = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Products = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/products" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/products/{id}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/products/{id}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/products",
          methodType: "list"
        }),
        del: stripeMethod({ method: "DELETE", fullPath: "/v1/products/{id}" }),
        search: stripeMethod({
          method: "GET",
          fullPath: "/v1/products/search",
          methodType: "search"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/PromotionCodes.js
  var require_PromotionCodes = __commonJS({
    "node_modules/stripe/cjs/resources/PromotionCodes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PromotionCodes = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.PromotionCodes = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/promotion_codes" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/promotion_codes/{promotion_code}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/promotion_codes/{promotion_code}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/promotion_codes",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Quotes.js
  var require_Quotes = __commonJS({
    "node_modules/stripe/cjs/resources/Quotes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Quotes = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Quotes = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/quotes" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/quotes/{quote}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/quotes/{quote}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/quotes",
          methodType: "list"
        }),
        accept: stripeMethod({ method: "POST", fullPath: "/v1/quotes/{quote}/accept" }),
        cancel: stripeMethod({ method: "POST", fullPath: "/v1/quotes/{quote}/cancel" }),
        finalizeQuote: stripeMethod({
          method: "POST",
          fullPath: "/v1/quotes/{quote}/finalize"
        }),
        listComputedUpfrontLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/quotes/{quote}/computed_upfront_line_items",
          methodType: "list"
        }),
        listLineItems: stripeMethod({
          method: "GET",
          fullPath: "/v1/quotes/{quote}/line_items",
          methodType: "list"
        }),
        pdf: stripeMethod({
          method: "GET",
          fullPath: "/v1/quotes/{quote}/pdf",
          host: "files.stripe.com",
          streaming: true
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Refunds.js
  var require_Refunds2 = __commonJS({
    "node_modules/stripe/cjs/resources/Refunds.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Refunds = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Refunds = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/refunds" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/refunds/{refund}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/refunds/{refund}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/refunds",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/refunds/{refund}/cancel"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Reviews.js
  var require_Reviews = __commonJS({
    "node_modules/stripe/cjs/resources/Reviews.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Reviews = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Reviews = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/reviews/{review}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/reviews",
          methodType: "list"
        }),
        approve: stripeMethod({
          method: "POST",
          fullPath: "/v1/reviews/{review}/approve"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/SetupAttempts.js
  var require_SetupAttempts = __commonJS({
    "node_modules/stripe/cjs/resources/SetupAttempts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SetupAttempts = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.SetupAttempts = StripeResource_js_1.StripeResource.extend({
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/setup_attempts",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/SetupIntents.js
  var require_SetupIntents = __commonJS({
    "node_modules/stripe/cjs/resources/SetupIntents.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SetupIntents = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.SetupIntents = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/setup_intents" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/setup_intents/{intent}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/setup_intents/{intent}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/setup_intents",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/setup_intents/{intent}/cancel"
        }),
        confirm: stripeMethod({
          method: "POST",
          fullPath: "/v1/setup_intents/{intent}/confirm"
        }),
        verifyMicrodeposits: stripeMethod({
          method: "POST",
          fullPath: "/v1/setup_intents/{intent}/verify_microdeposits"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/ShippingRates.js
  var require_ShippingRates = __commonJS({
    "node_modules/stripe/cjs/resources/ShippingRates.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ShippingRates = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.ShippingRates = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/shipping_rates" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/shipping_rates/{shipping_rate_token}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/shipping_rates/{shipping_rate_token}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/shipping_rates",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Sources.js
  var require_Sources = __commonJS({
    "node_modules/stripe/cjs/resources/Sources.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Sources = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Sources = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/sources" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/sources/{source}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/sources/{source}" }),
        listSourceTransactions: stripeMethod({
          method: "GET",
          fullPath: "/v1/sources/{source}/source_transactions",
          methodType: "list"
        }),
        verify: stripeMethod({
          method: "POST",
          fullPath: "/v1/sources/{source}/verify"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/SubscriptionItems.js
  var require_SubscriptionItems = __commonJS({
    "node_modules/stripe/cjs/resources/SubscriptionItems.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SubscriptionItems = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.SubscriptionItems = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/subscription_items" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscription_items/{item}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscription_items/{item}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscription_items",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/subscription_items/{item}"
        }),
        createUsageRecord: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscription_items/{subscription_item}/usage_records"
        }),
        listUsageRecordSummaries: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscription_items/{subscription_item}/usage_record_summaries",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/SubscriptionSchedules.js
  var require_SubscriptionSchedules = __commonJS({
    "node_modules/stripe/cjs/resources/SubscriptionSchedules.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SubscriptionSchedules = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.SubscriptionSchedules = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscription_schedules"
        }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscription_schedules/{schedule}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscription_schedules/{schedule}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscription_schedules",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscription_schedules/{schedule}/cancel"
        }),
        release: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscription_schedules/{schedule}/release"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Subscriptions.js
  var require_Subscriptions = __commonJS({
    "node_modules/stripe/cjs/resources/Subscriptions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Subscriptions = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Subscriptions = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/subscriptions" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscriptions/{subscription_exposed_id}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscriptions/{subscription_exposed_id}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscriptions",
          methodType: "list"
        }),
        cancel: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/subscriptions/{subscription_exposed_id}"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/subscriptions/{subscription_exposed_id}"
        }),
        deleteDiscount: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/subscriptions/{subscription_exposed_id}/discount"
        }),
        resume: stripeMethod({
          method: "POST",
          fullPath: "/v1/subscriptions/{subscription}/resume"
        }),
        search: stripeMethod({
          method: "GET",
          fullPath: "/v1/subscriptions/search",
          methodType: "search"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TaxCodes.js
  var require_TaxCodes = __commonJS({
    "node_modules/stripe/cjs/resources/TaxCodes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TaxCodes = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.TaxCodes = StripeResource_js_1.StripeResource.extend({
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tax_codes/{id}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/tax_codes",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/TaxRates.js
  var require_TaxRates = __commonJS({
    "node_modules/stripe/cjs/resources/TaxRates.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TaxRates = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.TaxRates = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/tax_rates" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tax_rates/{tax_rate}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/tax_rates/{tax_rate}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/tax_rates",
          methodType: "list"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Tokens.js
  var require_Tokens = __commonJS({
    "node_modules/stripe/cjs/resources/Tokens.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Tokens = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Tokens = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/tokens" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/tokens/{token}" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Topups.js
  var require_Topups = __commonJS({
    "node_modules/stripe/cjs/resources/Topups.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Topups = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Topups = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/topups" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/topups/{topup}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/topups/{topup}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/topups",
          methodType: "list"
        }),
        cancel: stripeMethod({ method: "POST", fullPath: "/v1/topups/{topup}/cancel" })
      });
    }
  });

  // node_modules/stripe/cjs/resources/Transfers.js
  var require_Transfers = __commonJS({
    "node_modules/stripe/cjs/resources/Transfers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transfers = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.Transfers = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/transfers" }),
        retrieve: stripeMethod({ method: "GET", fullPath: "/v1/transfers/{transfer}" }),
        update: stripeMethod({ method: "POST", fullPath: "/v1/transfers/{transfer}" }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/transfers",
          methodType: "list"
        }),
        createReversal: stripeMethod({
          method: "POST",
          fullPath: "/v1/transfers/{id}/reversals"
        }),
        listReversals: stripeMethod({
          method: "GET",
          fullPath: "/v1/transfers/{id}/reversals",
          methodType: "list"
        }),
        retrieveReversal: stripeMethod({
          method: "GET",
          fullPath: "/v1/transfers/{transfer}/reversals/{id}"
        }),
        updateReversal: stripeMethod({
          method: "POST",
          fullPath: "/v1/transfers/{transfer}/reversals/{id}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources/WebhookEndpoints.js
  var require_WebhookEndpoints = __commonJS({
    "node_modules/stripe/cjs/resources/WebhookEndpoints.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebhookEndpoints = void 0;
      var StripeResource_js_1 = require_StripeResource();
      var stripeMethod = StripeResource_js_1.StripeResource.method;
      exports.WebhookEndpoints = StripeResource_js_1.StripeResource.extend({
        create: stripeMethod({ method: "POST", fullPath: "/v1/webhook_endpoints" }),
        retrieve: stripeMethod({
          method: "GET",
          fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
        }),
        update: stripeMethod({
          method: "POST",
          fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
        }),
        list: stripeMethod({
          method: "GET",
          fullPath: "/v1/webhook_endpoints",
          methodType: "list"
        }),
        del: stripeMethod({
          method: "DELETE",
          fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
        })
      });
    }
  });

  // node_modules/stripe/cjs/resources.js
  var require_resources = __commonJS({
    "node_modules/stripe/cjs/resources.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FinancialConnections = exports.Checkout = exports.BillingPortal = exports.Apps = exports.WebhookEndpoints = exports.Transfers = exports.Topups = exports.Tokens = exports.TaxRates = exports.TaxCodes = exports.Subscriptions = exports.SubscriptionSchedules = exports.SubscriptionItems = exports.Sources = exports.ShippingRates = exports.SetupIntents = exports.SetupAttempts = exports.Reviews = exports.Refunds = exports.Quotes = exports.PromotionCodes = exports.Products = exports.Prices = exports.Plans = exports.Payouts = exports.PaymentMethods = exports.PaymentLinks = exports.PaymentIntents = exports.OAuth = exports.Mandates = exports.Invoices = exports.InvoiceItems = exports.Files = exports.FileLinks = exports.ExchangeRates = exports.Events = exports.EphemeralKeys = exports.Disputes = exports.Customers = exports.CreditNotes = exports.Coupons = exports.CountrySpecs = exports.Charges = exports.BalanceTransactions = exports.Balance = exports.ApplicationFees = exports.ApplePayDomains = exports.Accounts = exports.AccountLinks = exports.Account = void 0;
      exports.Treasury = exports.TestHelpers = exports.Terminal = exports.Tax = exports.Sigma = exports.Reporting = exports.Radar = exports.Issuing = exports.Identity = void 0;
      var ResourceNamespace_js_1 = require_ResourceNamespace();
      var Accounts_js_1 = require_Accounts();
      var Authorizations_js_1 = require_Authorizations();
      var Calculations_js_1 = require_Calculations();
      var Cardholders_js_1 = require_Cardholders();
      var Cards_js_1 = require_Cards();
      var Cards_js_2 = require_Cards2();
      var Configurations_js_1 = require_Configurations();
      var Configurations_js_2 = require_Configurations2();
      var ConnectionTokens_js_1 = require_ConnectionTokens();
      var CreditReversals_js_1 = require_CreditReversals();
      var Customers_js_1 = require_Customers();
      var DebitReversals_js_1 = require_DebitReversals();
      var Disputes_js_1 = require_Disputes();
      var EarlyFraudWarnings_js_1 = require_EarlyFraudWarnings();
      var FinancialAccounts_js_1 = require_FinancialAccounts();
      var InboundTransfers_js_1 = require_InboundTransfers();
      var InboundTransfers_js_2 = require_InboundTransfers2();
      var Locations_js_1 = require_Locations();
      var OutboundPayments_js_1 = require_OutboundPayments();
      var OutboundPayments_js_2 = require_OutboundPayments2();
      var OutboundTransfers_js_1 = require_OutboundTransfers();
      var OutboundTransfers_js_2 = require_OutboundTransfers2();
      var Readers_js_1 = require_Readers();
      var Readers_js_2 = require_Readers2();
      var ReceivedCredits_js_1 = require_ReceivedCredits();
      var ReceivedCredits_js_2 = require_ReceivedCredits2();
      var ReceivedDebits_js_1 = require_ReceivedDebits();
      var ReceivedDebits_js_2 = require_ReceivedDebits2();
      var Refunds_js_1 = require_Refunds();
      var ReportRuns_js_1 = require_ReportRuns();
      var ReportTypes_js_1 = require_ReportTypes();
      var ScheduledQueryRuns_js_1 = require_ScheduledQueryRuns();
      var Secrets_js_1 = require_Secrets();
      var Sessions_js_1 = require_Sessions();
      var Sessions_js_2 = require_Sessions2();
      var Sessions_js_3 = require_Sessions3();
      var Settings_js_1 = require_Settings();
      var TestClocks_js_1 = require_TestClocks();
      var TransactionEntries_js_1 = require_TransactionEntries();
      var Transactions_js_1 = require_Transactions();
      var Transactions_js_2 = require_Transactions2();
      var Transactions_js_3 = require_Transactions3();
      var ValueListItems_js_1 = require_ValueListItems();
      var ValueLists_js_1 = require_ValueLists();
      var VerificationReports_js_1 = require_VerificationReports();
      var VerificationSessions_js_1 = require_VerificationSessions();
      var Accounts_js_2 = require_Accounts2();
      Object.defineProperty(exports, "Account", { enumerable: true, get: function() {
        return Accounts_js_2.Accounts;
      } });
      var AccountLinks_js_1 = require_AccountLinks();
      Object.defineProperty(exports, "AccountLinks", { enumerable: true, get: function() {
        return AccountLinks_js_1.AccountLinks;
      } });
      var Accounts_js_3 = require_Accounts2();
      Object.defineProperty(exports, "Accounts", { enumerable: true, get: function() {
        return Accounts_js_3.Accounts;
      } });
      var ApplePayDomains_js_1 = require_ApplePayDomains();
      Object.defineProperty(exports, "ApplePayDomains", { enumerable: true, get: function() {
        return ApplePayDomains_js_1.ApplePayDomains;
      } });
      var ApplicationFees_js_1 = require_ApplicationFees();
      Object.defineProperty(exports, "ApplicationFees", { enumerable: true, get: function() {
        return ApplicationFees_js_1.ApplicationFees;
      } });
      var Balance_js_1 = require_Balance();
      Object.defineProperty(exports, "Balance", { enumerable: true, get: function() {
        return Balance_js_1.Balance;
      } });
      var BalanceTransactions_js_1 = require_BalanceTransactions();
      Object.defineProperty(exports, "BalanceTransactions", { enumerable: true, get: function() {
        return BalanceTransactions_js_1.BalanceTransactions;
      } });
      var Charges_js_1 = require_Charges();
      Object.defineProperty(exports, "Charges", { enumerable: true, get: function() {
        return Charges_js_1.Charges;
      } });
      var CountrySpecs_js_1 = require_CountrySpecs();
      Object.defineProperty(exports, "CountrySpecs", { enumerable: true, get: function() {
        return CountrySpecs_js_1.CountrySpecs;
      } });
      var Coupons_js_1 = require_Coupons();
      Object.defineProperty(exports, "Coupons", { enumerable: true, get: function() {
        return Coupons_js_1.Coupons;
      } });
      var CreditNotes_js_1 = require_CreditNotes();
      Object.defineProperty(exports, "CreditNotes", { enumerable: true, get: function() {
        return CreditNotes_js_1.CreditNotes;
      } });
      var Customers_js_2 = require_Customers2();
      Object.defineProperty(exports, "Customers", { enumerable: true, get: function() {
        return Customers_js_2.Customers;
      } });
      var Disputes_js_2 = require_Disputes2();
      Object.defineProperty(exports, "Disputes", { enumerable: true, get: function() {
        return Disputes_js_2.Disputes;
      } });
      var EphemeralKeys_js_1 = require_EphemeralKeys();
      Object.defineProperty(exports, "EphemeralKeys", { enumerable: true, get: function() {
        return EphemeralKeys_js_1.EphemeralKeys;
      } });
      var Events_js_1 = require_Events();
      Object.defineProperty(exports, "Events", { enumerable: true, get: function() {
        return Events_js_1.Events;
      } });
      var ExchangeRates_js_1 = require_ExchangeRates();
      Object.defineProperty(exports, "ExchangeRates", { enumerable: true, get: function() {
        return ExchangeRates_js_1.ExchangeRates;
      } });
      var FileLinks_js_1 = require_FileLinks();
      Object.defineProperty(exports, "FileLinks", { enumerable: true, get: function() {
        return FileLinks_js_1.FileLinks;
      } });
      var Files_js_1 = require_Files();
      Object.defineProperty(exports, "Files", { enumerable: true, get: function() {
        return Files_js_1.Files;
      } });
      var InvoiceItems_js_1 = require_InvoiceItems();
      Object.defineProperty(exports, "InvoiceItems", { enumerable: true, get: function() {
        return InvoiceItems_js_1.InvoiceItems;
      } });
      var Invoices_js_1 = require_Invoices();
      Object.defineProperty(exports, "Invoices", { enumerable: true, get: function() {
        return Invoices_js_1.Invoices;
      } });
      var Mandates_js_1 = require_Mandates();
      Object.defineProperty(exports, "Mandates", { enumerable: true, get: function() {
        return Mandates_js_1.Mandates;
      } });
      var OAuth_js_1 = require_OAuth();
      Object.defineProperty(exports, "OAuth", { enumerable: true, get: function() {
        return OAuth_js_1.OAuth;
      } });
      var PaymentIntents_js_1 = require_PaymentIntents();
      Object.defineProperty(exports, "PaymentIntents", { enumerable: true, get: function() {
        return PaymentIntents_js_1.PaymentIntents;
      } });
      var PaymentLinks_js_1 = require_PaymentLinks();
      Object.defineProperty(exports, "PaymentLinks", { enumerable: true, get: function() {
        return PaymentLinks_js_1.PaymentLinks;
      } });
      var PaymentMethods_js_1 = require_PaymentMethods();
      Object.defineProperty(exports, "PaymentMethods", { enumerable: true, get: function() {
        return PaymentMethods_js_1.PaymentMethods;
      } });
      var Payouts_js_1 = require_Payouts();
      Object.defineProperty(exports, "Payouts", { enumerable: true, get: function() {
        return Payouts_js_1.Payouts;
      } });
      var Plans_js_1 = require_Plans();
      Object.defineProperty(exports, "Plans", { enumerable: true, get: function() {
        return Plans_js_1.Plans;
      } });
      var Prices_js_1 = require_Prices();
      Object.defineProperty(exports, "Prices", { enumerable: true, get: function() {
        return Prices_js_1.Prices;
      } });
      var Products_js_1 = require_Products();
      Object.defineProperty(exports, "Products", { enumerable: true, get: function() {
        return Products_js_1.Products;
      } });
      var PromotionCodes_js_1 = require_PromotionCodes();
      Object.defineProperty(exports, "PromotionCodes", { enumerable: true, get: function() {
        return PromotionCodes_js_1.PromotionCodes;
      } });
      var Quotes_js_1 = require_Quotes();
      Object.defineProperty(exports, "Quotes", { enumerable: true, get: function() {
        return Quotes_js_1.Quotes;
      } });
      var Refunds_js_2 = require_Refunds2();
      Object.defineProperty(exports, "Refunds", { enumerable: true, get: function() {
        return Refunds_js_2.Refunds;
      } });
      var Reviews_js_1 = require_Reviews();
      Object.defineProperty(exports, "Reviews", { enumerable: true, get: function() {
        return Reviews_js_1.Reviews;
      } });
      var SetupAttempts_js_1 = require_SetupAttempts();
      Object.defineProperty(exports, "SetupAttempts", { enumerable: true, get: function() {
        return SetupAttempts_js_1.SetupAttempts;
      } });
      var SetupIntents_js_1 = require_SetupIntents();
      Object.defineProperty(exports, "SetupIntents", { enumerable: true, get: function() {
        return SetupIntents_js_1.SetupIntents;
      } });
      var ShippingRates_js_1 = require_ShippingRates();
      Object.defineProperty(exports, "ShippingRates", { enumerable: true, get: function() {
        return ShippingRates_js_1.ShippingRates;
      } });
      var Sources_js_1 = require_Sources();
      Object.defineProperty(exports, "Sources", { enumerable: true, get: function() {
        return Sources_js_1.Sources;
      } });
      var SubscriptionItems_js_1 = require_SubscriptionItems();
      Object.defineProperty(exports, "SubscriptionItems", { enumerable: true, get: function() {
        return SubscriptionItems_js_1.SubscriptionItems;
      } });
      var SubscriptionSchedules_js_1 = require_SubscriptionSchedules();
      Object.defineProperty(exports, "SubscriptionSchedules", { enumerable: true, get: function() {
        return SubscriptionSchedules_js_1.SubscriptionSchedules;
      } });
      var Subscriptions_js_1 = require_Subscriptions();
      Object.defineProperty(exports, "Subscriptions", { enumerable: true, get: function() {
        return Subscriptions_js_1.Subscriptions;
      } });
      var TaxCodes_js_1 = require_TaxCodes();
      Object.defineProperty(exports, "TaxCodes", { enumerable: true, get: function() {
        return TaxCodes_js_1.TaxCodes;
      } });
      var TaxRates_js_1 = require_TaxRates();
      Object.defineProperty(exports, "TaxRates", { enumerable: true, get: function() {
        return TaxRates_js_1.TaxRates;
      } });
      var Tokens_js_1 = require_Tokens();
      Object.defineProperty(exports, "Tokens", { enumerable: true, get: function() {
        return Tokens_js_1.Tokens;
      } });
      var Topups_js_1 = require_Topups();
      Object.defineProperty(exports, "Topups", { enumerable: true, get: function() {
        return Topups_js_1.Topups;
      } });
      var Transfers_js_1 = require_Transfers();
      Object.defineProperty(exports, "Transfers", { enumerable: true, get: function() {
        return Transfers_js_1.Transfers;
      } });
      var WebhookEndpoints_js_1 = require_WebhookEndpoints();
      Object.defineProperty(exports, "WebhookEndpoints", { enumerable: true, get: function() {
        return WebhookEndpoints_js_1.WebhookEndpoints;
      } });
      exports.Apps = (0, ResourceNamespace_js_1.resourceNamespace)("apps", { Secrets: Secrets_js_1.Secrets });
      exports.BillingPortal = (0, ResourceNamespace_js_1.resourceNamespace)("billingPortal", {
        Configurations: Configurations_js_1.Configurations,
        Sessions: Sessions_js_1.Sessions
      });
      exports.Checkout = (0, ResourceNamespace_js_1.resourceNamespace)("checkout", {
        Sessions: Sessions_js_2.Sessions
      });
      exports.FinancialConnections = (0, ResourceNamespace_js_1.resourceNamespace)("financialConnections", {
        Accounts: Accounts_js_1.Accounts,
        Sessions: Sessions_js_3.Sessions
      });
      exports.Identity = (0, ResourceNamespace_js_1.resourceNamespace)("identity", {
        VerificationReports: VerificationReports_js_1.VerificationReports,
        VerificationSessions: VerificationSessions_js_1.VerificationSessions
      });
      exports.Issuing = (0, ResourceNamespace_js_1.resourceNamespace)("issuing", {
        Authorizations: Authorizations_js_1.Authorizations,
        Cardholders: Cardholders_js_1.Cardholders,
        Cards: Cards_js_2.Cards,
        Disputes: Disputes_js_1.Disputes,
        Transactions: Transactions_js_1.Transactions
      });
      exports.Radar = (0, ResourceNamespace_js_1.resourceNamespace)("radar", {
        EarlyFraudWarnings: EarlyFraudWarnings_js_1.EarlyFraudWarnings,
        ValueListItems: ValueListItems_js_1.ValueListItems,
        ValueLists: ValueLists_js_1.ValueLists
      });
      exports.Reporting = (0, ResourceNamespace_js_1.resourceNamespace)("reporting", {
        ReportRuns: ReportRuns_js_1.ReportRuns,
        ReportTypes: ReportTypes_js_1.ReportTypes
      });
      exports.Sigma = (0, ResourceNamespace_js_1.resourceNamespace)("sigma", {
        ScheduledQueryRuns: ScheduledQueryRuns_js_1.ScheduledQueryRuns
      });
      exports.Tax = (0, ResourceNamespace_js_1.resourceNamespace)("tax", {
        Calculations: Calculations_js_1.Calculations,
        Settings: Settings_js_1.Settings,
        Transactions: Transactions_js_2.Transactions
      });
      exports.Terminal = (0, ResourceNamespace_js_1.resourceNamespace)("terminal", {
        Configurations: Configurations_js_2.Configurations,
        ConnectionTokens: ConnectionTokens_js_1.ConnectionTokens,
        Locations: Locations_js_1.Locations,
        Readers: Readers_js_2.Readers
      });
      exports.TestHelpers = (0, ResourceNamespace_js_1.resourceNamespace)("testHelpers", {
        Customers: Customers_js_1.Customers,
        Refunds: Refunds_js_1.Refunds,
        TestClocks: TestClocks_js_1.TestClocks,
        Issuing: (0, ResourceNamespace_js_1.resourceNamespace)("issuing", { Cards: Cards_js_1.Cards }),
        Terminal: (0, ResourceNamespace_js_1.resourceNamespace)("terminal", {
          Readers: Readers_js_1.Readers
        }),
        Treasury: (0, ResourceNamespace_js_1.resourceNamespace)("treasury", {
          InboundTransfers: InboundTransfers_js_1.InboundTransfers,
          OutboundPayments: OutboundPayments_js_1.OutboundPayments,
          OutboundTransfers: OutboundTransfers_js_1.OutboundTransfers,
          ReceivedCredits: ReceivedCredits_js_1.ReceivedCredits,
          ReceivedDebits: ReceivedDebits_js_1.ReceivedDebits
        })
      });
      exports.Treasury = (0, ResourceNamespace_js_1.resourceNamespace)("treasury", {
        CreditReversals: CreditReversals_js_1.CreditReversals,
        DebitReversals: DebitReversals_js_1.DebitReversals,
        FinancialAccounts: FinancialAccounts_js_1.FinancialAccounts,
        InboundTransfers: InboundTransfers_js_2.InboundTransfers,
        OutboundPayments: OutboundPayments_js_2.OutboundPayments,
        OutboundTransfers: OutboundTransfers_js_2.OutboundTransfers,
        ReceivedCredits: ReceivedCredits_js_2.ReceivedCredits,
        ReceivedDebits: ReceivedDebits_js_2.ReceivedDebits,
        TransactionEntries: TransactionEntries_js_1.TransactionEntries,
        Transactions: Transactions_js_3.Transactions
      });
    }
  });

  // node_modules/stripe/cjs/RequestSender.js
  var require_RequestSender = __commonJS({
    "node_modules/stripe/cjs/RequestSender.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RequestSender = void 0;
      var Error_js_1 = require_Error();
      var utils_js_1 = require_utils2();
      var HttpClient_js_1 = require_HttpClient();
      var MAX_RETRY_AFTER_WAIT = 60;
      var RequestSender = class _RequestSender {
        constructor(stripe2, maxBufferedRequestMetric) {
          this._stripe = stripe2;
          this._maxBufferedRequestMetric = maxBufferedRequestMetric;
        }
        _addHeadersDirectlyToObject(obj, headers) {
          obj.requestId = headers["request-id"];
          obj.stripeAccount = obj.stripeAccount || headers["stripe-account"];
          obj.apiVersion = obj.apiVersion || headers["stripe-version"];
          obj.idempotencyKey = obj.idempotencyKey || headers["idempotency-key"];
        }
        _makeResponseEvent(requestEvent, statusCode, headers) {
          const requestEndTime = Date.now();
          const requestDurationMs = requestEndTime - requestEvent.request_start_time;
          return (0, utils_js_1.removeNullish)({
            api_version: headers["stripe-version"],
            account: headers["stripe-account"],
            idempotency_key: headers["idempotency-key"],
            method: requestEvent.method,
            path: requestEvent.path,
            status: statusCode,
            request_id: this._getRequestId(headers),
            elapsed: requestDurationMs,
            request_start_time: requestEvent.request_start_time,
            request_end_time: requestEndTime
          });
        }
        _getRequestId(headers) {
          return headers["request-id"];
        }
        /**
         * Used by methods with spec.streaming === true. For these methods, we do not
         * buffer successful responses into memory or do parse them into stripe
         * objects, we delegate that all of that to the user and pass back the raw
         * http.Response object to the callback.
         *
         * (Unsuccessful responses shouldn't make it here, they should
         * still be buffered/parsed and handled by _jsonResponseHandler -- see
         * makeRequest)
         */
        _streamingResponseHandler(requestEvent, callback) {
          return (res) => {
            const headers = res.getHeaders();
            const streamCompleteCallback = () => {
              const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
              this._stripe._emitter.emit("response", responseEvent);
              this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed);
            };
            const stream = res.toStream(streamCompleteCallback);
            this._addHeadersDirectlyToObject(stream, headers);
            return callback(null, stream);
          };
        }
        /**
         * Default handler for Stripe responses. Buffers the response into memory,
         * parses the JSON and returns it (i.e. passes it to the callback) if there
         * is no "error" field. Otherwise constructs/passes an appropriate Error.
         */
        _jsonResponseHandler(requestEvent, callback) {
          return (res) => {
            const headers = res.getHeaders();
            const requestId = this._getRequestId(headers);
            const statusCode = res.getStatusCode();
            const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
            this._stripe._emitter.emit("response", responseEvent);
            res.toJSON().then((jsonResponse) => {
              if (jsonResponse.error) {
                let err;
                if (typeof jsonResponse.error === "string") {
                  jsonResponse.error = {
                    type: jsonResponse.error,
                    message: jsonResponse.error_description
                  };
                }
                jsonResponse.error.headers = headers;
                jsonResponse.error.statusCode = statusCode;
                jsonResponse.error.requestId = requestId;
                if (statusCode === 401) {
                  err = new Error_js_1.StripeAuthenticationError(jsonResponse.error);
                } else if (statusCode === 403) {
                  err = new Error_js_1.StripePermissionError(jsonResponse.error);
                } else if (statusCode === 429) {
                  err = new Error_js_1.StripeRateLimitError(jsonResponse.error);
                } else {
                  err = Error_js_1.StripeError.generate(jsonResponse.error);
                }
                throw err;
              }
              return jsonResponse;
            }, (e) => {
              throw new Error_js_1.StripeAPIError({
                message: "Invalid JSON received from the Stripe API",
                exception: e,
                requestId: headers["request-id"]
              });
            }).then((jsonResponse) => {
              this._recordRequestMetrics(requestId, responseEvent.elapsed);
              const rawResponse = res.getRawResponse();
              this._addHeadersDirectlyToObject(rawResponse, headers);
              Object.defineProperty(jsonResponse, "lastResponse", {
                enumerable: false,
                writable: false,
                value: rawResponse
              });
              callback(null, jsonResponse);
            }, (e) => callback(e, null));
          };
        }
        static _generateConnectionErrorMessage(requestRetries) {
          return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ""}`;
        }
        // For more on when and how to retry API requests, see https://stripe.com/docs/error-handling#safely-retrying-requests-with-idempotency
        static _shouldRetry(res, numRetries, maxRetries, error) {
          if (error && numRetries === 0 && HttpClient_js_1.HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) {
            return true;
          }
          if (numRetries >= maxRetries) {
            return false;
          }
          if (!res) {
            return true;
          }
          if (res.getHeaders()["stripe-should-retry"] === "false") {
            return false;
          }
          if (res.getHeaders()["stripe-should-retry"] === "true") {
            return true;
          }
          if (res.getStatusCode() === 409) {
            return true;
          }
          if (res.getStatusCode() >= 500) {
            return true;
          }
          return false;
        }
        _getSleepTimeInMS(numRetries, retryAfter = null) {
          const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
          const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
          let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(numRetries - 1, 2), maxNetworkRetryDelay);
          sleepSeconds *= 0.5 * (1 + Math.random());
          sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
          if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
            sleepSeconds = Math.max(sleepSeconds, retryAfter);
          }
          return sleepSeconds * 1e3;
        }
        // Max retries can be set on a per request basis. Favor those over the global setting
        _getMaxNetworkRetries(settings = {}) {
          return settings.maxNetworkRetries && Number.isInteger(settings.maxNetworkRetries) ? settings.maxNetworkRetries : this._stripe.getMaxNetworkRetries();
        }
        _defaultIdempotencyKey(method, settings) {
          const maxRetries = this._getMaxNetworkRetries(settings);
          if (method === "POST" && maxRetries > 0) {
            return `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
          }
          return null;
        }
        _makeHeaders(auth, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings) {
          const defaultHeaders = {
            // Use specified auth token or use default from this stripe instance:
            Authorization: auth ? `Bearer ${auth}` : this._stripe.getApiField("auth"),
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": this._getUserAgentString(),
            "X-Stripe-Client-User-Agent": clientUserAgent,
            "X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
            "Stripe-Version": apiVersion,
            "Stripe-Account": this._stripe.getApiField("stripeAccount"),
            "Idempotency-Key": this._defaultIdempotencyKey(method, userSuppliedSettings)
          };
          const methodHasPayload = method == "POST" || method == "PUT" || method == "PATCH";
          if (methodHasPayload || contentLength) {
            if (!methodHasPayload) {
              (0, utils_js_1.emitWarning)(`${method} method had non-zero contentLength but no payload is expected for this verb`);
            }
            defaultHeaders["Content-Length"] = contentLength;
          }
          return Object.assign(
            (0, utils_js_1.removeNullish)(defaultHeaders),
            // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
            (0, utils_js_1.normalizeHeaders)(userSuppliedHeaders)
          );
        }
        _getUserAgentString() {
          const packageVersion = this._stripe.getConstant("PACKAGE_VERSION");
          const appInfo = this._stripe._appInfo ? this._stripe.getAppInfoAsString() : "";
          return `Stripe/v1 NodeBindings/${packageVersion} ${appInfo}`.trim();
        }
        _getTelemetryHeader() {
          if (this._stripe.getTelemetryEnabled() && this._stripe._prevRequestMetrics.length > 0) {
            const metrics = this._stripe._prevRequestMetrics.shift();
            return JSON.stringify({
              last_request_metrics: metrics
            });
          }
        }
        _recordRequestMetrics(requestId, requestDurationMs) {
          if (this._stripe.getTelemetryEnabled() && requestId) {
            if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) {
              (0, utils_js_1.emitWarning)("Request metrics buffer is full, dropping telemetry message.");
            } else {
              this._stripe._prevRequestMetrics.push({
                request_id: requestId,
                request_duration_ms: requestDurationMs
              });
            }
          }
        }
        _request(method, host, path, data, auth, options = {}, callback, requestDataProcessor = null) {
          let requestData;
          const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter) => {
            return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
          };
          const makeRequest = (apiVersion, headers, numRetries) => {
            const timeout = options.settings && options.settings.timeout && Number.isInteger(options.settings.timeout) && options.settings.timeout >= 0 ? options.settings.timeout : this._stripe.getApiField("timeout");
            const req = this._stripe.getApiField("httpClient").makeRequest(host || this._stripe.getApiField("host"), this._stripe.getApiField("port"), path, method, headers, requestData, this._stripe.getApiField("protocol"), timeout);
            const requestStartTime = Date.now();
            const requestEvent = (0, utils_js_1.removeNullish)({
              api_version: apiVersion,
              account: headers["Stripe-Account"],
              idempotency_key: headers["Idempotency-Key"],
              method,
              path,
              request_start_time: requestStartTime
            });
            const requestRetries = numRetries || 0;
            const maxRetries = this._getMaxNetworkRetries(options.settings || {});
            this._stripe._emitter.emit("request", requestEvent);
            req.then((res) => {
              if (_RequestSender._shouldRetry(res, requestRetries, maxRetries)) {
                return retryRequest(
                  makeRequest,
                  apiVersion,
                  headers,
                  requestRetries,
                  // @ts-ignore
                  res.getHeaders()["retry-after"]
                );
              } else if (options.streaming && res.getStatusCode() < 400) {
                return this._streamingResponseHandler(requestEvent, callback)(res);
              } else {
                return this._jsonResponseHandler(requestEvent, callback)(res);
              }
            }).catch((error) => {
              if (_RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) {
                return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
              } else {
                const isTimeoutError = error.code && error.code === HttpClient_js_1.HttpClient.TIMEOUT_ERROR_CODE;
                return callback(new Error_js_1.StripeConnectionError({
                  message: isTimeoutError ? `Request aborted due to timeout being reached (${timeout}ms)` : _RequestSender._generateConnectionErrorMessage(requestRetries),
                  // @ts-ignore
                  detail: error
                }));
              }
            });
          };
          const prepareAndMakeRequest = (error, data2) => {
            if (error) {
              return callback(error);
            }
            requestData = data2;
            this._stripe.getClientUserAgent((clientUserAgent) => {
              var _a, _b;
              const apiVersion = this._stripe.getApiField("version");
              const headers = this._makeHeaders(auth, requestData.length, apiVersion, clientUserAgent, method, (_a = options.headers) !== null && _a !== void 0 ? _a : null, (_b = options.settings) !== null && _b !== void 0 ? _b : {});
              makeRequest(apiVersion, headers, 0);
            });
          };
          if (requestDataProcessor) {
            requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
          } else {
            prepareAndMakeRequest(null, (0, utils_js_1.stringifyRequestData)(data || {}));
          }
        }
      };
      exports.RequestSender = RequestSender;
    }
  });

  // node_modules/stripe/cjs/Webhooks.js
  var require_Webhooks = __commonJS({
    "node_modules/stripe/cjs/Webhooks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createWebhooks = void 0;
      var Error_js_1 = require_Error();
      var CryptoProvider_js_1 = require_CryptoProvider();
      function createWebhooks(platformFunctions) {
        const Webhook = {
          DEFAULT_TOLERANCE: 300,
          // @ts-ignore
          signature: null,
          constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            try {
              this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            } catch (e) {
              if (e instanceof CryptoProvider_js_1.CryptoProviderOnlySupportsAsyncError) {
                e.message += "\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`";
              }
              throw e;
            }
            const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
            return jsonPayload;
          },
          async constructEventAsync(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
            return jsonPayload;
          },
          /**
           * Generates a header to be used for webhook mocking
           *
           * @typedef {object} opts
           * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
           * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
           * @property {string} secret - Stripe webhook secret 'whsec_...'
           * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
           * @property {string} signature - Computed webhook signature
           * @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
           */
          generateTestHeaderString: function(opts) {
            if (!opts) {
              throw new Error_js_1.StripeError({
                message: "Options are required"
              });
            }
            opts.timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1e3);
            opts.scheme = opts.scheme || signature.EXPECTED_SCHEME;
            opts.cryptoProvider = opts.cryptoProvider || getCryptoProvider();
            opts.signature = opts.signature || opts.cryptoProvider.computeHMACSignature(opts.timestamp + "." + opts.payload, opts.secret);
            const generatedHeader = [
              "t=" + opts.timestamp,
              opts.scheme + "=" + opts.signature
            ].join(",");
            return generatedHeader;
          }
        };
        const signature = {
          EXPECTED_SCHEME: "v1",
          verifyHeader(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret);
            validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
            return true;
          },
          async verifyHeaderAsync(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret);
            return validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
          }
        };
        function makeHMACContent(payload, details) {
          return `${details.timestamp}.${payload}`;
        }
        function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
          if (!encodedPayload) {
            throw new Error_js_1.StripeSignatureVerificationError(encodedHeader, encodedPayload, {
              message: "No webhook payload was provided."
            });
          }
          const suspectPayloadType = typeof encodedPayload != "string" && !(encodedPayload instanceof Uint8Array);
          const textDecoder = new TextDecoder("utf8");
          const decodedPayload = encodedPayload instanceof Uint8Array ? textDecoder.decode(encodedPayload) : encodedPayload;
          if (Array.isArray(encodedHeader)) {
            throw new Error("Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.");
          }
          if (encodedHeader == null || encodedHeader == "") {
            throw new Error_js_1.StripeSignatureVerificationError(encodedHeader, encodedPayload, {
              message: "No stripe-signature header value was provided."
            });
          }
          const decodedHeader = encodedHeader instanceof Uint8Array ? textDecoder.decode(encodedHeader) : encodedHeader;
          const details = parseHeader(decodedHeader, expectedScheme);
          if (!details || details.timestamp === -1) {
            throw new Error_js_1.StripeSignatureVerificationError(decodedHeader, decodedPayload, {
              message: "Unable to extract timestamp and signatures from header"
            });
          }
          if (!details.signatures.length) {
            throw new Error_js_1.StripeSignatureVerificationError(decodedHeader, decodedPayload, {
              message: "No signatures found with expected scheme"
            });
          }
          return {
            decodedPayload,
            decodedHeader,
            details,
            suspectPayloadType
          };
        }
        function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt) {
          const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
          const docsLocation = "\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://github.com/stripe/stripe-node#webhook-signing";
          const whitespaceMessage = secretContainsWhitespace ? "\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value" : "";
          if (!signatureFound) {
            if (suspectPayloadType) {
              throw new Error_js_1.StripeSignatureVerificationError(header, payload, {
                message: "Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. \nSignature verification is impossible without access to the original signed material. \n" + docsLocation + "\n" + whitespaceMessage
              });
            }
            throw new Error_js_1.StripeSignatureVerificationError(header, payload, {
              message: "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? \n" + docsLocation + "\n" + whitespaceMessage
            });
          }
          const timestampAge = Math.floor((typeof receivedAt === "number" ? receivedAt : Date.now()) / 1e3) - details.timestamp;
          if (tolerance > 0 && timestampAge > tolerance) {
            throw new Error_js_1.StripeSignatureVerificationError(header, payload, {
              message: "Timestamp outside the tolerance zone"
            });
          }
          return true;
        }
        function parseHeader(header, scheme) {
          if (typeof header !== "string") {
            return null;
          }
          return header.split(",").reduce((accum, item) => {
            const kv = item.split("=");
            if (kv[0] === "t") {
              accum.timestamp = parseInt(kv[1], 10);
            }
            if (kv[0] === scheme) {
              accum.signatures.push(kv[1]);
            }
            return accum;
          }, {
            timestamp: -1,
            signatures: []
          });
        }
        let webhooksCryptoProviderInstance = null;
        function getCryptoProvider() {
          if (!webhooksCryptoProviderInstance) {
            webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
          }
          return webhooksCryptoProviderInstance;
        }
        Webhook.signature = signature;
        return Webhook;
      }
      exports.createWebhooks = createWebhooks;
    }
  });

  // node_modules/stripe/cjs/stripe.core.js
  var require_stripe_core = __commonJS({
    "node_modules/stripe/cjs/stripe.core.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createStripe = void 0;
      var _Error = require_Error();
      var apiVersion = require_apiVersion();
      var resources = require_resources();
      var HttpClient_js_1 = require_HttpClient();
      var utils_js_1 = require_utils2();
      var CryptoProvider_js_1 = require_CryptoProvider();
      var RequestSender_js_1 = require_RequestSender();
      var StripeResource_js_1 = require_StripeResource();
      var Webhooks_js_1 = require_Webhooks();
      var DEFAULT_HOST = "api.stripe.com";
      var DEFAULT_PORT = "443";
      var DEFAULT_BASE_PATH = "/v1/";
      var DEFAULT_API_VERSION = apiVersion.ApiVersion;
      var DEFAULT_TIMEOUT = 8e4;
      var MAX_NETWORK_RETRY_DELAY_SEC = 2;
      var INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
      var APP_INFO_PROPERTIES = ["name", "version", "url", "partner_id"];
      var ALLOWED_CONFIG_PROPERTIES = [
        "apiVersion",
        "typescript",
        "maxNetworkRetries",
        "httpAgent",
        "httpClient",
        "timeout",
        "host",
        "port",
        "protocol",
        "telemetry",
        "appInfo",
        "stripeAccount"
      ];
      var defaultRequestSenderFactory = (stripe2) => new RequestSender_js_1.RequestSender(stripe2, StripeResource_js_1.StripeResource.MAX_BUFFERED_REQUEST_METRICS);
      function createStripe(platformFunctions, requestSender = defaultRequestSenderFactory) {
        Stripe2.PACKAGE_VERSION = "12.16.0";
        Stripe2.USER_AGENT = Object.assign({ bindings_version: Stripe2.PACKAGE_VERSION, lang: "node", publisher: "stripe", uname: null, typescript: false }, (0, utils_js_1.determineProcessUserAgentProperties)());
        Stripe2.StripeResource = StripeResource_js_1.StripeResource;
        Stripe2.resources = resources;
        Stripe2.HttpClient = HttpClient_js_1.HttpClient;
        Stripe2.HttpClientResponse = HttpClient_js_1.HttpClientResponse;
        Stripe2.CryptoProvider = CryptoProvider_js_1.CryptoProvider;
        function Stripe2(key, config = {}) {
          if (!(this instanceof Stripe2)) {
            return new Stripe2(key, config);
          }
          const props = this._getPropsFromConfig(config);
          this._platformFunctions = platformFunctions;
          Object.defineProperty(this, "_emitter", {
            value: this._platformFunctions.createEmitter(),
            enumerable: false,
            configurable: false,
            writable: false
          });
          this.VERSION = Stripe2.PACKAGE_VERSION;
          this.on = this._emitter.on.bind(this._emitter);
          this.once = this._emitter.once.bind(this._emitter);
          this.off = this._emitter.removeListener.bind(this._emitter);
          if (props.protocol && props.protocol !== "https" && (!props.host || /\.stripe\.com$/.test(props.host))) {
            throw new Error("The `https` protocol must be used when sending requests to `*.stripe.com`");
          }
          const agent = props.httpAgent || null;
          this._api = {
            auth: null,
            host: props.host || DEFAULT_HOST,
            port: props.port || DEFAULT_PORT,
            protocol: props.protocol || "https",
            basePath: DEFAULT_BASE_PATH,
            version: props.apiVersion || DEFAULT_API_VERSION,
            timeout: (0, utils_js_1.validateInteger)("timeout", props.timeout, DEFAULT_TIMEOUT),
            maxNetworkRetries: (0, utils_js_1.validateInteger)("maxNetworkRetries", props.maxNetworkRetries, 0),
            agent,
            httpClient: props.httpClient || (agent ? this._platformFunctions.createNodeHttpClient(agent) : this._platformFunctions.createDefaultHttpClient()),
            dev: false,
            stripeAccount: props.stripeAccount || null
          };
          const typescript = props.typescript || false;
          if (typescript !== Stripe2.USER_AGENT.typescript) {
            Stripe2.USER_AGENT.typescript = typescript;
          }
          if (props.appInfo) {
            this._setAppInfo(props.appInfo);
          }
          this._prepResources();
          this._setApiKey(key);
          this.errors = _Error;
          this.webhooks = (0, Webhooks_js_1.createWebhooks)(platformFunctions);
          this._prevRequestMetrics = [];
          this._enableTelemetry = props.telemetry !== false;
          this._requestSender = requestSender(this);
          this.StripeResource = Stripe2.StripeResource;
        }
        Stripe2.errors = _Error;
        Stripe2.webhooks = Webhooks_js_1.createWebhooks;
        Stripe2.createNodeHttpClient = platformFunctions.createNodeHttpClient;
        Stripe2.createFetchHttpClient = platformFunctions.createFetchHttpClient;
        Stripe2.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
        Stripe2.createSubtleCryptoProvider = platformFunctions.createSubtleCryptoProvider;
        Stripe2.prototype = {
          // Properties are set in the constructor above
          _appInfo: void 0,
          on: null,
          off: null,
          once: null,
          VERSION: null,
          StripeResource: null,
          webhooks: null,
          errors: null,
          _api: null,
          _prevRequestMetrics: null,
          _emitter: null,
          _enableTelemetry: null,
          _requestSender: null,
          _platformFunctions: null,
          /**
           * @private
           */
          _setApiKey(key) {
            if (key) {
              this._setApiField("auth", `Bearer ${key}`);
            }
          },
          /**
           * @private
           * This may be removed in the future.
           */
          _setAppInfo(info) {
            if (info && typeof info !== "object") {
              throw new Error("AppInfo must be an object.");
            }
            if (info && !info.name) {
              throw new Error("AppInfo.name is required");
            }
            info = info || {};
            this._appInfo = APP_INFO_PROPERTIES.reduce(
              (accum, prop) => {
                if (typeof info[prop] == "string") {
                  accum = accum || {};
                  accum[prop] = info[prop];
                }
                return accum;
              },
              // @ts-ignore
              void 0
            );
          },
          /**
           * @private
           * This may be removed in the future.
           */
          _setApiField(key, value) {
            this._api[key] = value;
          },
          /**
           * @private
           * Please open or upvote an issue at github.com/stripe/stripe-node
           * if you use this, detailing your use-case.
           *
           * It may be deprecated and removed in the future.
           */
          getApiField(key) {
            return this._api[key];
          },
          setClientId(clientId) {
            this._clientId = clientId;
          },
          getClientId() {
            return this._clientId;
          },
          /**
           * @private
           * Please open or upvote an issue at github.com/stripe/stripe-node
           * if you use this, detailing your use-case.
           *
           * It may be deprecated and removed in the future.
           */
          getConstant: (c) => {
            switch (c) {
              case "DEFAULT_HOST":
                return DEFAULT_HOST;
              case "DEFAULT_PORT":
                return DEFAULT_PORT;
              case "DEFAULT_BASE_PATH":
                return DEFAULT_BASE_PATH;
              case "DEFAULT_API_VERSION":
                return DEFAULT_API_VERSION;
              case "DEFAULT_TIMEOUT":
                return DEFAULT_TIMEOUT;
              case "MAX_NETWORK_RETRY_DELAY_SEC":
                return MAX_NETWORK_RETRY_DELAY_SEC;
              case "INITIAL_NETWORK_RETRY_DELAY_SEC":
                return INITIAL_NETWORK_RETRY_DELAY_SEC;
            }
            return Stripe2[c];
          },
          getMaxNetworkRetries() {
            return this.getApiField("maxNetworkRetries");
          },
          /**
           * @private
           * This may be removed in the future.
           */
          _setApiNumberField(prop, n, defaultVal) {
            const val = (0, utils_js_1.validateInteger)(prop, n, defaultVal);
            this._setApiField(prop, val);
          },
          getMaxNetworkRetryDelay() {
            return MAX_NETWORK_RETRY_DELAY_SEC;
          },
          getInitialNetworkRetryDelay() {
            return INITIAL_NETWORK_RETRY_DELAY_SEC;
          },
          /**
           * @private
           * Please open or upvote an issue at github.com/stripe/stripe-node
           * if you use this, detailing your use-case.
           *
           * It may be deprecated and removed in the future.
           *
           * Gets a JSON version of a User-Agent and uses a cached version for a slight
           * speed advantage.
           */
          getClientUserAgent(cb) {
            return this.getClientUserAgentSeeded(Stripe2.USER_AGENT, cb);
          },
          /**
           * @private
           * Please open or upvote an issue at github.com/stripe/stripe-node
           * if you use this, detailing your use-case.
           *
           * It may be deprecated and removed in the future.
           *
           * Gets a JSON version of a User-Agent by encoding a seeded object and
           * fetching a uname from the system.
           */
          getClientUserAgentSeeded(seed, cb) {
            this._platformFunctions.getUname().then((uname) => {
              var _a;
              const userAgent = {};
              for (const field in seed) {
                userAgent[field] = encodeURIComponent((_a = seed[field]) !== null && _a !== void 0 ? _a : "null");
              }
              userAgent.uname = encodeURIComponent(uname || "UNKNOWN");
              const client = this.getApiField("httpClient");
              if (client) {
                userAgent.httplib = encodeURIComponent(client.getClientName());
              }
              if (this._appInfo) {
                userAgent.application = this._appInfo;
              }
              cb(JSON.stringify(userAgent));
            });
          },
          /**
           * @private
           * Please open or upvote an issue at github.com/stripe/stripe-node
           * if you use this, detailing your use-case.
           *
           * It may be deprecated and removed in the future.
           */
          getAppInfoAsString() {
            if (!this._appInfo) {
              return "";
            }
            let formatted = this._appInfo.name;
            if (this._appInfo.version) {
              formatted += `/${this._appInfo.version}`;
            }
            if (this._appInfo.url) {
              formatted += ` (${this._appInfo.url})`;
            }
            return formatted;
          },
          getTelemetryEnabled() {
            return this._enableTelemetry;
          },
          /**
           * @private
           * This may be removed in the future.
           */
          _prepResources() {
            for (const name in resources) {
              this[(0, utils_js_1.pascalToCamelCase)(name)] = new resources[name](this);
            }
          },
          /**
           * @private
           * This may be removed in the future.
           */
          _getPropsFromConfig(config) {
            if (!config) {
              return {};
            }
            const isString2 = typeof config === "string";
            const isObject2 = config === Object(config) && !Array.isArray(config);
            if (!isObject2 && !isString2) {
              throw new Error("Config must either be an object or a string");
            }
            if (isString2) {
              return {
                apiVersion: config
              };
            }
            const values = Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value));
            if (values.length > 0) {
              throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(", ")}`);
            }
            return config;
          }
        };
        return Stripe2;
      }
      exports.createStripe = createStripe;
    }
  });

  // node_modules/stripe/cjs/stripe.cjs.worker.js
  var require_stripe_cjs_worker = __commonJS({
    "node_modules/stripe/cjs/stripe.cjs.worker.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var WebPlatformFunctions_js_1 = require_WebPlatformFunctions();
      var stripe_core_js_1 = require_stripe_core();
      var Stripe2 = (0, stripe_core_js_1.createStripe)(new WebPlatformFunctions_js_1.WebPlatformFunctions());
      module.exports = Stripe2;
      module.exports.Stripe = Stripe2;
      module.exports.default = Stripe2;
    }
  });

  // node_modules/axios/lib/helpers/bind.js
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // node_modules/axios/lib/utils.js
  var { toString } = Object.prototype;
  var { getPrototypeOf } = Object;
  var kindOf = ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  var kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  var typeOfTest = (type) => (thing) => typeof thing === type;
  var { isArray } = Array;
  var isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  var isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  var isString = typeOfTest("string");
  var isFunction = typeOfTest("function");
  var isNumber = typeOfTest("number");
  var isObject = (thing) => thing !== null && typeof thing === "object";
  var isBoolean = (thing) => thing === true || thing === false;
  var isPlainObject = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype3 = getPrototypeOf(val);
    return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };
  var isDate = kindOfTest("Date");
  var isFile = kindOfTest("File");
  var isBlob = kindOfTest("Blob");
  var isFileList = kindOfTest("FileList");
  var isStream = (val) => isObject(val) && isFunction(val.pipe);
  var isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  };
  var isURLSearchParams = kindOfTest("URLSearchParams");
  var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  var _global = (() => {
    if (typeof globalThis !== "undefined")
      return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  var isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }
  var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  };
  var stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  var inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  var toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
      return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  var endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  var toArray = (thing) => {
    if (!thing)
      return null;
    if (isArray(thing))
      return thing;
    let i = thing.length;
    if (!isNumber(i))
      return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };
  var isTypedArray = ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  var forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  var matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  var isHTMLForm = kindOfTest("HTMLFormElement");
  var toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  var isRegExp = kindOfTest("RegExp");
  var reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      if (reducer(descriptor, name, obj) !== false) {
        reducedDescriptors[name] = descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  var freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value))
        return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  var toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  var noop = () => {
  };
  var toFiniteNumber = (value, defaultValue) => {
    value = +value;
    return Number.isFinite(value) ? value : defaultValue;
  };
  var ALPHA = "abcdefghijklmnopqrstuvwxyz";
  var DIGIT = "0123456789";
  var ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  var toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  var isAsyncFn = kindOfTest("AsyncFunction");
  var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  var utils_default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };

  // node_modules/axios/lib/core/AxiosError.js
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  utils_default.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils_default.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  var prototype = AxiosError.prototype;
  var descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype);
    utils_default.toFlatObject(error, axiosError, function filter2(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  var AxiosError_default = AxiosError;

  // node_modules/axios/lib/helpers/null.js
  var null_default = null;

  // node_modules/axios/lib/helpers/toFormData.js
  function isVisitable(thing) {
    return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
  }
  function removeBrackets(key) {
    return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils_default.isArray(arr) && !arr.some(isVisitable);
  }
  var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils_default.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new (null_default || FormData)();
    options = utils_default.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
    if (!utils_default.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null)
        return "";
      if (utils_default.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils_default.isBlob(value)) {
        throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
      }
      if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils_default.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils_default.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils_default.isUndefined(value))
        return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils_default.forEach(value, function each(el, key) {
        const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils_default.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils_default.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  var toFormData_default = toFormData;

  // node_modules/axios/lib/helpers/AxiosURLSearchParams.js
  function encode(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData_default(params, this, options);
  }
  var prototype2 = AxiosURLSearchParams.prototype;
  prototype2.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype2.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode);
    } : encode;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  var AxiosURLSearchParams_default = AxiosURLSearchParams;

  // node_modules/axios/lib/helpers/buildURL.js
  function encode2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode2;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }

  // node_modules/axios/lib/core/InterceptorManager.js
  var InterceptorManager = class {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils_default.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  };
  var InterceptorManager_default = InterceptorManager;

  // node_modules/axios/lib/defaults/transitional.js
  var transitional_default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  // node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
  var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

  // node_modules/axios/lib/platform/browser/classes/FormData.js
  var FormData_default = typeof FormData !== "undefined" ? FormData : null;

  // node_modules/axios/lib/platform/browser/classes/Blob.js
  var Blob_default = typeof Blob !== "undefined" ? Blob : null;

  // node_modules/axios/lib/platform/browser/index.js
  var isStandardBrowserEnv = (() => {
    let product;
    if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  })();
  var isStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  var browser_default = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams_default,
      FormData: FormData_default,
      Blob: Blob_default
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };

  // node_modules/axios/lib/helpers/toURLEncodedForm.js
  function toURLEncodedForm(data, options) {
    return toFormData_default(data, new browser_default.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (browser_default.isNode && utils_default.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  // node_modules/axios/lib/helpers/formDataToJSON.js
  function parsePropPath(name) {
    return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils_default.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils_default.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils_default.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils_default.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
      const obj = {};
      utils_default.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  var formDataToJSON_default = formDataToJSON;

  // node_modules/axios/lib/defaults/index.js
  var DEFAULT_CONTENT_TYPE = {
    "Content-Type": void 0
  };
  function stringifySafely(rawValue, parser, encoder) {
    if (utils_default.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils_default.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults = {
    transitional: transitional_default,
    adapter: ["xhr", "http"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils_default.isObject(data);
      if (isObjectPayload && utils_default.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils_default.isFormData(data);
      if (isFormData2) {
        if (!hasJSONContentType) {
          return data;
        }
        return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
      }
      if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data)) {
        return data;
      }
      if (utils_default.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils_default.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData_default(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: browser_default.classes.FormData,
      Blob: browser_default.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    }
  };
  utils_default.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults.headers[method] = utils_default.merge(DEFAULT_CONTENT_TYPE);
  });
  var defaults_default = defaults;

  // node_modules/axios/lib/helpers/parseHeaders.js
  var ignoreDuplicateOf = utils_default.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  var parseHeaders_default = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };

  // node_modules/axios/lib/core/AxiosHeaders.js
  var $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils_default.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils_default.isString(value))
      return;
    if (utils_default.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils_default.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils_default.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  var AxiosHeaders = class {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils_default.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders_default(header), valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils_default.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils_default.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils_default.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils_default.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils_default.forEach(this, (value, header) => {
        const key = utils_default.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils_default.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype3 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype3, _header);
          accessors[lHeader] = true;
        }
      }
      utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils_default.freezeMethods(AxiosHeaders.prototype);
  utils_default.freezeMethods(AxiosHeaders);
  var AxiosHeaders_default = AxiosHeaders;

  // node_modules/axios/lib/core/transformData.js
  function transformData(fns, response) {
    const config = this || defaults_default;
    const context = response || config;
    const headers = AxiosHeaders_default.from(context.headers);
    let data = context.data;
    utils_default.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }

  // node_modules/axios/lib/cancel/isCancel.js
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }

  // node_modules/axios/lib/cancel/CanceledError.js
  function CanceledError(message, config, request) {
    AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  utils_default.inherits(CanceledError, AxiosError_default, {
    __CANCEL__: true
  });
  var CanceledError_default = CanceledError;

  // node_modules/axios/lib/core/settle.js
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_default(
        "Request failed with status code " + response.status,
        [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }

  // node_modules/axios/lib/helpers/cookies.js
  var cookies_default = browser_default.isStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          const cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils_default.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils_default.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils_default.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );

  // node_modules/axios/lib/helpers/isAbsoluteURL.js
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  // node_modules/axios/lib/helpers/combineURLs.js
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }

  // node_modules/axios/lib/core/buildFullPath.js
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  // node_modules/axios/lib/helpers/isURLSameOrigin.js
  var isURLSameOrigin_default = browser_default.isStandardBrowserEnv ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv2() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement("a");
      let originURL;
      function resolveURL(url) {
        let href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv2() {
      return function isURLSameOrigin() {
        return true;
      };
    }()
  );

  // node_modules/axios/lib/helpers/parseProtocol.js
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }

  // node_modules/axios/lib/helpers/speedometer.js
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  var speedometer_default = speedometer;

  // node_modules/axios/lib/adapters/xhr.js
  function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = speedometer_default(50, 250);
    return (e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    };
  }
  var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  var xhr_default = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      let requestData = config.data;
      const requestHeaders = AxiosHeaders_default.from(config.headers).normalize();
      const responseType = config.responseType;
      let onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils_default.isFormData(requestData)) {
        if (browser_default.isStandardBrowserEnv || browser_default.isStandardBrowserWebWorkerEnv) {
          requestHeaders.setContentType(false);
        } else {
          requestHeaders.setContentType("multipart/form-data;", false);
        }
      }
      let request = new XMLHttpRequest();
      if (config.auth) {
        const username = config.auth.username || "";
        const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
      }
      const fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders_default.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = config.transitional || transitional_default;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError_default(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          config,
          request
        ));
        request = null;
      };
      if (browser_default.isStandardBrowserEnv) {
        const xsrfValue = (config.withCredentials || isURLSameOrigin_default(fullPath)) && config.xsrfCookieName && cookies_default.read(config.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils_default.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
      }
      if (config.cancelToken || config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(fullPath);
      if (protocol && browser_default.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    });
  };

  // node_modules/axios/lib/adapters/adapters.js
  var knownAdapters = {
    http: null_default,
    xhr: xhr_default
  };
  utils_default.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  var adapters_default = {
    getAdapter: (adapters) => {
      adapters = utils_default.isArray(adapters) ? adapters : [adapters];
      const { length } = adapters;
      let nameOrAdapter;
      let adapter;
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        if (adapter = utils_default.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
          break;
        }
      }
      if (!adapter) {
        if (adapter === false) {
          throw new AxiosError_default(
            `Adapter ${nameOrAdapter} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          );
        }
        throw new Error(
          utils_default.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
        );
      }
      if (!utils_default.isFunction(adapter)) {
        throw new TypeError("adapter is not a function");
      }
      return adapter;
    },
    adapters: knownAdapters
  };

  // node_modules/axios/lib/core/dispatchRequest.js
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError_default(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders_default.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }

  // node_modules/axios/lib/core/mergeConfig.js
  var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? thing.toJSON() : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
        return utils_default.merge.call({ caseless }, target, source);
      } else if (utils_default.isPlainObject(source)) {
        return utils_default.merge({}, source);
      } else if (utils_default.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, caseless) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }

  // node_modules/axios/lib/env/data.js
  var VERSION = "1.4.0";

  // node_modules/axios/lib/helpers/validator.js
  var validators = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
    validators[type] = function validator(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
  });
  var deprecatedWarnings = {};
  validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError_default(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError_default.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator ? validator(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === void 0 || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
      }
    }
  }
  var validator_default = {
    assertOptions,
    validators
  };

  // node_modules/axios/lib/core/Axios.js
  var validators2 = validator_default.validators;
  var Axios = class {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_default(),
        response: new InterceptorManager_default()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional: transitional2, paramsSerializer, headers } = config;
      if (transitional2 !== void 0) {
        validator_default.assertOptions(transitional2, {
          silentJSONParsing: validators2.transitional(validators2.boolean),
          forcedJSONParsing: validators2.transitional(validators2.boolean),
          clarifyTimeoutError: validators2.transitional(validators2.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils_default.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator_default.assertOptions(paramsSerializer, {
            encode: validators2.function,
            serialize: validators2.function
          }, true);
        }
      }
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders;
      contextHeaders = headers && utils_default.merge(
        headers.common,
        headers[config.method]
      );
      contextHeaders && utils_default.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };
  utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  var Axios_default = Axios;

  // node_modules/axios/lib/cancel/CancelToken.js
  var CancelToken = class _CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners)
          return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError_default(message, config, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new _CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  };
  var CancelToken_default = CancelToken;

  // node_modules/axios/lib/helpers/spread.js
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  // node_modules/axios/lib/helpers/isAxiosError.js
  function isAxiosError(payload) {
    return utils_default.isObject(payload) && payload.isAxiosError === true;
  }

  // node_modules/axios/lib/helpers/HttpStatusCode.js
  var HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  var HttpStatusCode_default = HttpStatusCode;

  // node_modules/axios/lib/axios.js
  function createInstance(defaultConfig) {
    const context = new Axios_default(defaultConfig);
    const instance = bind(Axios_default.prototype.request, context);
    utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
    utils_default.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios = createInstance(defaults_default);
  axios.Axios = Axios_default;
  axios.CanceledError = CanceledError_default;
  axios.CancelToken = CancelToken_default;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData_default;
  axios.AxiosError = AxiosError_default;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders_default;
  axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.HttpStatusCode = HttpStatusCode_default;
  axios.default = axios;
  var axios_default = axios;

  // node_modules/axios/index.js
  var {
    Axios: Axios2,
    AxiosError: AxiosError2,
    CanceledError: CanceledError2,
    isCancel: isCancel2,
    CancelToken: CancelToken2,
    VERSION: VERSION2,
    all: all2,
    Cancel,
    isAxiosError: isAxiosError2,
    spread: spread2,
    toFormData: toFormData2,
    AxiosHeaders: AxiosHeaders2,
    HttpStatusCode: HttpStatusCode2,
    formToJSON,
    mergeConfig: mergeConfig2
  } = axios_default;

  // public/js/alerts.js
  var hideAlert = () => {
    const el = document.querySelector(".alert");
    if (el)
      el.parentElement.removeChild(el);
  };
  var showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 5e3);
  };

  // public/js/login.js
  var login = async (email, password) => {
    try {
      const res = await axios_default({
        method: "POST",
        url: "http://127.0.0.1:3000/api/v1/users/login",
        data: {
          email,
          password
        }
      });
      if (res.data.status === "success") {
        showAlert("success", "Logged in successfully!");
        window.setTimeout(() => {
          location.assign("/");
        }, 1e3);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };
  var logout = async () => {
    try {
      const res = await axios_default({
        method: "GET",
        url: "http://127.0.0.1:3000/api/v1/users/logout"
      });
      if (res.data.status === "success")
        location.reload(true);
    } catch (err) {
      showAlert("error", "Error logging out! Try again!");
    }
  };

  // public/js/mapbox.js
  var displayMap = (locations) => {
    mapboxgl.accessToken = "pk.eyJ1IjoidHJlZTcwMzczIiwiYSI6ImNsaDlqaGh0ODA1NzMzcG8ybXZwbDFxbmIifQ.HqnBKqBTZYM9xfPA1vBrYQ";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/tree70373/clh9m9h2f00cc01r51k3c3y7n",
      scrollZoom: false
      // center: [-118.24053835654612, 34.05295538538402],
      // zoom: 10,
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc) => {
      const el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker({
        element: el,
        anchor: "bottom"
      }).setLngLat(loc.coordinates).addTo(map);
      new mapboxgl.Popup({ offset: 30 }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
      bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 200,
        left: 100,
        right: 100
      }
    });
  };

  // public/js/updateSettings.js
  var updateSettings = async (data, type) => {
    try {
      const url = type === "password" ? "http://127.0.0.1:3000/api/v1/users/updateMyPassword" : "http://127.0.0.1:3000/api/v1/users/updateMe";
      const res = await axios_default({
        method: "PATCH",
        url,
        data
      });
      if (res.data.status === "success") {
        showAlert("success", `${type.toUpperCase()} updated successfully!`);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  // public/js/stripe.js
  var Stripe = require_stripe_cjs_worker();
  var stripe = Stripe(
    "pk_test_51N60JzCKQnZMBL36F2mHQmTiuK1jDJTFklP6REPVNSD4e5q5mAAXqHsDPwGnZQr0IJd4d82q7s5X7iokObb1Hmcs00p9tdsbOj"
  );
  var bookTour = async (tourId) => {
    try {
      const session = await axios_default(
        `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
      );
      window.location.assign(session.data.session.url);
    } catch (err) {
      console.log(err);
      showAlert("err", err);
    }
  };

  // public/js/index.js
  window.onbeforeunload = function() {
    window.scrollTo(0, 0);
  };
  var mapBox = document.getElementById("map");
  var loginForm = document.querySelector(".form--login");
  var logOutBtn = document.querySelector(".nav__el--logout");
  var userDataForm = document.querySelector(".form-user-data");
  var userPasswordForm = document.querySelector(".form-user-password");
  var bookBtn = document.getElementById("book-tour");
  if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
  }
  if (loginForm)
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      login(email, password);
    });
  if (logOutBtn)
    logOutBtn.addEventListener("click", logout);
  if (userDataForm)
    userDataForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = new FormData();
      form.append("name", document.getElementById("name").value);
      form.append("email", document.getElementById("email").value);
      form.append("photo", document.getElementById("photo").files[0]);
      updateSettings(form, "data");
    });
  if (userPasswordForm)
    userPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      document.querySelector(".btn--save--password").textContent = "Updating...";
      const passwordCurrent = document.getElementById("password-current").value;
      const password = document.getElementById("password").value;
      const passwordConfirm = document.getElementById("password-confirm").value;
      await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        "password"
      );
      document.querySelector(".btn--save--password").textContent = "Save password";
      document.getElementById("password-current").value = "";
      document.getElementById("password").value = "";
      document.getElementById("password-confirm").value = "";
    });
  if (bookBtn)
    bookBtn.addEventListener("click", (e) => {
      e.target.textContent = "Processing...";
      const { tourId } = e.target.dataset;
      bookTour(tourId);
    });
})();
