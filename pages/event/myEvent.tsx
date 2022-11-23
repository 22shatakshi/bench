import App from './App';
import { getAuth } from 'firebase/auth';
import React from 'react';

export default function Home() {
  const user = getAuth().currentUser
  return (
    <>
    <App iden={user!.uid}/>
    </>
  );
}