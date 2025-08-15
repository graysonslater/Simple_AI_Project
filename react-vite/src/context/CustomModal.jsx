
function CustomModal ({children, onClose=()=>{return}}){

    return(
        <div
    onClick={onClose}    
    style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    }}
>
    <div
        onClick={(e) => e.stopPropagation()}
        style={{
            background: "transparent",
            maxHeight: "90vh",
            maxWidth: "90vw",
            margin: "auto",
            zIndex: 10000,
            overflow: "auto",
        }}
    >
        {children}
    </div>
</div>
    )
}

export default CustomModal;