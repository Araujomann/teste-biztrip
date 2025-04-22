import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { styled } from "@stitches/react";
import { X } from "lucide-react";

interface DynamicField {
    name: string;
    label: string;
    required: boolean;
}

interface FormData {
    name: string;
    type: string;
    [key: string]: string;
}

interface CreateCredentialProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

interface Provider {
    uuid: string
name: string
slug: string
logo: string
description:string
service_type:string
active:string
}

const ModalOverlay = styled("div", {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 999,
});
const ModalContainer = styled("div", {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    zIndex: 1000,
});

const FormContainer = styled("div", {
    position: "relative",
    bottom: "0",
    padding: "0 24px 24px 24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    zIndex: 1000,
});
const HeaderContainer = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 24px",
    alignItems: "center",
    marginBottom: "24px",
    borderBottom: "1px solid #e5e7eb",
    width: "100%",
});

const Title = styled("h2", {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#000000",
});

const CloseButton = styled("button", {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#000000",
    padding: "4px",
    borderRadius: "6px",
    lineHeight: 0,

    "&:hover": {
        backgroundColor: "#f3f4f6",
    },
});

const Label = styled("label", {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "6px",
    color: "#1a1a1a",

    "& span": {
        color: "#d97706", // laranja para "Obrigatório"
        marginLeft: "4px",
    },
});

const Input = styled("input", {
    width: "100%",
    border: "1px solid #d1d5db",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "8px 12px",
    marginBottom: "16px",
    fontSize: "14px",
    outlineColor: "#2563eb",
});

const Select = styled("select", {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "8px 12px",
    marginBottom: "16px",
    fontSize: "14px",
    backgroundColor: "#fff",
    outlineColor: "#2563eb",
    color: "#111827",
});

const ButtonGroup = styled("div", {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
});

const Button = styled("button", {
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    variants: {
        variant: {
            cancel: {
                backgroundColor: "#f3f4f6",
                color: "#111827",
                "&:hover": { backgroundColor: "#e5e7eb" },
            },
            submit: {
                backgroundColor: "#2563eb",
                color: "white",
                "&:hover": { backgroundColor: "#1d4ed8" },
            },
        },
    },
});

export const CreateCredential: React.FC<CreateCredentialProps> = ({
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState<FormData>({ name: "", type: "" });
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState("");
    const [serviceTypes, setServiceTypes] = useState<string[]>([]);
    const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await api.get("/providers");
                console.log("Provedores:", response.data);
                setProviders(response.data);
            } catch (err) {
                console.error("Erro ao buscar provedores:", err);
            }
        };

        fetchProviders();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProviderChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const provider = e.target.value;
        setSelectedProvider(provider);

        try {
            const res = await fetch(
                `/credentials/providers/${provider}/parameters`
            );
            const data = await res.json();

            const parsedParams = JSON.parse(data.parameters);
            const fields = Object.entries(parsedParams).map(
                ([name, config]) => ({
                    name,
                    label: (config as any).label,
                    required: (config as any).required,
                })
            );

            setDynamicFields(fields);
            setServiceTypes(data.service_types.split(","));
        } catch (err) {
            console.error("Erro ao buscar parâmetros:", err);
        }
    };

    const handleSubmit = () => {
        const missingFields = dynamicFields.filter(
            (field) => field.required && !formData[field.name]
        );

        if (!formData.name || !formData.type || missingFields.length > 0) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const credential_values = JSON.stringify(
            dynamicFields.reduce((acc, field) => {
                acc[field.name] = formData[field.name];
                return acc;
            }, {} as Record<string, string>)
        );

        const payload = {
            description: formData.name,
            provider: selectedProvider,
            service_type: formData.type,
            active: true,
            credential_values,
        };

        onSubmit(payload);
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <HeaderContainer>
                    <Title>Adicionar Credencial</Title>
                    <CloseButton onClick={onClose} aria-label="Fechar">
                        <X size={20} />
                    </CloseButton>
                </HeaderContainer>
                <FormContainer>
                    <Label>
                        Fornecedor <span>Obrigatório</span>
                    </Label>
                    <Select
                        value={selectedProvider}
                        onChange={handleProviderChange}
                    >
                        <option value="">Selecione</option>
                        {providers.map((provider) => (
                            <option key={provider.uuid} value={provider.slug}>
                                {provider.name}
                            </option>
                        ))}
                    </Select>

                    <Label>
                        Nome da credencial <span>Obrigatório</span>
                    </Label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <Label>
                        Tipo de serviço <span>Obrigatório</span>
                    </Label>
                    <Select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione o tipo de serviço</option>
                        {serviceTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>

                    {dynamicFields.map((field) => (
                        <div key={field.name}>
                            <Label>
                                {field.label}
                                {field.required && <span>Obrigatório</span>}
                            </Label>
                            <Input
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleInputChange}
                                required={field.required}
                            />
                        </div>
                    ))}

                    <ButtonGroup>
                        <Button variant="cancel" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="submit" onClick={handleSubmit}>
                            Adicionar
                        </Button>
                    </ButtonGroup>
                </FormContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};
