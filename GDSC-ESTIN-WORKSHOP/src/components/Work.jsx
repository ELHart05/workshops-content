function Work(props) {
    console.log(props);
    return (
        <>
            <p>Hello my name is {props.name}</p>
            <p>My age is {props.age}</p>
            <p>and {(props.isWorking) ? "I work" : "I Don't work"}</p>
            <hr />
        </>
    )
}

export default Work