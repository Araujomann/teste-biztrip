import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { credentialService } from '../../api/credentials';
import { Credential } from '../../api/types';
import { styled } from '@stitches/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react'; // ícone de editar
import { Switch, SwitchThumb } from '@radix-ui/react-switch'; // ou use algum switch estilizado

const Container = styled('div', {
  padding: '1rem',
});

const Table = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 2fr 2fr auto auto',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  border: '2px solid #0064c6',
  borderRadius: '8px',
  backgroundColor: '#fff',
  gap: '0.5rem',
  marginBottom: '1rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
});

const Text = styled('span', {
  fontSize: '0.875rem',
  color: '#555',
});

const Bold = styled(Text, {
  fontWeight: '600',
});

const IconButton = styled('button', {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0.25rem',
  color: '#555',

  '&:hover': {
    color: '#000',
  },
});

const StyledSwitch = styled(Switch, {
  all: 'unset',
  width: '40px',
  height: '20px',
  backgroundColor: '#E6F0FF', // azul claro
  border: '2px solid #0071CE', // azul médio
  borderRadius: '9999px',
  position: 'relative',
  transition: 'background-color 0.2s',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',

  '&[data-state="unchecked"]': {
    backgroundColor: '#fff',
    border: '2px solid #ccc',
  },
});

const StyledSwitchThumb = styled(SwitchThumb, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  height: '18px',
  backgroundColor: '#0071CE', // azul escuro
  borderRadius: '9999px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s',
  transform: 'translateX(2px)',

  '[data-state="checked"] &': {
    transform: 'translateX(20px)',
  },
});

const Label = styled('label', {
  marginLeft: '0.5rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#0071CE', // azul
});

export const CredentialsList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery<Credential[]>({
    queryKey: ['credentials'],
    queryFn: credentialService.list,
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: (cred: Credential) =>
      credentialService.toggleStatus(
        cred.credential_uuid,
        cred.active ? 'inactive' : 'active'
      ),
    onSuccess: () => {
      toast.success('Status alterado!');
      queryClient.invalidateQueries({ queryKey: ['credentials'] });
    },
    onError: () => toast.error('Falha ao alterar status'),
  });

  if (isLoading) return <p>Carregando credenciais...</p>;
  if (isError || !data) return <p>Erro ao buscar credenciais.</p>;
  if (data.length === 0) return <p>Nenhuma credencial encontrada.</p>;

  return (
    <Container>
      {data.map((cred) => (
        <Table key={cred.credential_uuid}>
          <Text>{cred.description ?? '—'}</Text>
          <Bold>{cred.provider?.name ?? '—'}</Bold>
          <Text>{cred.service_type ?? '—'}</Text>
          <IconButton
            onClick={() =>
              navigate(`/credenciais/${cred.credential_uuid}/editar`)
            }
          >
            <Pencil size={18} />
          </IconButton>
          <Label
            htmlFor={`switch-${cred.credential_uuid}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <StyledSwitch
              checked={cred.active}
              onCheckedChange={() => toggleStatus(cred)}
              id={`switch-${cred.credential_uuid}`}
            >
              <StyledSwitchThumb>
                {/* Ícone branco dentro do thumb, se quiser, exemplo com um SVG check */}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L4 7L8 3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </StyledSwitchThumb>
            </StyledSwitch>
            <span
              style={{
                color: '#333',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {cred.active ? 'Ativo' : 'Inativo'}
            </span>
          </Label>
        </Table>
      ))}
    </Container>
  );
};
