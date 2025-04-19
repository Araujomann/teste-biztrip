export type CredentialParameter = {
    service_types: string
    parameters: string
}

export type Credential = {
    credential_wuid: string
    description: string | null
    service_type: string | null
    provider: { id: string, name: string}
    active: boolean
    credential_values: string
}

export type ProviderFields = {
    fields: string[]
}

export type Provider = {
    uuid: string
    name: string
    slug: string
    logo: string
    description: string
    service_types: string[]
}

export type User = {
    uuid: string
    name: string
    email: string
    phone: string | null
    context: string| Record<string, string>
    is_expense_aprover: boolean
    agency: string
    customer: string
    avatar_url: string | null
}