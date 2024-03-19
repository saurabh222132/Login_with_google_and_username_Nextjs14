"use client";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "@/redux/features/auth/AuthSlice";
import Protected from "../protected/page";
import { HomepageContent } from "./coponents/homepage";
const Homepage = () => {
  const loggedinUser = useSelector(selectLoggedInUser);
  return (
    <div>
      <Protected>
        <div>
          {!loggedinUser ? (
            <p>Loding..... </p>
          ) : (
            <HomepageContent></HomepageContent>
          )}
        </div>
      </Protected>
    </div>
  );
};

export default Homepage;
