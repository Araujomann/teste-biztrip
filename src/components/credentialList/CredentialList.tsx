import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { credentialService } from "../../api/credentials";
import { Credential } from "../../api/types";
import { styled } from "@stitches/react";
import toast from "react-hot-toast";

const Container = styled("div", {
  padding: "1rem",
});

const Title = styled("h1", {
  fontSize: "$xl",
  fontWeight: "600",
  marginBottom: "1.5rem",
});

const CredentialCard = styled("li", {
  border: "1px solid $gray200",
  padding: "1rem",
  borderRadius: "$md",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  backgroundColor: "$gray100",
});

const ProviderName = styled("h2", {
  fontSize: "$lg",
  fontWeight: "bold",
  marginBottom: "0.25rem",
});

const Status = styled("span", {
  variants: {
    active: {
      true: { color: "$green" },
      false: { color: "$red" },
    },
  },
});

const Actions = styled("div", {
  display: "flex",
  gap: "0.5rem",
  marginTop: "0.5rem",
});

const Button = styled("button", {
  padding: "0.5rem 1rem",
  borderRadius: "$md",
  variants: {
    variant: {
      primary: { backgroundColor: "$blue", color: "white" },
      danger: { backgroundColor: "$red", color: "white" },
    },
  },
});

export function CredentialsList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<Credential[]>({
    queryKey: ["credentials"],
    queryFn: credentialService.list,
  });

  // Mutação para ativar/inativar
  const { mutate: toggleStatus } = useMutation({
    mutationFn: (cred: Credential) =>
      credentialService.toggleStatus(
        cred.credential_wuid,
        cred.active ? "inactive" : "active"
      ),
    onSuccess: () => {
      toast.success("Status alterado!");
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
    },
    onError: () => toast.error("Falha ao alterar status"),
  });

  if (isLoading) return <p>Carregando credenciais...</p>;
  if (isError) return <p>Erro ao carregar credenciais 😓</p>;

  return (
    <Container>
      <Title>Credenciais</Title>
      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data?.map((cred) => (
          <CredentialCard key={cred.credential_wuid}>
            <ProviderName>
              {cred.provider.name}
              {cred.description ? ` - ${cred.description}` : ""}
            </ProviderName>
            <p>
              <strong>Status:</strong>{" "}
              <Status active={cred.active}>
                {cred.active ? "Ativa" : "Inativa"}
              </Status>
            </p>
            <p>
              <strong>Tipo de serviço:</strong> {cred.service_type ?? "N/A"}
            </p>
            
            {/* Botões de Ação */}
            <Actions>
              <Button variant="primary">Editar</Button>
              <Button 
                variant="danger" 
                onClick={() => toggleStatus(cred)}
              >
                {cred.active ? "Inativar" : "Ativar"}
              </Button>
            </Actions>
          </CredentialCard>
        ))}
      </ul>
    </Container>
  );
}
