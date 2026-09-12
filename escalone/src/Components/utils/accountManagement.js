
export const validateAccount = async (url, email, action) => {
    const response = await fetch(`${url}/api/gestion-cuenta`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, req: action })
    });
    return response;
};

export const sendActionRequest = async (url, endPoint, email) => {    
    const response = await fetch(`${url}${endPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, req: endPoint })
    });
    return response;
};

export const resetPasswordRequest = async (url, data) => {    
    const response = await fetch(`${url}/api/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            token: data.token,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
        }),
    });
    return response;
};