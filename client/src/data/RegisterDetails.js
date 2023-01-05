export const LOGIN_FORM_FIELDS = [
    {
        type: "text",
        heading: "Username",
        name: "username"
    },
    {
        type: "password",
        heading: "Password",
        name: "password"
    },
]

export const REGISTER_FORM_FIELDS = [
    {
        type: "text",
        heading: "Username",
        name: "username"
    },
    {
        type: "email",
        heading: "Email",
        name: "email"
    },
    {
        type: "password",
        heading: "Password",
        name: "password"
    },{
        type: "password",
        heading: "Confirm Password",
        name: "passwrdToConfirm"
    },
]

export const PROFILE_FORM_FIELDS = [
    {
        type: "number",
        heading: "Age",
        name: "age"
    },
    {
        type: "dropdown",
        heading: "Gender",
        name: "gender"
    },
    {
        type: "number",
        heading: "Height(in cm)",
        name: "height"
    },
    {
        type: "number",
        heading: "Weight(in kg)",
        name: "weight"
    },
]

export const RESET_PASSWORD_FORM_FIELDS = [
    {
        type: "email",
        heading: "Enter your email",
        name: "email"
    },
]