import { useRef, useState } from "react";
import { validation } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, signInWithGooglePopup } from "../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import G_ICON from "../assets/g_icon.png";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const [authError, setAuthError] = useState<any>({
    email: null,
    password: null,
    firebaseErr: null,
  });
  const dispatch = useDispatch();

  //google sign in
  const signInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log(response);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setAuthError({ email: null, password: null, firebaseErr: null });
    const error: any = validation(
      emailInput?.current?.value || "",
      passwordInput?.current?.value || ""
    );

    setAuthError({
      email: error?.email,
      password: error?.password,
    });

    if (Object.keys(error).length > 0) {
      console.log("error hai");
      return;
    } else {
      if (isLogin) {
        //login
        if (emailInput.current && passwordInput.current) {
          signInWithEmailAndPassword(
            auth,
            emailInput?.current?.value,
            passwordInput?.current?.value
          )
            .then((userCredential: any) => {
              const { uid, email, displayName } = userCredential.user;
              console.log("login... ", uid);
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              console.log(error);
              setAuthError({ firebaseErr: error.code });
            });
        }
      } else {
        //sign up
        if (emailInput.current && passwordInput.current) {
          createUserWithEmailAndPassword(
            auth,
            emailInput?.current?.value,
            passwordInput?.current?.value
          )
            .then((userCredential) => {
              const user = userCredential.user;
              if (user) {
                updateProfile(user, {
                  displayName: nameInput?.current?.value,
                });
              }
            })
            .then(() => {
              const { uid, email, displayName }: any = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setAuthError({ firebaseErr: error.code });
            });
        }
      }
    }
  };

  return (
    <div className="bg-[url('../assets/bg-image.jpg')]">
      <div className="text-center w-1/4 mx-auto backdrop-blur bg-black/70 p-4 my-4 rounded text-white">
        <h2 className="text-3xl font-semibold">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        {!isLogin && (
          <div className="flex justify-center flex-col item-center ">
            <label htmlFor="name" className="text-left">
              Enter Full Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameInput}
              placeholder="Email full name"
              className="border-2 rounded p-2"
            />
            {/* {emailError && (
            <span className="text-red-500 font-bold">{emailError}</span>
          )} */}
          </div>
        )}

        <div className="flex justify-center flex-col item-center ">
          <label htmlFor="email" className="text-left">
            Enter Email
          </label>
          <input
            type="text"
            id="email"
            ref={emailInput}
            placeholder="Email or mobile number"
            className="border-2 rounded p-2"
          />
          {authError?.email && (
            <span className="text-red-500 font-bold">{authError?.email}</span>
          )}
        </div>
        <div className="flex justify-center flex-col item-center">
          <label htmlFor="password" className="text-left">
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            ref={passwordInput}
            placeholder="Enter Password"
            className=" border-2 rounded p-2 "
          />
          {authError?.password && (
            <span className="text-red-500 font-bold">
              {authError?.password}
            </span>
          )}
        </div>
        {isLogin ? (
          <button
            className="bg-red-600 w-full text-xl border rounded my-2 py-2"
            onClick={handleLogin}
          >
            Sign In
          </button>
        ) : (
          <button
            className="bg-red-600 w-full text-xl border rounded my-2 py-2"
            onClick={handleLogin}
          >
            Sign Up
          </button>
        )}
        <button
          onClick={signInWithGoogle}
          className="border border-white rounded-full p-2 hover:bg-sky-700 flex justify-center text-center  w-full items-center gap-2 "
        >
          <img src={G_ICON} width={20} />
          <span>Login with Google</span>
        </button>
        {authError?.firebaseErr && (
          <span className="text-red-500 font-bold">
            {authError?.firebaseErr}
          </span>
        )}
        <p> OR </p>
        {isLogin ? (
          <div>
            New to Netflix ?
            <span
              className="hover:underline cursor-pointer font-bold"
              onClick={() => setIsLogin(false)}
            >
              Sign up now.
            </span>
          </div>
        ) : (
          <div>
            Already have account ?
            <span
              className="hover:underline cursor-pointer font-bold"
              onClick={() => setIsLogin(true)}
            >
              Sign in now.
            </span>
          </div>
        )}
        <span>-----------------</span>
        <p>xyz@gmail.com</p>
        <p>Testing_193</p>
      </div>
    </div>
  );
};

export default LoginSignup;
