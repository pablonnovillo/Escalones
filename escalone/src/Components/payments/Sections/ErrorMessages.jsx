import { Link } from "react-router-dom"


export const ErrorMessages = ({ textError, defaultMessage }) => {
    return (
        <div className="alert alert-danger mt-4">
            <h4>❌ Error</h4>
            <p>{textError || defaultMessage}</p>
            <Link to="/" className="btn btn-outline-danger mt-2">Volver</Link>
        </div>
    )
}