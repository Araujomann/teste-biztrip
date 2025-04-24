import { styled } from "@stitches/react";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";

const HeaderContainer = styled("header", {
    display: "flex",
    justifyContent: "space-between",
    width: "full",
    height: "4rem",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid $gray200",
    backgroundColor: "#fff",
});

const Title = styled("h1", {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#000",
});

const RightSection = styled("div", {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
});

const SearchInputWrapper = styled("div", {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    border: "1px solid $gray300",
    borderRadius: "8px",
    padding: "0.5rem 0.75rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
});

const Input = styled("input", {
    border: "none",
    outline: "none",
    marginLeft: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "#000",
});

const Button = styled("button", {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    backgroundColor: "#0064c6",
    color: "white",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: "#0050a0",
    },
});

type HeaderProps = {
    onSearchChange?: (value: string) => void;
    onNewCredentialClick?: () => void;
};

export function Header({ onSearchChange, onNewCredentialClick }: HeaderProps) {
    return (
        <>
            <HeaderContainer>
                <Title>Credenciais</Title>

                <RightSection>
                    <SearchInputWrapper>
                        <MagnifyingGlassIcon color="black" />
                        <Input
                            type="text"
                            placeholder="Buscar credencial"
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                    </SearchInputWrapper>

                    <Button onClick={onNewCredentialClick}>
                        <PlusIcon />
                        Nova Credencial
                    </Button>
                </RightSection>
            </HeaderContainer>
        </>
    );
}
