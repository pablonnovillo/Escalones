
export const handleCreatePreference = async (params) => {
    const { setIsLoading, setShowDirectForm, setShowWallet, setPreferenceId, url, serviceTitle, serviceSenia, email, toast } = params;

    setIsLoading(true);
    setShowDirectForm(false);
    setShowWallet(false);
    localStorage.setItem("modo-pago", "MercadoPago");

    try {
        const res = await fetch(`${url}/api/mercadopago/preference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: serviceTitle,
                quantity: 1,
                price: serviceSenia,
                email
            })
        });
        
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        const data = await res.json();
        setPreferenceId(data.preferenceId);
        setShowWallet(true);

        if (data.init_point) window.location.href = data.init_point;
    } catch (error) {
        toast.error("Error al procesar el pago");
    } finally {
        setIsLoading(false);
    }
};

export const handlePagarDirecto = (e, params) => {
    e.preventDefault();
    const { cardData, valid, toast, navigate } = params;
    const { number, name, expiry, cvv } = cardData;

    if (!number || !name || !expiry || !cvv) {
        toast.error("Por favor, completa todos los campos de la tarjeta")
        return;
    }

    const numberValidation = valid.number(cardData.number)
    
    const expiryValidation = valid.expirationDate(cardData.expiry)
    const cvvValidation = valid.cvv(cardData.cvv)
   

    if (!numberValidation.isValid) {
        toast.error("Numero de tarjeta invalido")
        return
    }

    if (!expiryValidation.isValid) {
        toast.error("Fecha de vencimiento no valido")
        return
    }

    if (!cvvValidation.isValid) {
        toast.error("CVV no valido")
        return
    }

     const methodPayment = numberValidation.card.niceType

    localStorage.setItem("modo-pago", methodPayment);
    toast.success("Pago confirmado", { onClose: () => navigate('/pago-verificado') });
};