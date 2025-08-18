// hooks/useUserAuth.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { setUser } from "../features/authSlice";

const useUserAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user); // 🔥 check console here
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        console.log("User is not logged in");
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useUserAuth;
