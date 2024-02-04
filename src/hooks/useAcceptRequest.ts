import { useEffect, useState } from "react";
import { useSocketSelector } from "../store/socket";

export function useAcceptRequest() {
  const socket = useSocketSelector((store) => store.socket);
  const [isAccepted, setIsAccepted] = useState();

  useEffect(() => {
    
  }, [socket]);
}