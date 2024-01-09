import { Alert } from "react-native";
import FIREBASE from "../config/FIREBASE";
import { clearStorage, getData, storeData } from "../utils/localStorage";

export const registerUser = async (data, password) => {
  try {
    const success = await FIREBASE.auth().createUserWithEmailAndPassword(
      data.email,
      password
    );

    const dataBaru = {
      ...data,
      uid: success.user.uid,
    };

    await FIREBASE.database()
      .ref("users/" + success.user.uid)
      .set(dataBaru);
    storeData("user", dataBaru);
    return dataBaru;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const success = await FIREBASE.auth().signInWithEmailAndPassword(
      email,
      password
    );
    const resDB = await FIREBASE.database()
      .ref("/users/" + success.user.uid)
      .once("value");

    if (resDB.val()) {
      await storeData("user", resDB.val());
      return resDB.val();
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    throw error;
  }
};

export const addReview = async (data) => {
  try {
    const userData = await getData("user");

    if (userData) {
      const dataBaru = {
        ...data,
        uid: userData.uid,
      };
      await FIREBASE.database()
        .ref("reviews/" + userData.uid)
        .push(dataBaru);
      console.log("review added successfully");
    } else {
      Alert.alert("Error", "Login Terlebih Dahulu");
    }
  } catch (error) {
    throw error;
  }
};

export const getReview = async () => {
  const userData = await getData("user");
  const notesRef = FIREBASE.database().ref("reviews/" + userData.uid);
  return notesRef
    .once("value")
    .then((snapshot) => {
      const reviewsData = snapshot.val();
      if (reviewsData) {
        const reviewsArray = Object.entries(reviewsData).map(
          ([reviewId, reviewData]) => ({
            reviewId,
            ...reviewData,
          })
        );
        return reviewsArray;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching user reviews:", error);
      return [];
    });
};

export const logoutUser = () => {
  FIREBASE.auth()
    .signOut()
    .then(() => {
      clearStorage();
    })
    .catch((error) => {
      alert(error);
    });
};



