import './CardUser.css'

type CardProps = {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  birthDate: string,
  fechaAlta: string
}

function Card({ firstName, lastName, email, age, birthDate, fechaAlta}: CardProps) {

  return (
    <div className="card">
      <span className={`card-badge card-badge--${fechaAlta}`}>{fechaAlta}</span>
      <h2>{firstName} {lastName}</h2>
      <p>Email: {email}</p>
      <p>Edad: {age}</p>
      <p>Fecha de Nacimiento: {birthDate}</p>
    </div>
  )
}

export default Card
