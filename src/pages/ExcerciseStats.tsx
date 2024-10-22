import { useParams } from "react-router";

function ExcerciseStats() {
  const param = useParams();
  const { id } = param;
  console.log(id);
  return <div>ExcerciseStats</div>;
}

export default ExcerciseStats;
