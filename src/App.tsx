import "./App.scss";
import { CredentialsModal } from "./components/CredentialsModal/CredentialsModal";
import Sidebar from "./components/Sidebar/Sidebar";
import { PhoneNumberModal } from "./components/PhoneNumberModal/PhoneNumberModal";
import { Chat } from "./components/Chat/Chat";
import type { Credentials } from "./types/credentials.type";
import { useState } from "react";

function App() {
  const [credentials, setCredentials] = useState<Credentials>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const isAuth = !!credentials;
  const phoneNumberFilled = !!phoneNumber;

  return (
    <div className="root-wrapper">
      <Sidebar chatId={phoneNumber} />

      {isAuth && phoneNumberFilled && (
        <Chat credentials={credentials} phoneNumber={phoneNumber} />
      )}

      {!isAuth && <CredentialsModal onSuccess={setCredentials} />}
      {isAuth && !phoneNumberFilled && (
        <PhoneNumberModal onSuccess={setPhoneNumber} />
      )}
    </div>
  );
}

export default App;
