import { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { collection, query, where, getDocs, orderBy, limit, doc, getDoc, getCountFromServer, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { database } from '../config/firebase';
import { getAuth, reload} from 'firebase/auth'
import { useRouter } from 'next/router';
import CloseButton from 'react-bootstrap/CloseButton';


var docSnapshotsGlobal: QueryDocumentSnapshot<DocumentData>[]
var remove: boolean
var remDone: boolean
const Dashboard = () => {
  const user = getAuth().currentUser
  const router = useRouter()
  const [data, setData] = useState({
    user1: '',
    user2: '',
    user3: ''
  })
  const [loading, setLoading] = useState(true)
  const [user1, setUser1] = useState(false)
  const [user2, setUser2] = useState(false)
  const [user3, setUser3] = useState(false)
  
  useEffect(() => {
    // Get multiple documents from a collection
    console.log("called")
    console.log("1:" , user1, "2:", user2, "3:", user3, "remove:", remove)
    var qSize = 0;
    var docSnapshots:  QueryDocumentSnapshot<DocumentData>[] | { data: () => { (): any; new(): any; username: any; }; }[];
    const getUsers = async () => {
      const useridRef = await doc(database, "userid", user!.uid)
      const docSnap = await getDoc(useridRef)
      const sports = await docSnap.get("sports")
      const q = query(collection(database, "userid"), where("sports", "==", sports));
      const temp = await getCountFromServer(q)
      qSize = temp.data().count
      const querySnapshot = await getDocs(q);
      docSnapshots = querySnapshot.docs;
      let matchedlist = []
      var userObtained = 0;
      //might cause infinite loop here
      while (userObtained != 3) {
        var random = Math.floor(Math.random() * qSize);
        var matched = docSnapshots[random].data()
        if (matched.uid != user!.uid) {
          matchedlist[userObtained++] = random
        }
      }
      setData({
        user1: docSnapshots[matchedlist[0]].data().username,
        user2: docSnapshots[matchedlist[1]].data().username,
        user3: docSnapshots[matchedlist[2]].data().username
      })
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
        setData({
          user1: docSnapshotsGlobal[random].data().username,
          user2: data.user2,
          user3: data.user3,
        })
        setUser1(false)
      }
      else if (user2) {
        setData({
          user1: data.user1,
          user2: docSnapshotsGlobal[random].data().username,
          user3: data.user3,
        })
        setUser2(false)
      }
      else {
        setData({
          user1: data.user1,
          user2: data.user2,
          user3: docSnapshotsGlobal[random].data().username,
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
  }, [user1, user2, user3, loading])

  return (
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="container py-5 h-100">
        {loading  ? (
          <div> Loading </div >
        ) : (
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                <CloseButton style={{ float: 'right' }} onClick={() => {setUser1(true); remove = true;} }/>
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
                  <MDBBtn rounded size="lg" onClick={() => router.push('/users/' + data.user1)}>
                    View Profile
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                <CloseButton style={{ float: 'right' }} onClick={() => {setUser2(true); remove = true;} }/>
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
                  <MDBBtn rounded size="lg" onClick={() => router.push('/users/' + data.user2)}>
                    View Profile
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="text-center">
                <CloseButton style={{ float: 'right' }} onClick={() => {setUser3(true); remove = true;} }/>
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
                  <MDBBtn rounded size="lg" onClick={() => router.push('/users/' + data.user3)}>
                    View Profile
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBBtn rounded size="lg" style={{width: '150px'}} onClick={() => {setUser1(false); setUser2(false); setUser3(false); remove = false; setLoading(true)}}>
                    Match Again
            </MDBBtn>
          </MDBRow>)}
          
      </MDBContainer>
    </div>

  )
}

export default Dashboard
