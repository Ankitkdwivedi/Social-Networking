import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    console.log(authUser.username,"usersdklfjdskfjkdsjfkdsjfkjskfjlsdklfj");

    const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (authUser) {
            const newSocket = io("http://localhost:3001/chat", {
                query: {
                    userId: authUser._id,
                },
            });
            console.log(newSocket,"this is kdfkldskfkdsfkdfk");
            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser, isLoading]); // Add isLoading to dependencies

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
