import React, {useState, useEffect } from 'react';
import {TextField , Button, Rating } from '@mui/material';
import { collection , query, orderBy , onSnapshot, addDoc,serverTimestamp, where, doc} from 'firebase/firestore';
import { database } from '../../../config/firebase';
import ReviewList from './list';


function Review({iden}) {

  const [reviewee, setReviewee]=useState(iden); // username of target user
  const q = query(collection(database,'review'), where('reviewee', "==", reviewee));

  const [reviews,setReviews]=useState([]);
  const [content,setContent]=useState([]);
  const [rate, setRate]=useState(5);
  
  useEffect(() => {
    
          onSnapshot(q,(snapshot)=>{
              setReviews(snapshot.docs.map(doc=>({
                id: doc.id,
                item: doc.data()
              })))
         })
    },[rate]);

  const addReview=(e)=>{
    if (iden != reviewee) {
    e.preventDefault();
       addDoc(collection(database,'review'),{
         reviewee:reviewee,
         rate:rate,
         content:content,
         timestamp: serverTimestamp(),
         uid:iden
       })
       console.log('click')
      setRate(5);
      setContent('')
  }
  };

  const lookUpUser= () =>{
    q = query(collection(database,'review'), where('reviewee', "==", reviewee));
    
      onSnapshot(q,(snapshot)=>{
          setReviews(snapshot.docs.map(doc=>({
            id: doc.id,
            item: doc.data()
          })))
     })

 }

  let total = 0;
  reviews.forEach(e => total = total + parseInt(e.item.rate));
  total = total / reviews.length;
  total = Math.round(total * 100) / 100

  return (
    <div className="App">
        <TextField id="outlined-basic" label="Email" variant="outlined" style={{margin:"5px 5px"}} size="small" inputProps={{ maxLength: 100 }} value={reviewee}
         onChange={e=>setReviewee(e.target.value)}/>
         <Button variant="contained" style={{margin:"3px 3px"}} color="primary" size="small" onClick={lookUpUser}>Search</Button>


      <h2> {reviewee}: {total}/5 </h2>
      <form>
        <h2>Rate:</h2>
        <Rating name="simple-controlled" value={rate} onChange={e=>setRate(e.target.value)}/>
         <br></br>
         <TextField id="outlined-basic" label="Review" variant="outlined" style={{margin:"5px 5px"}} size="big" inputProps={{ maxLength: 20 }} value={content}
         onChange={e=>setContent(e.target.value)}  />
         <br></br>
        <Button variant="contained" style={{margin:"5px 5px"}} color="primary" size="small" onClick={addReview}>Send</Button>
      </form>
      <ul>
          {reviews.map(item=> <ReviewList key={item.id} arr={item} iden={iden} num={reviews.length}/>)}
      </ul>
    </div>
  );
}

export default Review;

