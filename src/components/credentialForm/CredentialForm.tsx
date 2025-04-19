import { useQuery } from "@tanstack/react-query";
import { credentialService } from "../../api/credentials";
import { useForm } from "react-hook-form";
import { styled } from "@stitches/react";

type FormData = Record<string, string>;

export const CredentialForm = ({ provider }: { provider: string }) => {
    const { data: providerFields } = useQuery({
        queryKey: ["provider-fields", provider],
        queryFn: () => credentialService.getProviderParameters(provider),
    });

    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        credentialService.create(provider, data);
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            {providerFields?.fields.map((field) => (
                <Input
                    key={field}
                    type={field.includes("password") ? "password" : "text"}
                    placeholder={field}
                    {...register(field, { required: true })}
                />
            ))}
            <Button type="submit">Salvar Credencial</Button>
        </FormContainer>
    );
};

const FormContainer = styled("form", {
    display: "flex",
    felxDirection: "column",
    gap: "$3",
    maxWidth: "400px",
    margin: "0 auto",
});

const Input = styled("input", {
    padding: "$2",
    borderRadius: "$sm",
    border: "1px solid $gray200",
});

const Button = styled("button", {
    padding: "$2 $3",
    backgroundColor: "$primary",
    color: "white",
    border: "none",
    borderRadius: "$sm",
    cursor: "pointer",
    "&:hover": {
        opacity: 0.9,
    },
});
