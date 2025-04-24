// types.ts
export interface Credential {
    credential_uuid: string;
    description: string;
    service_type: string;
    provider: Provider;
    active: boolean;
    credential_values: Record<string, string>;
    created_at: string;
  }
  export type ProviderFields = {
    name: string;
    type: 'text' | 'password' | 'number';
    required?: boolean;
    label?: string;
  };
  
  // Atualize o FormData  
  export interface Provider {
    uuid: string;
    name: string;
    slug: string;
    logo?: string;
  }
  
  export interface CredentialParameter {
    credential_parameter_uuid: string;
    name: string;
    value: string;
  }
  
  export interface ProviderParameter {
    name: string;
    label: string;
    type: string;
    required: boolean;
    credential_parameter_uuid: string;
  }
  
  export interface ProviderParameterResponse {
    service_types: string[];
    parameters: ProviderParameter[];
  }
  
  export interface CreateCredentialPayload {
    description: string;
    service_type: string;
    parameters: {
      credential_parameter_uuid: string;
      name: string;
      value: string;
    }[];
  }
  
  export interface UpdateCredentialPayload extends CreateCredentialPayload {
    credential_uuid: string;
  }