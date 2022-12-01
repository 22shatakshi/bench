import { collection , query, where, getDocs} from 'firebase/firestore';
import { database } from '../../config/firebase';
import emailjs from '@emailjs/browser';
import { getAuth } from 'firebase/auth';
import { init } from "@emailjs/browser";

// npm install @emailjs/browser

const Notify = async ({receiver, content}) => {
    init("E6TUPDT05sKE4l7YI");
    var address = '';
    var enable = false;
    //const [address,setAddress] = useState("");
    //const [enable,setEnable]=useState();
    const q = query(collection(database,'notification'), where('uid', "==", receiver));
    
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot?.docs[0]?.data())
    address = querySnapshot?.docs[0]?.data().email;
    enable = querySnapshot?.docs[0]?.data().enable;

    //const getEmail = () => {
    console.log("address: ", address);
    console.log("enable: ", enable);
    const a = getAuth();

        // one long line
        if (enable != true || address  == null) {
            window.alert("Receiver disabled their notification.")
        } else {
            emailjs.send("service_re81ih1","template_66vu3bi",{
                message: content,
                to_email: "team23project@gmail.com",
                from_email: a.currentUser?.email,
                })      .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                    return;
                });
            };
        }
    //}
  
    // return (

    //     <div>
    //         <Button onClick={getEmail}>notification</Button>
    //     </div>
        
    //   );

export { Notify };

            
        /*if (enable == "false") {
            window.alert("Reciever disabled their notification.")
        } else {
            a.href = "mailto:"+ address +"?subject=Notification&body=Sending%20Notification%20to%20:" + address +"%0A------------------------------------------------------------%0AMessage->%20"+ content + " %0A%0A%0A";
    
            if (window.confirm('Notification via email: Do you want to open a new tab?')) {
            a.click();
            };
        }*/


        /*
                        emailjs.send("service_re81ih1","template_66vu3bi",{
                    message: content,
                    to_email: "team23project@gmail.com",
                    from_email: a.currentUser?.email,
                    })      .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                        return;
                    });
                    
                    
                    
                    */