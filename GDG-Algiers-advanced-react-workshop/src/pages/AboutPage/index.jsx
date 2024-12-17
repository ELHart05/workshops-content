import { useEffect, useState } from "react";
import Task from "../../components/Task";

function AboutPage() {

  async function fetchTasks () {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    fetch(url).then((res) => res.json()).then((data) => {
      console.log("done");
      useData(data);
    }).catch((err) => {
      //err.message
      console.log("argh error");
      setIsError(true);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const [data, useData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
  }, []);
  
  return (
    <>
      <h1>GDG Algiers is a club of tech, and members should perform their tasks</h1>
      <div style={{display: 'grid', gap: '8px'}}>
        {(isLoading) ? <h1>Loading...</h1> : (isError) ? <h1>"there's error"</h1> : data.map((elemt) => (
          <Task title={elemt.title} completed={elemt.completed} key={elemt.id} />
        ))}
      </div>
    </>
  )
}

export default AboutPage