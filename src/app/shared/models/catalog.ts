
export class Catalog {
    type: string;
    name: string;
    displayName: string;
    description: string;
    provider: string;
    fields: CatalogField[];
}

export class CatalogField {
    name: string;
    displayName: string;
    placeholder: string;
    description: string;
    type: FieldType;
    disabled: boolean;
    default: string;
    validationMessage: string;
    validation: string;
    rbac: string;
    options: FieldOption[]
}

export class FieldOption {
    key: string;
    value: string;
}

export enum FieldType {
    text,
    select,
    radio
}
