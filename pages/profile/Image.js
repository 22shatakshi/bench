import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {getAuth, updateProfile} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../../config/firebase'

function Image() {


  const a = getAuth();
  
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const imageRef = ref(storage, a.currentUser?.uid);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            setUrl(url);
            await updateDoc(doc(database, "userid", a.currentUser.uid), {
              photoURL: url
            }); 
            updateProfile(a.currentUser, {
              photoURL: url
            }).then(() => {
              console.log("Image uploaded", {url})
            }).catch((error) => {
              console.log(error);
            });            
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Avatar src={url} sx={{ width: 150, height: 150 }} />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Image;