import { useEffect } from "react"
import Name from "./components/Name"
import Worker from "./components/Worker"
import Counter from "./components/Counter";

function App() {

  useEffect(() => {
    console.log('first render')
  }, []);

  const workers = [
    {
      name: 'Said',
      age: 25,
      isWorking: true
    },
    {
      name: 'Hamid',
      age: 18,
      isWorking: false
    },
    {
      name: 'Khalid',
      age: 30,
      isWorking: true
    }
  ]

  return (
    <>
      <Counter />
      <hr />
      <Name name="Okba" />
      <hr />
      <Name name="Mahmoud" />
      <hr />
      {/* <Worker name="Said" age={25} isWorking={true} />
      <hr />
      <Worker name="Hamid" age={18} isWorking={false} /> */}
      {
        workers.map((worker, index) => (
          <div key={index}>
            <span>index: {index+1}</span>
            <Worker
              key={index}
              name={worker.name}
              age={worker.age}
              isWorking={worker.isWorking}
            />
          </div>
        ))
      }
    </>
  )
}

export default App
