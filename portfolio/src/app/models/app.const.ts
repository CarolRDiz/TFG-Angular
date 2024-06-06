export const APP_CONSTS = {
    emailRegex: "^[a-zA-ZÀ-ÿ\u00f1\u00d10-9.!#$%&'*+\\=?^_`{|}~-]+@[a-zA-ZÀ-ÿ\u00f1\u00d10-9-]+(?:\.[a-zA-ZÀ-ÿ\u00f1\u00d10-9-]+)*$",
    phoneRegex: /^[0-9]\d{2,4}-\d{8,8}$/,
    postalCodeRegex: /^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/,
    cityRegex: /^[a-zA-Z0-9 ]{1,254}$/,
    nameRegex: /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9 ]{1,254}$/
}