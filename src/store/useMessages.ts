import create from "zustand";
import { MessageType } from './../model/message';


interface MessagesState {
    messages: MessageType[];
    addMessage: (Message: MessageType) => void;
    removeMessage: (id: string) => void;
  }
  export const useMessages = create<MessagesState>((set) => ({

    // @ts-ignore
    messages: JSON.parse(localStorage.getItem("messages")) || [],

    addMessage: (mess: MessageType) => {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: mess.id,
            message: mess.message,
            url: mess.url,
            createdAt: mess.createdAt,
          } as MessageType,
        ],
      }));
      
    },
    removeMessage: (id) => {
      set((state) => ({
        messages: state.messages.filter((mess) => mess.id !== id),
      }));
    },
   
  }));