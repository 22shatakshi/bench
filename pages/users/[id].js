import { database } from '../../config/firebase';
//npm install firestore-serializers
import {serializeDocumentSnapshot, serializeQuerySnapshot, deserializeDocumentSnapshot, deserializeDocumentSnapshotArray} from "firestore-serializers";
import userlistRequest from "../../data/userList"
import currentUserDataRequest from "../../data/currectUser"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBProgress,
    MDBProgressBar,
    MDBListGroup,
    MDBListGroupItem,
    MDBBtn,
    MDBSwitch
  } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext"
import { getDoc, doc, getFirestore, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { useEffect, useId, useState } from 'react';

export const getStaticPaths = async () => {
    let users = await userlistRequest()
    console.log(users)
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
    const docRef = doc(database, "userid", id)
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())
    const serializedDoc = serializeDocumentSnapshot(docSnap)
    return {
        props: { selected: serializedDoc}
    }
}


const Profile = ({ selected }) => {
    const router = useRouter()
    const data = deserializeDocumentSnapshot(selected, getFirestore())
    const [block, setBlock] = useState(false);
    const { user } = useAuth()

    const handleBlockSwitch = async (event, blockId) => {
        if (event.target.checked) {
            setBlock(true);
            await handleBlock(blockId);
        }
        else {
            setBlock(false);
            await handleUnblock(blockId);
        }
    }

    const handleBlock = async (uid) => {
        const useridRef = await doc(database, "userid", user.uid)
        await updateDoc(useridRef, {
            blocked: arrayUnion(uid)
        });
    
        alert(`The user ${data.get("username")} is blocked successfully.\n
        To unblock, please search for the user and go to their profile.`)
    }
    
    const handleUnblock = async (uid) => {
        // remove it in the current user's blockUsernames field,
        const useridRef = await doc(database, "userid", user.uid)
        //instead of username change it to uid
        await updateDoc(useridRef, {
            blocked: arrayRemove(uid)
        });
    
        alert(`The user ${data.get("username")} is unblocked successfully.\n`)
    }
    
    
    const handleChatRequest = async (event, targetData) => {
        event.preventDefault();
        const targetId = targetData.get("uid")
        const combinedId = user.uid > targetId ? user.uid + targetId : targetId + user.uid;
        const res = await getDoc(doc(database, "chats", combinedId));
        console.log(combinedId)
        //there is not a chat between 2 users
        console.log(res.exists())
        if (!res.exists()) {
            const docRef = doc(database, "chatRequest", targetId);
            await updateDoc(docRef, {
                [user.uid]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
            }); 
            alert(`Success! You have sent a chat request to the user ${targetData.get("username")}.\n`)
        } else {
            alert(`You already have access to chatting with them.\n`)
        }
    }
    
    useEffect(() => {
        const fetchBlockState = async () => {
            const b = data.get("blocked");
            for (var i = 0; i < b.length; i++) {
                if (data.get("uid") == b[i]) {
                    setBlock(true);
                    break;
                }
            }
        }
        const b = data.get("blocked");
        for (var i = 0; i < b.length; i++) {
            if (b[i] == user.uid) {
                alert(`You are not able to access ${data.get("username")}'s profile.\n`)
                router.push('/dashboard');
            }
        }
        fetchBlockState();
    }, [])
    //check if current user uid is in the block list



    return (
        <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
            <><MDBRow>
                <MDBCol lg="4">
                    <MDBCard className="mb-4">
                        <MDBCardBody className="text-center">
                            <MDBCardImage
                                src={data.get("photoURL")}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid />
                            <p className="text-muted mb-1">{data.get("username")}</p>
                            <p className="text-muted mb-4">Status: {data.get("status")}</p>
                            <MDBSwitch label='Block Switch' style={block ? { backgroundColor: 'red', borderColor: "red" } : { backgroundColor: 'blue', borderColor: "blue" }} checked={block ? true : false} onClick={(event) => handleBlockSwitch(event, data.get("uid"))}/>
                            <MDBBtn onClick={(event) => handleChatRequest(event, data)}>
                                    Send Chat Request
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                        <MDBListGroup flush className="rounded-3">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                            <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                            <MDBCardText><a href={data.get("twitter")} style={{color: '#000000'}}>{data.get("twitter")}</a></MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                            <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                            <MDBCardText><a href={data.get("instagram")} style={{color: '#000000'}}>{data.get("instagram")}</a></MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                            <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                            <MDBCardText><a href={data.get("facebook")} style={{color: '#000000'}}>{data.get("facebook")}</a></MDBCardText>
                        </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{data.get("name")}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{data.get("email")}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Phone</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">(123) 456-7890</MDBCardText>
                                </MDBCol>

                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Address</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">West Lafayette, IN 47906</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBRow>
                        <MDBCol md="6">
                            <MDBCard className="mb-4 mb-md-0">
                                <MDBCardBody>
                                    <MDBCardText className="mb-4">My Sports</MDBCardText>
                                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Tennis</MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Volleyball</MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Badminton</MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Football</MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Basketball</MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md="6">
                            <MDBCard className="mb-4 mb-md-0">
                                <MDBCardBody>
                                    <MDBCardText className="mb-4">Average Rating</MDBCardText>

                                    <MDBProgress className="rounded">
                                        <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                    <hr className="my-4" />
                                    <MDBCardText className="mb-4">Reviews</MDBCardText>
                                    <MDBCardImage width="35" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp" alt="avatar" className="rounded-circle me-1" />
                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>They are enthusaitic about volleyball and showed up on time. I had a lot of fun playing with them and I am surely looking foreard to more games with them.</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            <MDBBtn style={{float: 'right'}} onClick={() => router.push('/dashboard')}>
                Go Back
            </MDBBtn></>
        </MDBContainer>
        </section>
    )
}

export default Profile;
