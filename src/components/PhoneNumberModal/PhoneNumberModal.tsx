import { useState } from "react";

type Props = {
  onSuccess: (phoneNumber: string) => void;
};

export function PhoneNumberModal({ onSuccess }: Props) {
  const [phoneValue, setPhoneValue] = useState("");
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess(phoneValue);
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
              <span className="name">Номер телефона</span>
              <input
                type="text"
                value={phoneValue}
                onChange={(e) => setPhoneValue(e.target.value)}
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
