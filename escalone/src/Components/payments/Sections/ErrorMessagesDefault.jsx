export const ErrorMessagesDefault = ({ title, textError, textMessages }) => {
    return (
        <div className="text-center container mt-4">
            <h5 className="fw-bold fs-2">❌ {title}</h5>
            <hr />
            <p className="fs-3">{textError}</p>
            <p className="fs-4">{textMessages}</p>
        </div>
    )
}