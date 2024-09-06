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
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import useApiToast from "../hooks/useApiToast";
import { log } from "console";
import { Toaster } from "react-hot-toast";

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
  const { showToast, toastId } = useApiToast();

  //google sign in
  const signInWithGoogle = async () => {
    showToast("Signing in with Google...", "loading");
    try {
      const response = await signInWithGooglePopup();
      console.log(response);
      showToast("Successfully signed in with Google!", "success");
    } catch (err: any) {
      console.log(err.message);
      showToast("Failed to sign in with Google", "error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
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
    }

    showToast(isLogin ? "Signing in..." : "Creating account...", "loading");

    try {
      if (isLogin) {
        //login
        if (emailInput.current && passwordInput.current) {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            emailInput.current.value,
            passwordInput.current.value
          );
          const { uid, email, displayName } = userCredential.user;
          console.log("login... ", uid);
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
          showToast("Successfully signed in!", "success");
        }
      } else {
        //sign up
        if (emailInput.current && passwordInput.current && nameInput.current) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            emailInput.current.value,
            passwordInput.current.value
          );
          const user = userCredential.user;
          if (user) {
            await updateProfile(user, {
              displayName: nameInput.current.value,
            });
          }
          const { uid, email, displayName } = auth.currentUser || {};
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
          showToast("Account created successfully!", "success");
        }
      }
    } catch (error: any) {
      setAuthError({ firebaseErr: error.code });
      showToast(`Authentication failed: ${error.message}`, "error");
    }
  };

  return (
    <div className="h-screen flex items-center text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-center w-5/6 sm:w-4/6 md:w-2/6 mx-auto backdrop-blur rounded-md bg-black/70 p-8 my-4 ">
        <h2 className="text-3xl font-semibold pb-7 ">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        {!isLogin && (
          <div className="relative flex justify-center flex-col gap-8 item-center ">
            <label htmlFor="name" className="text-left sr-only">
              Enter Full Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameInput}
              placeholder="Email full name"
              className="border-2 rounded p-2 mb-2 pl-10"
            />
            <span className="absolute top-2 left-2 text-xl">
              <FaUser />
            </span>
          </div>
        )}
        <div className="relative flex justify-center flex-col gap-8  item-center ">
          <label htmlFor="email" className="text-left sr-only ">
            Enter Email
          </label>
          <input
            type="text"
            id="email"
            ref={emailInput}
            placeholder="Email or mobile number"
            className="border-2 rounded p-2 mb-2 pl-10"
          />
          <span className="absolute top-2 left-2 text-xl">
            <FaEnvelope />
          </span>
          {authError?.email && (
            <p className="text-red-500 font-bold">{authError.email}</p>
          )}
        </div>
        <div className="relative flex justify-center flex-col item-center ">
          <label htmlFor="password" className="text-left sr-only">
            Enter Password
          </label>
          <input
            type="password"
            id="email"
            ref={passwordInput}
            placeholder="Enter password"
            className="border-2 rounded p-2 mb-1 pl-10"
          />
          <span className="absolute top-2 left-2 text-xl">
            <FaLock />
          </span>
          {authError?.password && (
            <span className="text-red-500 font-bold">
              {authError?.password}
            </span>
          )}
        </div>
        {isLogin ? (
          <button
            className="rounded-md w-full text-xl border my-2 py-2"
            onClick={handleLogin}
          >
            Sign In
          </button>
        ) : (
          <button
            className="rounded-md w-full text-xl border my-2 py-2"
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
        <div className="border flex flex-col my-4">
          <span className="font-bold text-md">Dummy user and pass</span>
          <code>xyz@gmail.com</code> <blockquote>Testing_193 </blockquote>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
