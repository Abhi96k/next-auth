import React from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");


  const getUserDetails = async () => {
    const res = await axios.post("/api/user/me");
    console.log(res.data);
    setData(res.data);
  };

  const logout = async () => {
    try{
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    }
    catch(error){
      console.log(error);
      toast.error("Failed to logout");
    }

  return <div>Profile Page</div>;
};
