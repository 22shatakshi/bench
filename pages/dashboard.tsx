import React, { useId } from 'react'
import { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { collection, query, where, getDocs, doc, getDoc, getCountFromServer, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { database } from '../config/firebase';
import { getAuth} from 'firebase/auth'
import { useRouter } from 'next/router';
import CloseButton from 'react-bootstrap/CloseButton';

var docSnapshotsGlobal: QueryDocumentSnapshot<DocumentData>[] | { data: () => { (): any; new(): any; username: any; }; }[];
var remove: boolean
const Dashboard = () => {
  const user = getAuth().currentUser
  const router = useRouter()
  const [iddata, setidData] = useState({
    user1id: '',
    user2id: '',
    user3id: ''
  })
  const [username, setUsername] = useState({
    user1name: '',
    user2name: '',
    user3name: ''
  })
  const [name, setName] = useState({
    name1: '',
    name2: '',
    name3: ''
  })
  const [rating, setRating] = useState({
    rate1: '',
    rate2: '',
    rate3: ''
  })
  const [sports, setSports] = useState({
    sport1: '',
    sport2: '',
    sport3: ''
  })
  const [loading, setLoading] = useState(true)
  const [user1, setUser1] = useState(false)
  const [user2, setUser2] = useState(false)
  const [user3, setUser3] = useState(false)

  useEffect(() => {
    // Get multiple documents from a collection
    var qSize = 0;
    var docSnapshots: QueryDocumentSnapshot<DocumentData>[] | { data: () => { (): any; new(): any; username: any; }; }[];
    const getUsers = async () => {
      const useridRef = await doc(database, "userid", user!.uid)
      const docSnap = await getDoc(useridRef)
      const sports = await docSnap.get("sports")
      const q = query(collection(database, "userid"), where("sports", "==", sports));
      const temp = await getCountFromServer(q)
      qSize = temp.data().count
      let matchedlist = []
      if (qSize < 3) {
        //need to implement here
      }
      else {
        const querySnapshot = await getDocs(q);
        docSnapshots = querySnapshot.docs;
        var userObtained = 0;
        while (userObtained != 3) {
          var random = Math.floor(Math.random() * qSize);
          var matched = docSnapshots[random].data()
          if (matched.uid != user!.uid) {
            matchedlist[userObtained++] = random
          }
        }
        setidData({
          user1id: docSnapshots[matchedlist[0]].data().uid,
          user2id: docSnapshots[matchedlist[1]].data().uid,
          user3id: docSnapshots[matchedlist[2]].data().uid
        })
        setUsername( {
          user1name: docSnapshots[matchedlist[0]].data().username,
          user2name: docSnapshots[matchedlist[1]].data().username,
          user3name: docSnapshots[matchedlist[2]].data().username,
        })
        setName({
          name1: docSnapshots[matchedlist[0]].data().name,
          name2: docSnapshots[matchedlist[1]].data().name,
          name3: docSnapshots[matchedlist[2]].data().name
        })
        setRating({
          rate1: docSnapshots[matchedlist[0]].data().rating,
          rate2: docSnapshots[matchedlist[1]].data().rating,
          rate3: docSnapshots[matchedlist[2]].data().rating
        })
        setSports({
          sport1: docSnapshots[matchedlist[0]].data().sport1,
          sport2: docSnapshots[matchedlist[0]].data().sport2,
          sport3: docSnapshots[matchedlist[0]].data().sport3
        })
      }
      docSnapshotsGlobal = docSnapshots
      setLoading(false)
      remove = false
    }
    const getNewUser = async () => {
      remove = true
      var userCount = 0;
      var matched;
      var random = 0;
      qSize = docSnapshotsGlobal.length
      
      while (userCount == 0) {
        random = Math.floor(Math.random() * qSize);
        matched = docSnapshotsGlobal[random].data()
        if (matched.uid != user!.uid) {
          userCount++;
        }
      }
      if (user1) {
        setUsername({
          user1name: docSnapshotsGlobal[random].data().username,
          user2name: username.user2name,
          user3name: username.user3name,
        })
        setidData({
          user1id: docSnapshotsGlobal[random].data().uid,
          user2id: iddata.user2id,
          user3id: iddata.user3id
        })
        setName({
          name1: docSnapshotsGlobal[random].data().name,
          name2: name.name2,
          name3: name.name3,
        })
        setRating({
          rate1: docSnapshotsGlobal[random].data().rating,
          rate2: rating.rate2,
          rate3: rating.rate3,
        })
        setSports({
          sport1: docSnapshotsGlobal[random].data().sport,
          sport2: sports.sport2,
          sport3: sports.sport3
        })
        setUser1(false)
      }
      else if (user2) {
        setUsername({
          user1name: username.user1name,
          user2name: docSnapshotsGlobal[random].data().username,
          user3name: username.user3name,
        })
        setidData({
          user1id: iddata.user1id,
          user2id: docSnapshotsGlobal[random].data().uid,
          user3id: iddata.user3id
        })
        setName({
          name1: name.name1,
          name2: docSnapshotsGlobal[random].data().name,
          name3: name.name3,
        })
        setRating({
          rate1: rating.rate1,
          rate2: docSnapshotsGlobal[random].data().rating,
          rate3: rating.rate3,
        })
        setSports({
          sport1: sports.sport1,
          sport2: docSnapshotsGlobal[random].data().sport,
          sport3: sports.sport3
        })
        setUser2(false)
      }
      else {
        setUsername({
          user1name: username.user1name,
          user2name: username.user2name,
          user3name: docSnapshotsGlobal[random].data().username,
        })
        setidData({
          user1id: iddata.user1id,
          user2id: iddata.user2id,
          user3id: docSnapshotsGlobal[random].data().uid,
        })
        setName({
          name1: name.name1,
          name2: name.name2,
          name3: docSnapshotsGlobal[random].data().name,
        })
        setRating({
          rate1: rating.rate1,
          rate2: rating.rate2,
          rate3: docSnapshotsGlobal[random].data().rating,
        })
        setSports({
          sport1: sports.sport1,
          sport2: sports.sport2,
          sport3: docSnapshotsGlobal[random].data().sport,
        })
        setUser3(false)
      }   
    }
    if((user1 || user2 || user3) && remove) {
      getNewUser()
    }
    else {
      if (!user1 && !user2 && !user3 && !remove) {
        getUsers()
      }       
    }
    if(!user1 && !user2 && !user3) {
      remove = false
    }
  },[user1, user2, user3, loading])


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
                <CloseButton style={{ float: 'right' }} onClick={() => {setUser1(true); remove = true;}}/>
                  <div className="mt-3 mb-4">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle" fluid style={{ width: '100px' }} />
                  </div>
                  <MDBTypography tag="h4">{username.user1name}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    {name.name1}
                  </MDBCardText>
                  <MDBBtn rounded size="lg" onClick={() => router.push('/users/' + iddata.user1id)}>
                    View Profile
                  </MDBBtn>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">{rating.rate1}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Rating</MDBCardText>
                    </div>
                    <div className="px-3">
                    <MDBCardText className="mb-1 h5">{sports.sport1}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Sports</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                <CloseButton style={{ float: 'right' }} onClick={() => {setUser2(true); remove = true;}}/>
                  <div className="mt-3 mb-4">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle" fluid style={{ width: '100px' }} />
                  </div>
                  <MDBTypography tag="h4">{username.user2name}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    {name.name2}
                  </MDBCardText>
                  
                  <MDBBtn rounded size="lg" onClick={() => router.push('/users/' + iddata.user2id)}>
                    View Profile
                  </MDBBtn>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">{rating.rate2}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Rating</MDBCardText>
                    </div>
                    <div className="px-3">
                    <MDBCardText className="mb-1 h5">{sports.sport2}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Sports</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                <CloseButton style={{ float: 'right' }} onClick={() => {setUser3(true); remove = true;}}/>
                  <div className="mt-3 mb-4">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle" fluid style={{ width: '100px' }} />
                  </div>
                  <MDBTypography tag="h4">{username.user3name}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    {name.name3}
                  </MDBCardText>
                  <MDBBtn rounded size="lg" onClick={() => router.push('/users/' + iddata.user3id)}>
                    View Profile
                  </MDBBtn>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">{rating.rate3}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Rating</MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">{sports.sport3}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Sports</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBBtn style={{width: '175px'}} onClick={() => setLoading(true)}>
                    Match Again
            </MDBBtn>
          </MDBRow>)}
          
      </MDBContainer>
    </div>

  )
}

export default Dashboard
