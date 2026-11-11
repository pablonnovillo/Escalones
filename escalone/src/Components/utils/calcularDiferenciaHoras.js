export const calcularDiferenciaHoras = (inicio, fin) =>{
	if(!inicio || !fin) return 0

	const [hInicio, mInicio] = inicio.split(':').map(Number);
	const [hFin, mFin] = fin.split(':').map(Number);

	const totalMinutos = (hFin * 60 + mFin) - (hInicio * 60 + mInicio);
	const horas = totalMinutos / 60;

	return horas > 0 ? horas : 1;


}

