import '../App.css'
function Grid(props) {

    return (
        <div className="grid m-10">
            {props.children}
        </div>
    )
}

export default Grid