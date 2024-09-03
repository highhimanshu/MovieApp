import { useRef, useState } from "react";
import { auth, storage } from "../utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { addUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "./skeleton/Spinner";

const UpdateUserData = () => {
  const photoRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>();
  const dispatch = useDispatch();
  const userLoginData = useSelector((c: any) => c.users);
  const [displayName2, setDisplayName2] = useState<string>(
    userLoginData.displayName
  );

  const handleUpload = async (e: any) => {
    console.log("e", e.target.files[0]);
    setLoading(true);
    if (photoRef.current) {
      try {
        const file = photoRef.current.files[0];
        const imageRef = ref(storage, `images/hello.jpg`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setFileUrl(url);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateUser = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: fileUrl,
          displayName: displayName2,
        });
        const { uid, email, displayName, photoURL }: any = auth.currentUser;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        console.log("No user currently logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(auth.currentUser);
  console.log(userLoginData);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white  bg-opacity-20 text-white  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center ">
        Update User Profile
      </h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          updateUser();
        }}
      >
        <div>
          <label htmlFor="username" className="block text-sm font-medium ">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={displayName2}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 bg-opacity-20 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setDisplayName2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={userLoginData.email}
            className="mt-1 block w-full px-3 py-2 bg-gray-100  bg-opacity-20 border border-gray-300 rounded-md shadow-sm"
            disabled
          />
          <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
        </div>
        <div>
          <label htmlFor="profile-pic" className="block text-sm font-medium">
            Profile Picture
          </label>
          <input
            id="profile-pic"
            type="file"
            className="mt-1 block w-full text-sm text-gray-500  bg-opacity-20 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            ref={photoRef}
            onChange={handleUpload}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserData;
