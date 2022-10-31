import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  MDBCol,
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
import { database } from '../config/firebase'
import { getAuth} from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

const myProfile = () => {
    const router = useRouter()
    const auth = getAuth()
    const user = auth.currentUser
    var useridRef
    const [data, setData] = useState({
        email: '',
        username: '',
        fullname: '',
        imagelink: '',
        timestamp: ''
      })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getProfileData = async () => {
            if (user) {
                useridRef = await doc(database, "userid", user.uid)
                const docSnap = await getDoc(useridRef)
                var username = await docSnap.get("username")
                var firstName = await docSnap.get("first")
                var lastName = await docSnap.get("last")
                let lastSignInDate = user.metadata.lastSignInTime
                var email = user.email
                var fullName = firstName + " " + lastName
                const storage = getStorage();
                var imageLink
                try {
                imageLink = await getDownloadURL(ref(storage, String(user.uid)))
                } catch(e) {
                    imageLink = getDownloadURL(ref(storage, 'xsFnrxqQXcPYe9NpEQW0A6wpl5Z2'))
                }
                setData({
                    username: username,
                    email: email!,
                    fullname: fullName,
                    timestamp: lastSignInDate!,
                    imagelink: imageLink
                })
                console.log(email)
            }
            setLoading(false)
        }
        getProfileData()
      }, [])
    return (
        <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
        {loading ? (
            <div> Loading </div>
        ) : (
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
                    <p className="text-muted mb-1">{data.username}</p>
                  <p className="text-muted mb-4">Status: </p>
                  <p className="text-muted mb-4">Last Sign In Time: {data.timestamp} </p>
                </MDBCardBody>
                <MDBBtn onClick={() => router.push('/editProfile')} style={{height: '36px', overflow: 'visible'}}>
                        Edit profile
                </MDBBtn>
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
            <MDBCol lg="8">
                <MDBCard className="mb-4">
                <MDBCardBody>
                <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data.fullname}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data.email}</MDBCardText>
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
            </MDBRow>)}
        </MDBContainer>
        </section>
    )
}
export default myProfile;
