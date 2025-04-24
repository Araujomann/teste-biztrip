import { useQuery } from '@tanstack/react-query';
import { credentialService } from '../../api/credentials';
import { useForm } from 'react-hook-form';
import { styled } from '@stitches/react';
import { useState } from 'react';

type FormData = Record<string, string>;

export const CredentialForm = ({ provider }: { provider: string }) => {
  const { data: providerFields } = useQuery({
    queryKey: ['provider-fields', provider],
    queryFn: () => credentialService.getProviderParameters(provider),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    credentialService
      .create(provider, data)
      .catch((err) => setError(err.message));
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {providerFields?.fields.map((field) => (
        <Input
          key={field}
          type={field.includes('password') ? 'password' : 'text'}
          placeholder={field}
          {...register(field, { required: 'Campo obrigatório' })}
        />
      ))}
      {Object.keys(errors).length > 0 && (
        <ErrorMessage>Preencha todos os campos obrigatórios.</ErrorMessage>
      )}
      <Button type="submit">Salvar Credencial</Button>
    </FormContainer>
  );
};

const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  maxWidth: '400px',
  margin: '0 auto',
});

const Input = styled('input', {
  padding: '$2',
  borderRadius: '$sm',
  border: '1px solid $gray200',
});

const Button = styled('button', {
  padding: '$2 $3',
  backgroundColor: '$primary',
  color: 'white',
  border: 'none',
  borderRadius: '$sm',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
});

const ErrorMessage = styled('p', {
  color: '$red',
  fontSize: '$sm',
  marginBottom: '$3',
});
