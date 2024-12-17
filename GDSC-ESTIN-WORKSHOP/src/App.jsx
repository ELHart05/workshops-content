import WorkList from "./components/WorkList"

function App() {
  const employers = [
    {
      name: "Okba",
      age: 20,
      isWorking: true
    },
    {
      name: "Malek",
      age: 18,
      isWorking: false
    },
    {
      name: "Ghafour",
      age: 20,
      isWorking: true
    },
    {
      name: "BelgouJR",
      age: 18,
      isWorking: false
    },
    {
      name: "BelgouSR",
      age: 23,
      isWorking: true
    },
  ]
  
  return (
    <WorkList workers={employers} />
  )
}

export default App
