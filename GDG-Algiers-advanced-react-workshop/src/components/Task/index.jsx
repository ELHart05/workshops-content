function Task({ title, completed }) {
  return (
    <div style={{borde: '1px solid black', background: 'green', padding: '8px'}}>
        <h1>{title}</h1>
        <p>{(completed) ? 'done' : 'not done'}</p>
    </div>
  )
}

export default Task