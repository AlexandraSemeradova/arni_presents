import { useState } from "react";
import { normalizeEmail } from "../../../utils/helpers";
import "./Inputs.css";

const EmailInput = ({
  label = "Email",
  placeholder = "napr. john.doe@gmail.com",
  defaultValue = "",
  onChange,
  validate = true, // možnosť vypnúť validáciu
}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const runValidation = (cleaned) => {
    if (!validate) return { isValid: true, error: "" };
    if (!cleaned) return { isValid: false, error: "Email je povinný." };
    if (cleaned.length > 254) return { isValid: false, error: "Email je príliš dlhý." };
    if (!emailRegex.test(cleaned)) return { isValid: false, error: "Zadaj platný email." };

    return { isValid: true, error: "" };
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const cleaned = normalizeEmail(raw);

    setValue(raw);

    const { isValid, error } = runValidation(cleaned);
    setError(error);

    onChange?.(cleaned, { isValid, error });
  };

  const handleBlur = () => {
    const cleaned = normalizeEmail(value);
    setValue(cleaned);

    const { isValid, error } = runValidation(cleaned);
    setError(error);

    onChange?.(cleaned, { isValid, error });
  };

  return (
    <div className="u-input-wrapper">
      {label && <label htmlFor="email">{label}</label>}

      <input
        id="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby={error ? "u-email-error" : undefined}
      />

      {error && <span id="u-email-error">{error}</span>}
    </div>
  );
}

export default EmailInput;