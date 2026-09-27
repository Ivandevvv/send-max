import type { Credentials } from "../types/credentials.type";
import {
  type ApiMessage,
  type ApiMessageDto,
  type SendMessageDto,
} from "../types/message.type";
import { API_URL } from "../utils/api-consts";

export async function sendMessage(
  { idInstance, apiTokenInstance }: Credentials,
  { phoneNumber, message }: SendMessageDto,
): Promise<{ idMessage: string }> {
  const request = await fetch(
    `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: `${phoneNumber}@c.us`,
        message,
      }),
    },
  );

  if (!request.ok) {
    throw new Error(`Failed to send message: ${request.status}`);
  }

  return request.json();
}

export async function pullMessage({
  idInstance,
  apiTokenInstance,
}: Credentials): Promise<ApiMessage | null> {
  const receiveNotification = await fetch(
    `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
  );

  if (!receiveNotification.ok) {
    throw new Error(`Failed to pull message: ${receiveNotification.status}`);
  }

  const responseMessage: ApiMessageDto | null =
    await receiveNotification.json();

  if (!responseMessage) {
    return null;
  }

  await deletePulledMessage(
    { idInstance, apiTokenInstance },
    responseMessage.receiptId,
  );

  return {
    type: "api",
    id: responseMessage.body.idMessage,
    text: responseMessage.body.messageData.textMessageData.textMessage,
  };
}

export async function deletePulledMessage(
  creds: Credentials,
  receiptId: number,
): Promise<void> {
  const { idInstance, apiTokenInstance } = creds;
  const deleteNotification = await fetch(
    `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    { method: "DELETE" },
  );

  if (!deleteNotification.ok) {
    throw new Error(
      `Failed to clear message quene: ${deleteNotification.status}`,
    );
  }
}
