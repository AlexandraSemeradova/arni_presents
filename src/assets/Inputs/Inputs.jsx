import { useState } from "react";
import "./Inputs.css"

function EmailInput({ onChange, setEmailIsValid }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const normalizeEmail = (raw) => {
    return raw
      .trim()                 // odstráni medzery na začiatku/konci
      .replace(/\s+/g, "");   // odstráni medzery aj uprostred
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const cleaned = normalizeEmail(raw);

    setValue(raw); // zobrazujeme to, čo píše user (aj s medzerami)

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
    setValue(cleaned); // po opustení inputu automaticky opravíme
  };

  return (
    <div>
      {/* <label htmlFor="email">Email</label> */}
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
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <span id="email-error">
          {error}
        </span>
      )}
    </div>
  );
}

export default EmailInput;
