export const formatCardNumber = (value) =>
    value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();

export const formatExpiry = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 3) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
};
