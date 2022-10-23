import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { database } from '../config/firebase';
import { getAuth } from 'firebase/auth';


const Dashboard = () => {
  var numUsersShown = 3;
  const auth = getAuth();
  const user = auth.currentUser;
  const [data, setData] = useState({
    user1: '',
    user2: '',
    user3: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get multiple documents from a collection
    const getUsers = async () => {
      const q = query(collection(database, "userid"), where("sports", "==", "volleyball"));

      const querySnapshot = await getDocs(q);

      const docSnapshots = querySnapshot.docs;
      setData({
        user1: docSnapshots[0].data().username,
        user2: docSnapshots[1].data().username,
        user3: docSnapshots[2].data().username
      })
      // querySnapshot.forEach((doc) => { 
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
      setLoading(false)
    }
    getUsers()
  }, [])

  return (
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="container py-5 h-100">
        {loading ? (
          <div> Loading </div >
        ) : (
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle" fluid style={{ width: '100px' }} />
                  </div>
                  <MDBTypography tag="h4">{data.user1}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
                  </MDBCardText>
                  <div className="mb-4 pb-2">
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="facebook" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating className="mx-1">
                      <MDBIcon fab icon="twitter" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="skype" size="lg" />
                    </MDBBtn>
                  </div>
                  <MDBBtn rounded size="lg">
                    Message now
                  </MDBBtn>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">8471</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">8512</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">4751</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle" fluid style={{ width: '100px' }} />
                  </div>
                  <MDBTypography tag="h4">{data.user2}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
                  </MDBCardText>
                  <div className="mb-4 pb-2">
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="facebook" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating className="mx-1">
                      <MDBIcon fab icon="twitter" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="skype" size="lg" />
                    </MDBBtn>
                  </div>
                  <MDBBtn rounded size="lg">
                    Message now
                  </MDBBtn>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">8471</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">8512</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">4751</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle" fluid style={{ width: '100px' }} />
                  </div>
                  <MDBTypography tag="h4">{data.user3}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    @Programmer <span className="mx-2">|</span> <a href="#!">mdbootstrap.com</a>
                  </MDBCardText>
                  <div className="mb-4 pb-2">
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="facebook" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating className="mx-1">
                      <MDBIcon fab icon="twitter" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="skype" size="lg" />
                    </MDBBtn>
                  </div>
                  <MDBBtn rounded size="lg">
                    Message now
                  </MDBBtn>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">8471</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">8512</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">4751</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>)}
      </MDBContainer>
    </div>

  )
}

export default Dashboard
