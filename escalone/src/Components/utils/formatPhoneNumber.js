export const formatPhoneNumber = (phone) =>
{
	if(!phone) return ""

	const cleaned = ("" + phone).replace(/\D/g,"");

	const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);

	if(match)
	{
		return `${match[1]} ${match[2]}-${match[3]}`;
	}

	return cleaned
}