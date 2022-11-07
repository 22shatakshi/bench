import Review from '../components/review/Review';
import { getAuth} from 'firebase/auth';
import React from 'react';
import { useRouter } from 'next/router'

const review = () => {
  const user = getAuth().currentUser
  const router = useRouter();
  return (
    <>
    <Review iden={user?.email}/>
    </>
  );
}

export default review;