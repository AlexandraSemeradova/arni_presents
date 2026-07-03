import { useState } from "react";
import { normalizeEmail } from "../../../utils/helpers";
import "./Inputs.css";

function EmailInput({ onChange, setEmailIsValid, setEmail }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  console.log(value);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleChange = (e) => {
    const raw = e.target.value;
    const cleaned = normalizeEmail(raw);

    setValue(raw);

    if (!cleaned) {
      setError("Email je povinný.");
      setEmailIsValid(false);
    } else if (cleaned.length > 254) {
      setError("Email je príliš dlhý.");
      setEmailIsValid(false);
    } else if (!emailRegex.test(cleaned)) {
      setError("Zadaj platný email.");
      setEmailIsValid(false);
    } else {
      setError("");
      setEmailIsValid(true);
    }

    onChange?.(cleaned);
  };

  const handleBlur = () => {
    const cleaned = normalizeEmail(value);
    setValue(cleaned);
    setEmail(cleaned);
  };

  return (
    <div>
      <input
        id="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="napr. john.doe@gmail.com"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby={error ? "u-email-error" : undefined}
      />
      {error && (
        <span id="u-email-error">
          {error}
        </span>
      )}
    </div>
  );
}

export default EmailInput;