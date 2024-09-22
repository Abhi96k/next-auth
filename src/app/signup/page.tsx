import React from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function SignupPage() {

  const [user, setUser] = React.useState({
    email:"",
    password:"",
    username:""
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try{
      setLoading(true);
      const response=await axios.post("/api/users/signup", user);
      console.log("Signup Success",response.data);
    }
    catch(e:any){
      console.error("Signup Error",e.response.data);
      toast.error(e.response.data.message);
    }
  }

  return (

  )
}
