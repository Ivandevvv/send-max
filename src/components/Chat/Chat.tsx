import { useEffect, useState } from "react";
import type { Credentials } from "../../types/credentials.type";
import classes from "./Chat.module.scss";
import sendIcon from "@assets/send.svg";
import { type ChatMessage, type LocalMessage } from "../../types/message.type";
import { pullMessage, sendMessage } from "../../services/chat.api";

type Props = {
  credentials: Credentials;
  phoneNumber: string;
};

export function Chat({ credentials, phoneNumber }: Props) {
  const [messages, setMessage] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    let cancelled = false;
    const pull = async () => {
      try {
        const apiMessage = await pullMessage(credentials);
        if (cancelled) {
          return;
        }

        if (apiMessage) {
          setMessage((prev) => [...prev, apiMessage]);
        }
      } catch (e) {
        console.error(e);
      }

      if (!cancelled) {
        setTimeout(pull, 2000);
      }
    };

    pull();

    return () => {
      cancelled = true;
    };
  }, [phoneNumber, credentials]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      return;
    }

    const msg: LocalMessage = {
      id: crypto.randomUUID(),
      text: messageText,
      type: "local",
    };

    setMessage((prev) => [...prev, msg]);
    setMessageText("");

    try {
      await sendMessage(credentials, {
        phoneNumber,
        message: messageText,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.Chat}>
      <div className={classes.ChatMessages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${classes.ChatMessageItem} ${msg.type === "local" ? classes.LocalMessage : classes.ApiMessage}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className={classes.ChatInput}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={handleSendMessage}>
          <img src={sendIcon} alt="icon-send" />
        </button>
      </div>
    </div>
  );
}
