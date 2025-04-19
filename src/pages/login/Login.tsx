// src/pages/LoginPage.tsx

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { authService } from "../../api/auth"
import { styled } from "@stitches/react"
import biztripLogo from "../../assets/logo.svg"

const Wrapper = styled("div", {
  display: "flex",
  height: "100vh",
  width: "100vw",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#c2ccd6",
  fontFamily: "Inter, sans-serif",
})

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
  backgroundColor: "#f0f2f5",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",


  "@media(max-width: 480px)": {
    marginLeft: "1rem",
    marginRight: "1rem",
  },
})

const Logo = styled("img", {
  width: "150px", // ou o tamanho que quiser
  alignSelf: "center", // centraliza horizontalmente no Form (que é flex)
  marginBottom: "1rem", // espaço abaixo do logo
})


const Input = styled("input", {
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
})

const Button = styled("button", {
  padding: "0.75rem",
  fontSize: "1rem",
  backgroundColor: "#0064c5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
})

const ErrorText = styled("p", {
  color: "red",
  fontSize: "0.875rem",
  textAlign: "center",
})

export function LoginPage() {
  const [email, setEmail] = useState("testefront@gmail.com")
  const [password, setPassword] = useState("password")
  const navigate = useNavigate()

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => authService.login(email, password),
    onSuccess: () => {
      navigate("/credentials")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Logo src={biztripLogo} />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
        {error && <ErrorText>Usuário ou senha inválidos</ErrorText>}
      </Form>
    </Wrapper>
  )
}
