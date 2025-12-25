import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { axios, socket } = useContext(AuthContext);

    // function to get all users for sidebar
    const getUsers = async() => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
              setUnseenMessages(data.unseenMessages);
              setUsers(data.users);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    // function to get message from selected user
    const getMessages = async (userId) =>{
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages)
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    //function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(!data.success){
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        }
    }

    //function to subscribe to messages for selected user
    const subscribeToMesssages = async () => {
        if(!socket) return;
        socket.on('newMessage', (newMessage)=>{
            if (
              (selectedUser && newMessage.senderId === selectedUser._id) ||
              newMessage.receiverId === selectedUser._id
            ) {
              newMessage.seen = true;
              setMessages((prevMessages) => [...prevMessages, newMessage]);
              axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
              setUnseenMessages((previousUnseenMessages) => ({
                ...previousUnseenMessages,
                [newMessage.senderId]: previousUnseenMessages[
                  newMessage.senderId
                ]
                  ? previousUnseenMessages[newMessage.senderId] + 1
                  : 1,
              }));
            }
        })
    }

    //function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if(socket) socket.off('newMessage');
    }

    useEffect(()=>{
        subscribeToMesssages();
        return ()=> unsubscribeFromMessages();
    },[socket, selectedUser]);

    const value = {
        messages, users, selectedUser, getUsers, sendMessage, getMessages,setSelectedUser, unseenMessages, setUnseenMessages
    };
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}