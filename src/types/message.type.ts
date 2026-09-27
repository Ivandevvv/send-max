export type ChatMessage = LocalMessage | ApiMessage;

export interface SendMessageDto {
  phoneNumber: string;
  message: string;
}

export interface ApiMessageDto {
  receiptId: number;
  body: {
    typeWebhook: "incomingMessageReceived";
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      chatType: string;
      sender: string;
      senderName: string;
      senderType: string;
      senderContactName: string;
      senderPhoneNumber: number;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

interface ChatMessageBase {
  id: string;
  type: "local" | "api";
  text: string;
}

export interface LocalMessage extends ChatMessageBase {
  type: "local";
}

export interface ApiMessage extends ChatMessageBase {
  type: "api";
}
