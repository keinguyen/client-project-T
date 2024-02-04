import { useEffect, useState } from "react";
import { useSocketSelector } from "../store/socket";

export function useConnectionList() {
  const socket = useSocketSelector((store) => store.socket);
  const [connectionList, setConnectionList] = useState([] as string[]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('userlist:change', (data) => {
      setConnectionList(data);
    });
    socket.emit("userlist:request");

    return () => {
      socket.off('userlist:change', setConnectionList);
    };
  }, [socket]);

  return {
    connectionList,
  };
}
