/**
 * Browser Firestore adaptor.
 */
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
export default function adaptor(): Promise<{
  firestore: firebase.firestore.Firestore
  consts: {
    DocumentReference: typeof firebase.firestore.DocumentReference
    Timestamp: typeof firebase.firestore.Timestamp
    FieldPath: typeof firebase.firestore.FieldPath
    FieldValue: typeof firebase.firestore.FieldValue
  }
  getDocMeta: (
    snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => {
    fromCache: boolean
    hasPendingWrites: boolean
  }
}>
export declare function injectAdaptor(): void
