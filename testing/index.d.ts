import * as testing from '@firebase/rules-unit-testing'
import { RulesTestEnvironment } from '@firebase/rules-unit-testing'
import { RulesTestContext } from '@firebase/rules-unit-testing'
import { TestEnvironmentConfig } from '@firebase/rules-unit-testing/dist/src/public_types'
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
export declare function injectTestingAdaptor(
  ctx: Promise<RulesTestContext>
): Promise<void>
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
export declare function setCtx(ctx: RulesTestContext): void
export declare function setupJestAfterEnv(
  config: TestEnvironmentConfig,
  clb?: (env: RulesTestEnvironment) => testing.RulesTestContext
): void
