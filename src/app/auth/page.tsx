"use client"

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  fullName?: string;
  email: string;
  password: string;
};

function Auth() {

  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setMessage(null);

    if (isSignUp) {
      // ثبت‌نام
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.fullName || "" },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Registration successful! Please check your email.");
        reset();
      }
    } else {
      // ورود
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Welcome back!");
        setTimeout(() => {
          router.push("/"); // انتقال به صفحه اصلی
        }, 1000);
      }
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (user) {
    return (
      <div className="mx-4 lg:mx-24 mb-[11.56rem] lg:mb-[13.75rem]">
        <div className="bg-black opacity-10 w-full h-[0.06rem] mb-[1.41rem] lg:my-6"></div>
        <div className="flex items-center gap-1 lg:gap-3">
            <h3 className="text-sm font-normal opacity-60 lg:text-base">Home</h3>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
                </svg>
            </span>
            <h3 className="text-sm font-normal lg:text-base capitalize">Account</h3>
        </div>
        <h1 className="text-[2rem] font-bold font1 tracking-wider mt-2 mb-5 lg:text-[2.5rem] lg:my-6">
          Welcome, {user.user_metadata?.full_name || user.email}
        </h1>
        <button onClick={handleSignOut} className="bg-black text-sm font-medium py-3 px-8 rounded-[3.87rem] text-white cursor-pointer lg:text-base border border-black transition-colors duration-400 hover:border hover:border-[#0000001a] hover:bg-white hover:text-black">Sign Out</button>
      </div>
    );
  }


  return (
    <div className="mx-4 lg:mx-24 mb-[11.56rem] lg:mb-[13.75rem]">
        <div className="bg-black opacity-10 w-full h-[0.06rem] mb-[1.41rem] lg:my-6"></div>
        <div className="flex items-center gap-1 lg:gap-3">
            <h3 className="text-sm font-normal opacity-60 lg:text-base">Home</h3>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <path d="M5.71433 2.6607L10.0893 7.0357C10.1505 7.09666 10.1991 7.16911 10.2322 7.24888C10.2653 7.32865 10.2823 7.41417 10.2823 7.50054C10.2823 7.58691 10.2653 7.67243 10.2322 7.7522C10.1991 7.83197 10.1505 7.90442 10.0893 7.96538L5.71433 12.3404C5.59105 12.4637 5.42384 12.5329 5.24949 12.5329C5.07514 12.5329 4.90793 12.4637 4.78464 12.3404C4.66136 12.2171 4.5921 12.0499 4.5921 11.8755C4.5921 11.7012 4.66136 11.534 4.78464 11.4107L8.69535 7.49999L4.7841 3.58929C4.66081 3.46601 4.59155 3.2988 4.59155 3.12445C4.59155 2.9501 4.66081 2.78289 4.7841 2.6596C4.90738 2.53632 5.07459 2.46706 5.24894 2.46706C5.42329 2.46706 5.5905 2.53632 5.71379 2.6596L5.71433 2.6607Z" fill="black" fillOpacity="0.6"/>
                </svg>
            </span>
            <h3 className="text-sm font-normal lg:text-base capitalize">Account</h3>
        </div>
        <h1 className="uppercase text-[2rem] font-bold font1 tracking-wider mt-2 mb-5 lg:text-[2.5rem] lg:my-6">Sign Up / Sign In</h1>
         

        <div className="flex flex-col items-center justify-center mx-auto border-1 border-[#0000001a] rounded-[1.25rem] w-full p-1 mt-5 lg:w-1/3 lg:mt-0 lg:px-6 lg:py-5 ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 rounded-lg w-full max-w-sm"
            >
                <h2 className="text-[1.25rem] font-bold lg:text-2xl text-center mb-5">
                {isSignUp ? "Sign Up" : "Sign In"}
                </h2>

                {isSignUp && (
                <input
                    {...register("fullName", { required: true })}
                    type="text"
                    placeholder="Full Name"
                    className="opacity-60 outline-none bg1 rounded-[3.87rem] py-3 px-4 w-full mb-[0.62rem] lg:mb-5"
                />
                )}

                <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="opacity-60 outline-none bg1 rounded-[3.87rem] py-3 px-4 w-full mb-[0.62rem] lg:mb-5"
                />

                <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Password"
                className="opacity-60 outline-none bg1 rounded-[3.87rem] py-3 px-4 w-full mb-[0.62rem] lg:mb-5"
                />

                {error && <p className="text-red-500 mb-3">{error}</p>}
                {message && <p className="text-green-600 mb-3">{message}</p>}

                <button
                type="submit"
                className="bg-black text-sm w-full font-medium py-3 px-8 rounded-[3.87rem] mb-5 text-white cursor-pointer lg:text-base border border-black transition-colors duration-400 hover:border hover:border-[#0000001a] hover:bg-white hover:text-black"
                >
                {isSignUp ? "Create Account" : "Login"}
                </button>

                <p
                className="text-base font-normal opacity-60 lg:text-base text-center cursor-pointer"
                onClick={() => setIsSignUp(!isSignUp)}
                >
                {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </p>
            </form>
        </div>
          
    </div>
  )
}

export default Auth;
