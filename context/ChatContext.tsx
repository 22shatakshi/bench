import { useAuth } from "./AuthContext";
import {
    createContext,
    useReducer,
    useContext,
} from "react";
  
export const ChatContext = createContext({});

  
export const ChatContextProvider = ({ children }) => {
    const { user } = useAuth();
    const INITIAL_STATE = {
      chatId: "default",
      user: {},
    };
  
    const chatReducer = (state: any, action: { type: any; payload: { uid: number; }; }) => {
      //could do other action such as block users
        switch (action.type) {
          case "CHANGE_USER":
            return {
              user: action.payload,
              chatId:
                user!.uid > action.payload.uid
                  ? user!.uid + action.payload.uid
                  : action.payload.uid + user!.uid,
            };
            case "BLOCK_USER": 
              return {
                user: {},
                chatId: "default",
              }
    
          default:
            return state;
        }
    };
      
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
      
    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
          {children}
        </ChatContext.Provider>
    );
};