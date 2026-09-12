
export const SectionError = ({textError}) => {
    return (
        <div className="alert alert-warning text-center py-5 shadow-sm">
            <i className="fa-solid fa-triangle-exclamation fa-2x mb-3 text-warning"></i>
            <h4>Atención</h4>
            <p>{textError}</p>
        </div>
    )
}