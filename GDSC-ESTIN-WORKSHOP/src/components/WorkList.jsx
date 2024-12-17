import Work from "./Work"

const WorkList = (props) => {
    console.log(props);
    return (
        <>
            {
                props.workers.map((employ, index) => (
                    <Work name={employ.name} age={employ.age} isWorking={employ.isWokring} />
                ))
            }
        </>
    )
}

export default WorkList