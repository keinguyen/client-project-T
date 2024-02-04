import App from "../App";
import { SocketProvider } from "../store/socket";

export function Main() {
  return (
    <SocketProvider>
      <App />
    </SocketProvider>
  );
}
