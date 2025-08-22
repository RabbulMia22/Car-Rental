
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { setUser } from "../features/authSlice";

const useUserAuth = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const formattedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(formattedUser));
        setCurrentUser(formattedUser);
      } else {
        dispatch(setUser(null));
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return currentUser; 
};

export default useUserAuth;
