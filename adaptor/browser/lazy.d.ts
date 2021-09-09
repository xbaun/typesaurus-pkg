/**
 * Lazy browser Firestore adaptor.
 */
import type firebase from 'firebase/compat'
export default function adaptor(): Promise<{
  firestore: firebase.firestore.Firestore
  consts: {
    DocumentReference: typeof import('firebase/compat').default.firestore.DocumentReference
    Timestamp: typeof import('firebase/compat').default.firestore.Timestamp
    FieldPath: typeof import('firebase/compat').default.firestore.FieldPath
    FieldValue: typeof import('firebase/compat').default.firestore.FieldValue
  }
  getDocMeta: (
    snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => {
    fromCache: boolean
    hasPendingWrites: boolean
  }
}>
export declare function injectAdaptor(): void
