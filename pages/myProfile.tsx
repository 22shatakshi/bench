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
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { database } from '../config/firebase'
import { getAuth} from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore"; 

const myProfile = () => {
const auth = getAuth()
const user = auth.currentUser
var useridRef
const [data, setData] = useState({
    email: '',
    username: '',
    fullname: ''
  })
const [loading, setLoading] = useState(true)
useEffect(() => {
    // Update the document title using the browser API
    const getProfileData = async () => {
        if (user) {
            useridRef = await doc(database, "userid", user.uid)
            const docSnap = await getDoc(useridRef)
            var username = await docSnap.get("username")
            var firstName = await docSnap.get("first")
            var lastName = await docSnap.get("last")
            var email = user.email
            var fullName = firstName + " " + lastName
            setData({
                username: username,
                email: email,
                fullname: fullName
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                  <p className="text-muted mb-1">{data.username}</p>
                  <p className="text-muted mb-4">Status: </p>
                </MDBCardBody>
                <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                      Edit profile
                </MDBBtn>
              </MDBCard>
  
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="globe fa-lg text-warning" />
                      <MDBCardText>https://mdbootstrap.com</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                      <MDBCardText>@mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                      <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                      <MDBCardText>mdbootstrap</MDBCardText>
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
                      <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
  
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                      <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                      </MDBProgress>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
  
                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                      <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                      </MDBProgress>
  
                      <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                      <MDBProgress className="rounded">
                        <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                      </MDBProgress>
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