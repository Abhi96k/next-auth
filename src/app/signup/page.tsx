import React from "react";

export default function SignupPage() {

  const [user, setUser] = React.useState({
    email:"",
    password:"",
    username:"";
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
     
  }

  return (

  )
}
