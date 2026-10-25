// Built-in contact details. The live values come from site settings in the
// admin; these seed the database and act as the fallback.
export const contactEmail = "kobinakyereboah2121@gmail.com";
export const contactPhoneDisplay = "0553730959";

const defaultCountryCode = "233";

/**
 * Turns a phone number as typed in site settings into a tel: link. Local
 * numbers that start with 0 are treated as Ghanaian (+233).
 */
export function getPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");

  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.startsWith("00")) return `tel:+${digits.slice(2)}`;
  if (digits.startsWith("0")) {
    return `tel:+${defaultCountryCode}${digits.slice(1)}`;
  }

  return `tel:+${digits}`;
}
