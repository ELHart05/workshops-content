export default function Worker({ name, age, isWorking }) {
    return (
        <div>
            <h1>{name}</h1>
            <h2>{age}</h2>
            {isWorking ? 'working' : 'not working'}
            <hr />
        </div>
    )
}
