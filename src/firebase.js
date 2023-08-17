import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyAD-kt-in1hOBmTy6ojQp_FzptcgSZa7ZU',
    authDomain: 'forms-tvp.firebaseapp.com',
    projectId: 'forms-tvp',
    storageBucket: 'forms-tvp.appspot.com',
    messagingSenderId: '183405755977',
    appId: '1:183405755977:web:7a6f0b9cf8b6fce00c0998',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage()
export { db, storage }
