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
import { getAuth} from 'firebase/auth'
import { useRouter } from 'next/router';
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import currentUserDataRequest from '../../data/currectUser';
import Notification from '../notification/notification'
const myProfile = () => {
    const router = useRouter()
    const auth = getAuth()
    const user = auth.currentUser
    const [data, setData] = useState({
        email: '',
        username: '',
        name: '',
        imagelink: '',
        timestamp: '',
        status: '',
        instagram: '',
        twitter: '',
        facebook: '',
        address: '',
        rating: 0
      })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getProfileData = async () => {
            const userData = await currentUserDataRequest();
            let lastSignInDate = user!.metadata.lastSignInTime
            const storage = getStorage();
            const imageLink = user?.photoURL

            // try {
            // imageLink = await getDownloadURL(ref(storage, String(user!.uid)))
            // } catch(e) {
            //     imageLink = await getDownloadURL(ref(storage, "default.jpeg"))
            // }

            setData({
                username: userData.username,
                email: userData.email,
                name: userData.name,
                status: userData.status,
                timestamp: lastSignInDate!,
                imagelink: imageLink,
                instagram: userData.instagram,
                twitter: userData.twitter,
                facebook: userData.facebook,
                address: userData.address,
                rating: userData.rating * 20
            })
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
                  <p className="text-muted mb-4">Status: {data.status}</p>
                  <p className="text-muted mb-4">Last Sign In Time: {data.timestamp} </p>
                </MDBCardBody>
                <MDBBtn onClick={() => router.push('/profile/editProfile')} style={{height: '36px', overflow: 'visible'}}>
                        Edit profile
                </MDBBtn>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText><a href={data.twitter} style={{color: '#000000'}}>{data.twitter}</a></MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText><a href={data.instagram} style={{color: '#000000'}}>{data.instagram}</a></MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText><a href={data.facebook} style={{color: '#000000'}}>{data.facebook}</a></MDBCardText>
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
                      <MDBCardText className="text-muted">{data.name}</MDBCardText>
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
                        <MDBCardText>Location</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{data.address}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCard>

                <MDBRow>
                <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                        <MDBCardText className="mb-4">Notification</MDBCardText>
                        <Notification/>
                    </MDBCardBody>
                    </MDBCard> 
                </MDBCol>

                <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                        <MDBCardText className="mb-4">Average Rating</MDBCardText>
                        
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={data.rating} valuemin={0} valuemax={100} />
                        </MDBProgress>
                        <hr className="my-4" />
                        <MDBCardText className="mb-4">Reviews</MDBCardText>
                        <MDBBtn onClick={() => router.push({pathname: '/review', query: { keyword: '123' }})} style={{height: '36px', overflow: 'visible'}}>
                            View Review
                        </MDBBtn>
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