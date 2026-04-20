import React, { useState, type ReactElement } from 'react'

type FormData = {
  firstName: string
  lastName: string
  email: string
  birthDate: string // formato YYYY-MM-DD
}

type Status = 'idle' | 'loading' | 'success' | 'error'

function AddUserForm(): ReactElement {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: ''
  })

  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones simples
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.birthDate
    ) {
      setStatus('error')
      setMessage('Por favor completa todos los campos.')
      return
    }

    if (!emailRegex.test(formData.email)) {
      setStatus('error')
      setMessage('El email no es válido.')
      return
    }

    setStatus('loading')
    setMessage(null)

    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          birthDate: formData.birthDate
        })
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Error al crear el usuario')
      }

      setStatus('success')
      setMessage('Usuario creado con éxito.')
      setFormData({ firstName: '', lastName: '', email: '', birthDate: '' }) // limpio formulario despues de éxito
    } catch (err) {
      setStatus('error')
      setMessage((err as Error).message)
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Formulario de carga de usuario" noValidate>
      <div>
        <label htmlFor="firstName">Nombre</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Apellido</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="birthDate">Fecha de Nacimiento</label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={status === 'loading'}>
        Crear usuario
      </button>

      <div role="status" aria-live="polite" style={{ marginTop: 8 }}>
        {status === 'loading' && <span>Enviando...</span>}
        {status === 'success' && <span style={{ color: 'green' }}>{message}</span>}
        {status === 'error' && <span style={{ color: 'red' }}>{message}</span>}
      </div>
    </form>
  )
}

export default AddUserForm