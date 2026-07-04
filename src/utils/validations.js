  export const runEmailValidation = (cleaned, validate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!validate) return { isValid: true, error: "" };
    if (!cleaned) return { isValid: false, error: "Email je povinný." };
    if (cleaned.length > 254) return { isValid: false, error: "Email je príliš dlhý." };
    if (!emailRegex.test(cleaned)) return { isValid: false, error: "Zadaj platný email." };
    return { isValid: true, error: "" };
  };