import { doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { database } from '../config/firebase'


async function currentUserDataRequest() {
    const auth = getAuth()
    const user = auth.currentUser
    const docRef = await doc(database, "userid", user.uid)
    const docSnap  = await getDoc(docRef)
    const userData = {
        uid: docSnap.get("uid"),
        username: docSnap.get("username"),
        email: docSnap.get("eamil"),
        name: docSnap.get("name"),
        sports: docSnap.get("sports"),
        rating: docSnap.get("rating"),
        status: docSnap.get("status"),
        age: docSnap.get("age"),
        address: docSnap.get("address"),
        gender: docSnap.get("gender"),
        instagram: docSnap.get('instagram'),
        twitter: docSnap.get('twitter'),
        facebook: docSnap.get('facebook')
    }
    return userData
}

export default currentUserDataRequest;