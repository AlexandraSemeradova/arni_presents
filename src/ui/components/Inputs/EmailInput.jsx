import { useState, useId } from "react";
import { normalizeEmail } from "../../../utils/helpers";
import "./Inputs.css";

const EmailInput = ({
  label = "Email",
  name,
  placeholder = "napr. john.doe@gmail.com",
  value = "",
  onChange,
  validate = true,
  autoComplete = "email",
}) => {
  const [touched, setTouched] = useState(false);

  const inputId = useId();
  const errorId = `${inputId}-error`;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const runValidation = (cleaned) => {
    if (!validate) return { isValid: true, error: "" };
    if (!cleaned) return { isValid: false, error: "Email je povinný." };
    if (cleaned.length > 254) return { isValid: false, error: "Email je príliš dlhý." };
    if (!emailRegex.test(cleaned)) return { isValid: false, error: "Zadaj platný email." };
    return { isValid: true, error: "" };
  };

  const cleaned = normalizeEmail(value);
  const { isValid, error } = runValidation(cleaned);

  const handleChange = (e) => {
    const raw = e.target.value;
    const cleaned = normalizeEmail(raw);
    const result = runValidation(cleaned);

    onChange?.(cleaned, result);
  };

  return (
    <div className="u-input-wrapper">
      {label && <label htmlFor={inputId}>{label}</label>}

      <input
        id={inputId}
        type="email"
        inputMode="email"
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        aria-invalid={touched && !!error}
        aria-describedby={touched && error ? errorId : undefined}
      />

      {touched && error && (
        <span id={errorId} className="u-error-input">{error}</span>
      )}
    </div>
  );
};

export default EmailInput;
