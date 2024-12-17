function Hello (props) {
    console.log(props.name);
    return (
        <h1>hello {props.name}</h1>
    )
}

export default Hello