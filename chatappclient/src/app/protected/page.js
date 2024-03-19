import { selectLoggedInUser } from "@/redux/features/auth/AuthSlice";
import { useSelector } from "react-redux";
import { useRouter, redirect } from "next/navigation";

const Protected = (props) => {
  const loggedinUser = useSelector(selectLoggedInUser);

  if (!loggedinUser) {
    return <div> {redirect("/login")} </div>;
  } else {
    return props.children;
  }
};

export default Protected;
