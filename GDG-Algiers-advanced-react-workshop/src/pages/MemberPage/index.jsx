import { useParams } from "react-router-dom"

function MemberPage() {

  const params = useParams();

  return (
    <h1>this member name is: {params.name}</h1>
  )
}

export default MemberPage