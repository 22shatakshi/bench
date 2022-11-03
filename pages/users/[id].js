import { collection, getDoc, getDocs, doc, getFirestore } from "firebase/firestore";
import { database } from '../../config/firebase';
import {serializeDocumentSnapshot, serializeQuerySnapshot, deserializeDocumentSnapshot, deserializeDocumentSnapshotArray} from "firestore-serializers";
import userlistRequest from "../../data/userList"
//npm install firestore-serializers

export const getStaticPaths = async () => {
    let users = await userlistRequest()
    // const querySnapshot = await getDocs(collection(database, "username"));
    // try {
    //     querySnapshot.forEach((doc) => {
    //         let data = doc.data()
    //         users.push({
    //             uid: data.uid,
    //             username: data.username,
    //             email: data.email
    //         })
    //     })
    // } catch (e) {
    //     console.log(e)
    // }
    //console.log("Users:", users)
    const paths = users.map((user) => ({
        params: {id: user.uid}
    }))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    console.log(id)
    //doc is not define, reference error, solved
    const docRef = doc(database, "userid", id)
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())
    //only return serializable json
    const serializedDoc = serializeDocumentSnapshot(docSnap)
    return {
        props: { user: serializedDoc}
    }
}



const Profile = ({ user }) => {
    const data = deserializeDocumentSnapshot(user, getFirestore())
    return (
        <div>
            <h1>{ data.get("username")}</h1>
            <h1>{ data.get("email")}</h1>
        </div>
    )
}

export default Profile;