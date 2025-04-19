"use client";
const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";
import Cookies from "js-cookie";
import {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  useState,
} from "react";

// Define types for the state and actions
interface AuthState {
  company: any | null; // Define a more specific type if you have a structure for the company
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_SUCCESS" }
  | { type: "LOGOUT" }
  | { type: "COMPANY_DATA_LOADED"; payload: any };

// Initial state with company set to null
const initial_state: AuthState = {
  company: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: initial_state, dispatch: () => undefined });

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      // Set user data from the response
      Cookies.set("accessToken", action.payload.token); // Store the token
      return {
        ...state,
        company: action.payload.company,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case "COMPANY_DATA_LOADED": // Handle the comapny data
      return { ...state, company: action.payload };
    case "LOGIN_FAILURE":
      return { ...state, company: null, loading: false, error: action.payload };
    case "REGISTER_SUCCESS":
      return { ...state, company: null, loading: false, error: null };
    case "LOGOUT":
      Cookies.remove("accessToken"); // Remove the token when logging out
      return {
        ...state,
        company: null,
        isLoggedIn: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    const fetchCompany = async () => {
      if (state.isLoggedIn) {
        // Only attempt to fetch company data if a token exists
        try {
          const response = await fetch(`${base_url}/auth/login/company`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log("the data from response.ok AuthContext :", data);
            dispatch({ type: "COMPANY_DATA_LOADED", payload: data });
          } else {
            // Handle errors, potentially by logging out
            dispatch({ type: "LOGOUT" }); // Or another action
            console.log("Company Logged Out");
            console.error("Error fetching company data: Invalid token");
          }
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      }
    };

    fetchCompany();
    return () => {
      // Cleanup
    };
  }, [state.isLoggedIn]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
