export const incrementEmail = (email: string, valueToIncrement: number) => {
  const [name, domain] = email.split("@");
  return `${name}+${valueToIncrement}@${domain}`;
};
