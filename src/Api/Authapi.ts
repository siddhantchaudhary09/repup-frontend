import axios from "axios";
import { FormData } from "../pages/Register.tsx";
import { logindata } from "../pages/SignIn.tsx";
import { addUser, removeUser } from "../store/authslice.ts";

export const SignupAPi = async (
  formdata: FormData,
  navigate: Function,
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  console.log("Formdata:", formdata);
  const { email, password, username, age, weight, height, gender, goal } =
    formdata;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN}/users/signup`,
      { email, password, username, age, weight, height, gender, goal },
      {
        withCredentials: true,
      }
    );

    if (response) {
      setIsloading(false);
      navigate("/");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const loginapi = async (
  logindetails: logindata,
  setIsloading: Function,
  navigate: Function,
  seterror: Function,
  dispatch: Function
) => {
  console.log("Login details:", logindetails);
  const { email, password } = logindetails;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN}/users/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response) {
      setIsloading(false);

      dispatch(addUser(response.data.user));
      navigate("/");
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Password is Incorrect";
    seterror(errorMessage);
    setIsloading(false);
    console.error("Error: auth", error);
  }
};

export const currentuserapi = async (dispatch: Function) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN}/users/getcurrentuser`,
      {},
      {
        withCredentials: true,
      }
    );

    const user = response.data?.user;

    if (user) {
      dispatch(addUser(user));
    } else {
      dispatch(removeUser());
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    dispatch(removeUser());
  }
};
