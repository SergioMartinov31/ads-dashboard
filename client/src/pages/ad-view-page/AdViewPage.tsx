import { useParams } from "react-router-dom"
import { useGetAdByIdQuery } from "@/entities/ad/api/adApi"
import { useNavigate } from "react-router-dom"

export const AdViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const {data, isLoading, error} = useGetAdByIdQuery({id: Number(id)})
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>
      <button onClick={() => navigate(`/ads/${id}/edit`)}>
          Редактировать
      </button>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <p>{data?.price}</p>
    </div>
  )

}