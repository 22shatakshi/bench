import React, { useEffect, useState } from "react";
import userlistRequest from "../../../data/userList"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import { useRouter } from "next/router";
import { Form } from 'react-bootstrap'


const UserFind = () => {
    const usernameSwitch = document.getElementById('username-switch');
    const nameSwitch = document.getElementById('name-switch');
    const sportsSwitch = document.getElementById('sports-switch');
    const router = useRouter()
    let users: React.SetStateAction<any[]> = [];
    const [userList, setUserList] = useState<any[]>(users)
    const [text, setText] = useState<string>('')
    const [filter, setFilter] = useState('')
    useEffect(() => {
        async () => {
            users = await userlistRequest()
            setUserList(users)
        }
    }, [])

    const handleUsernameSwitch = (check: any) => {
      if (check) {
        nameSwitch?.setAttribute('disabled', '')
        sportsSwitch?.setAttribute('disabled', '')
        setFilter('username')
      }
      else {
        nameSwitch?.removeAttribute('disabled');
        sportsSwitch?.removeAttribute('disabled');
        setFilter('')
      }
    }

    const handleNameSwitch = (check: any) => {
      if (check) {
        usernameSwitch?.setAttribute('disabled', '')
        sportsSwitch?.setAttribute('disabled', '')
        setFilter('name')
      }
      else {
        usernameSwitch?.removeAttribute('disabled');
        sportsSwitch?.removeAttribute('disabled');
        setFilter('')
      }
    }

    const handleSportsSwitch = (check: any) => {
      if (check) {
        usernameSwitch?.setAttribute('disabled', '')
        nameSwitch?.setAttribute('disabled', '')
        setFilter('sports')
      }
      else {
        usernameSwitch?.removeAttribute('disabled');
        nameSwitch?.removeAttribute('disabled');
        setFilter('')
      }
    }



    const handleSearch = async (e: any) => {
        //e.preventDefault()
        users = await userlistRequest()
        console.log(userList)
        var findUsers: React.SetStateAction<any[]> | undefined;
        if (filter == '') {
            findUsers = users && users?.length > 0 ? (users?.filter(u => u?.name === text || u?.username === text || u?.sports === text)) : undefined
        }
        else if (filter == 'username'){
            findUsers = users && users?.length > 0 ? (users?.filter(u => u?.username === text)) : undefined
        }
        else if (filter == 'name') {
            findUsers = users && users?.length > 0 ? (users?.filter(u => u?.name === text)) : undefined
        }
        else {
            findUsers = users && users?.length > 0 ? (users?.filter(u => u?.sports === text)) : undefined
        }
        console.log(findUsers)
        setUserList(findUsers!)
    }
    return (
        <div>
            <div className="title">
            <h1>Search</h1>
            </div>
            <div className="input_wrapper">
                <input 
                    type="text" 
                    placeholder="Search User" 
                    value={text} 
                    onChange={e => setText(e.target.value)}
                />
                <button disabled={!text} onClick={handleSearch}>Search</button>
            </div>
            <Form>
              <Form.Check 
                inline
                type="switch"
                id="username-switch"
                label="username"
                onChange={(e) => handleUsernameSwitch(e.target.checked)}
              />
              <Form.Check 
                inline
                type="switch"
                label="name"
                id="name-switch"
                onChange={(e) => handleNameSwitch(e.target.checked)}
              />
              <Form.Check
                inline
                type="switch"
                label="sports"
                id="sports-switch"
                onChange={(e) => handleSportsSwitch(e.target.checked)}
              />
            </Form>
            <div>
            
                <div className="body">
                    {userList && userList?.length == 0 && (
                        <div className="notFound">No User Found</div>
                    )}
                    <MDBContainer>
                    {userList?.length > 0 && userList?.map((user) => {
                        return (
                            <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
                              <MDBRow className="justify-content-center">
                                <MDBCol md="9" lg="7" xl="5" className="mt-5">
                                  <MDBCard style={{ borderRadius: '15px' }}>
                                    <MDBCardBody className="p-4">
                                      <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                          <MDBCardImage
                                            style={{ width: '180px', borderRadius: '10px' }}
                                            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                                            alt='Generic placeholder image'
                                            fluid />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                          <MDBCardTitle>{user.name}</MDBCardTitle>
                                          <MDBCardText>Username: {user.username}</MDBCardText>
                      
                                          <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                            style={{ backgroundColor: '#efefef' }}>
                                            <div>
                                              <p className="small text-muted mb-1">Sports</p>
                                              <p className="mb-0">{user.sports}</p>
                                            </div>
                                            <div className="px-3">
                                              <p className="small text-muted mb-1">Matched Times</p>
                                              <p className="mb-0">976</p>
                                            </div>
                                            <div>
                                              <p className="small text-muted mb-1">Rating</p>
                                              <p className="mb-0">{user.rating}</p>
                                            </div>
                                          </div>
                                          <div className="d-flex pt-1">
                                            <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                                            <MDBBtn className="flex-grow-1" onClick={() => router.push('/users/' + user.uid)}>View Profile</MDBBtn>
                                          </div>
                                        </div>
                                      </div>
                                    </MDBCardBody>
                                  </MDBCard>
                                </MDBCol>
                              </MDBRow>
                          </div>
                        )
                    })}
                    </MDBContainer>
                </div>
            </div>
        </div>
    )
}

export default UserFind