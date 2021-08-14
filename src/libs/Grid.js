function Grid(props) {

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", padding:"20px"}}>
            {props.children}
        </div>
    )
}

export default Grid