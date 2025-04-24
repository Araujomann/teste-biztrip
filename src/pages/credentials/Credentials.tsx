import { styled } from "@stitches/react";
import { CredentialsList } from "../../components/credentialList/CredentialList";
import { Header } from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateCredential } from "../../components/createCredential/CreateCredential";
import { api } from "../../api/api";

const Container = styled("div", {
    width: "100vw",
    height: "100vh",
    margin: "0 auto",
    backgroundColor: "#f1f2f6",
});

export function Credentials() {
    const location = useLocation();
    const navigate = useNavigate();

    const showCredentialModal = location.pathname === "/credentials/create";

    const handleOpen = () => navigate("/credentials/create");
    const handleClose = () => navigate("/credentials");

    const handleCreate = async ({provider, data }: {provider: string; data: any}) => {
    console.log("Enviando para o backend: ", data)

    try {
        const response = await api.post(`/credentials/providers/${provider}`, data)
        console.log("Credencial criada com sucesso: ", response.data)
        handleClose(); 
        handleClose();
window.location.reload();


    } catch (error: any) {
        console.error("Erro ao criar credencial:", error);
    }
    };

    return (
        <Container>
            <Header onNewCredentialClick={handleOpen}  />
            <CredentialsList />
            {showCredentialModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <CreateCredential onClose={handleClose} onSubmit={handleCreate} />
                </div>
            )}
        </Container>
    );
}
