import { getDoc, doc} from 'firebase/firestore';
import { database } from '../../config/firebase';
import emailjs from '@emailjs/browser';
import { init } from "@emailjs/browser";
import { getAuth } from 'firebase/auth'

// npm install @emailjs/browser

const Notify = async ({receiver, content}) => {
    init("E6TUPDT05sKE4l7YI");
    const docSnap = await getDoc(doc(database, "notification", receiver));
    const email = docSnap.data().email;
    const enable = docSnap.data().enable;
    

    console.log("enable: ", enable)
    console.log("address: ", email)


    if (!enable || email == null) {
        console.log("Receiver disabled their notification.")
        //window.alert("Receiver disabled their notification.")
    } else {
        emailjs.send("service_re81ih1","template_66vu3bi",{
            message: content + ". From " + getAuth().currentUser.email,
            to_email: email,
            from_email: "team23project@gmail.com",
            }).then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
                return;
            });
        };
    }

export { Notify };

