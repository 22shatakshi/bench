import { collection, getDoc, getDocs, doc, getFirestore } from "firebase/firestore";
import { database } from '../../config/firebase';
import {serializeDocumentSnapshot, serializeQuerySnapshot, deserializeDocumentSnapshot, deserializeDocumentSnapshotArray} from "firestore-serializers";
import {
    
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBProgress,
    MDBProgressBar,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';
  import { MDBIcon } from 'mdbreact';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import 'bootstrap-css-only/css/bootstrap.min.css';
  import { getAuth} from 'firebase/auth'
  import { useRouter } from 'next/router';
  import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { style } from "@mui/system";
  
export const getStaticPaths = async () => {
    let users = []
    const querySnapshot = await getDocs(collection(database, "username"));
    try {
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            console.log(data)
            
            users.push({
                fullname: data.first + data.last,
                uid: data.uid,
                username: data.username,
                email: data.email
            })
        })
    } catch (e) {
        console.log(e)
    }
    //map is not a function, solved
    const paths = users.map((user) => ({
        params: {id: user.username}
    }))
    return {
        paths,
        fallback: false
    }
    // const querySnapshot = await getDocs(collection(database, "username"))
    // const paths = await querySnapshot.forEach((doc) => {
    //     console.log(doc.get("uid"))
    //     return {
    //         params: { id: doc.get("uid")}
    //     }
    // })
    // return {
    //     paths,
    //     fallback: false
    // }
}

export const getStaticProps = async (context) => {
    
    const id = context.params.id
    console.log(id)
    //doc is not define, reference error, solved
    const docRef = doc(database, "username", id)
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())
    //only return serializable json
    const serializedDoc = serializeDocumentSnapshot(docSnap)
    return {
        props: { user: serializedDoc}
    }
}



const Profile = ({ user }) => {
    const router = useRouter()
    const data = deserializeDocumentSnapshot(user, getFirestore())
    return (
        <div style={{margin: '25px'}}>
            
            <MDBRow>
            <MDBCol lg="4">
                <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                    <MDBCardImage
                    src={data.imagelink}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                    <p className="text-muted mb-1">{data.get("username")}</p>
                  <p className="text-muted mb-4">{data.get("fullname")} </p>
                  <p className="text-muted mb-4">Status: </p>
                </MDBCardBody>
                <MDBCol className="text-center">
                    <MDBBtn style={{height: '36px', overflow: 'visible'}}>
                            Message
                    </MDBBtn>
                    <MDBBtn style={{height: '36px', overflow: 'visible', backgroundColor: 'red', borderColor: 'red'}}>
                            Block
                    </MDBBtn>
                </MDBCol>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText><a href="https://github.com/22shatakshi/bench" style={{color: '#000000'}}>Website</a></MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText><a href="https://github.com/22shatakshi/bench" style={{color: '#000000'}}>@shatakshi</a></MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText><a href="https://github.com/22shatakshi/bench" style={{color: '#000000'}}>@shatakshi</a></MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText><a href="https://github.com/22shatakshi/bench" style={{color: '#000000'}}>@shatakshi</a></MDBCardText>
                    </MDBListGroupItem>
                    </MDBListGroup>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol>
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
            <MDBBtn style={{float: 'right'}} onClick={() => router.push('/dashboard') }>Go back</MDBBtn>
        </div>
    )
}

export default Profile;
