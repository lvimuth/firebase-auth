"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firbase/config";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await sendEmailVerification(user);
        setMessage("Account created successfully! Please verify your email.");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (!user.emailVerified) {
          setMessage("Please verify your email before logging in.");
        } else {
          setMessage("Signed in successfully!");
        }
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 dark:text-blue-400"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
