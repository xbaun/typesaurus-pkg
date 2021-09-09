'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          }
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.setupJestAfterEnv =
  exports.setCtx =
  exports.injectTestingAdaptor =
    void 0
const testing = __importStar(require('@firebase/rules-unit-testing'))
const app_1 = __importDefault(require('firebase/compat/app'))
const adaptor_1 = require('../adaptor')
const utils_1 = require('../adaptor/utils')
let currentCtx
/**
 * Injects @firebase/rules-unit-testing adaptod instead of firebase-admin and set the given
 * app to be used for Firestore operations.
 *
 * ```ts
 * import * as testing from '@firebase/rules-unit-testing'
 * import { injectTestingAdaptor } from 'typesaurus/testing'
 *
 * // To initialize and inject an admin app (with exclusive access to the DB):
 * injectTestingAdaptor(testing.initializeAdminApp({ projectId: 'project-id' }))
 *
 * // To initialize and inject a client app (with given authentication details):
 * injectTestingAdaptor(
 *   testing.initializeTestApp({
 *     projectId: 'project-id',
 *     auth: { uid: 'user-id' }
 *   })
 * )
 * // Load security rules:
 * await testing.loadFirestoreRules({
 *   projectId: 'project-id',
 *   rules: '' // Security rules string
 * })
 * ```
 *
 * @param ctx - The testing app instance
 */
function injectTestingAdaptor(ctx) {
  return __awaiter(this, void 0, void 0, function* () {
    setCtx(yield ctx)
    let firestore = currentCtx.firestore()
    if (!('getAll' in firestore)) {
      firestore = Object.assign(firestore, { getAll: utils_1.getAll })
    }
    ;(0, adaptor_1.injectAdaptor)(
      // TODO: Find a way to fix TS error:
      // @ts-ignore: @firebase/rules-unit-testing and firebase-admin use different types
      // for Firestore so I had to disable the error.
      () => firestore,
      {
        DocumentReference: app_1.default.firestore.DocumentReference,
        Timestamp: app_1.default.firestore.Timestamp,
        FieldPath: app_1.default.firestore.FieldPath,
        FieldValue: app_1.default.firestore.FieldValue
      }
    )
    // console.log('????????? 2')
  })
}
exports.injectTestingAdaptor = injectTestingAdaptor
/**
 * Sets the given app to be used for Firestore operations. Must be used after
 * calling `injectTestingAdaptor`.
 *
 * ```ts
 * import * as testing from '@firebase/rules-unit-testing'
 * import { injectTestingAdaptor, setApp } from 'typesaurus/testing'
 *
 * // Initialize as not authenticated:
 * injectTestingAdaptor(
 *   testing.initializeTestApp({
 *     projectId: 'project-id',
 *     auth: null
 *   })
 * )
 *
 * // Authenticate user with user-id as the id:
 * setApp(
 *   testing.initializeTestApp({
 *     projectId: 'project-id',
 *     auth: { user: 'user-id' }
 *   })
 * )
 * ```
 *
 * @param ctx - The testing context instance
 */
function setCtx(ctx) {
  currentCtx = ctx
}
exports.setCtx = setCtx
function setupJestAfterEnv(
  config,
  clb = (env) => env.unauthenticatedContext()
) {
  const testEnv = testing.initializeTestEnvironment(config)
  const adaptor = injectTestingAdaptor(testEnv.then(clb))
  const ti = it
  const ebircsed = describe
  let depth = 0
  global.describe = function (name, fn) {
    depth++
    ebircsed(name, () => {
      if (depth === 1) {
        afterAll(() => {
          testEnv.then((x) => x.cleanup())
        })
      }
      fn()
    })
    depth--
  }
  global.it = function (name, fn) {
    ti(
      name,
      fn === undefined
        ? undefined
        : fn.length > 0
        ? (done) => {
            adaptor.then(() => fn(done))
          }
        : () => adaptor.then(() => fn(undefined))
    )
  }
}
exports.setupJestAfterEnv = setupJestAfterEnv
//# sourceMappingURL=index.js.map
