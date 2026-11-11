import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiHelpers } from '../utils/ApiHelpers';

export const useGoogleAuth=()=>{
	const [loading, setLoading] = useState(false)
	const url = import.meta.env.VITE_API_URL
	const navigate = useNavigate();

	const handleGoogleSuccess = async(credentialsResponse)=>{
		setLoading(true)
		try{
			const response = await fetch(`${url}/api/login-google`,{
				method:'POST',
				headers:{
					'Content-Type':'application/json',
					Accept: "application/json",
				},
				body: JSON.stringify({token: credentialsResponse.credential})
			})			
			if(response.ok){
				const data = await response.json()
				console.log(data)
				sessionStorage.setItem('usuario',JSON.stringify(data.user))
				sessionStorage.setItem("token",data.token)
				toast.success(data.message,{
					onClose: () => navigate("/")
				})
				return
			}
			const respuesta = await ApiHelpers(response)
			toast.error(respuesta)
		}catch(error){
			console.log(error)
			toast.error("El servidor no esta disponible. Por favor intente más tarde")
		}finally{
			setLoading(false)
		}

	}

	return{ handleGoogleSuccess, loading}
}

