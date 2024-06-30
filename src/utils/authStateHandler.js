import { onAuthStateChanged, getAuth } from "firebase/auth";
import { setUser, clearUser } from "../store/Slices/userSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "./Firebase";

const auth = getAuth();

export const authStateChanger = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const collections = ["users", "drivers", "hospitals"];
        let userDataFound = false;

        for (const coll of collections) {
          const q = query(
            collection(fireStore, coll),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              dispatch(
                setUser({
                  uid: user.uid,
                  email: user.email,
                  fullName: userData.fullName,
                  phone: userData.phone,
                  type: userData.type,
                  collection: coll,
                })
              );
            });
            userDataFound = true;
            break;
          }
        }

        if (!userDataFound) {
          console.log("No such user document in any collection!");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    } else {
      dispatch(clearUser());
    }
  });
};
