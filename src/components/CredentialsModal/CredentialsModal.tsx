import { useState } from "react";
import { API_TOKEN_INSTANCE, INSTANCE_ID } from "../../utils/credentials-keys";
import type { Credentials } from "../../types/credentials.type";

type Props = {
  onSuccess?: (credentials: Credentials) => void;
};

export function CredentialsModal({ onSuccess }: Props) {
  const [idInstance, setInstanceId] = useState("");
  const [apiTokenInstance, setApiToken] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess?.({ idInstance, apiTokenInstance });
  };

  return (
    <>
      <div className="background">
        <div className="backdrop"></div>
        <form className="modal" onSubmit={handleSubmit}>
          <div className="modal-header">
            <span>Вход</span>
          </div>

          <div className="modal-body">
            <label className="field">
              <span className="name">{INSTANCE_ID}</span>
              <input
                type="text"
                value={idInstance}
                onChange={(e) => setInstanceId(e.target.value)}
              />
            </label>

            <label className="field">
              <span className="name">{API_TOKEN_INSTANCE}</span>
              <input
                type="text"
                value={apiTokenInstance}
                onChange={(e) => setApiToken(e.target.value)}
              />
            </label>
          </div>

          <div className="modal-footer">
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </>
  );
}
