export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}

export interface User {
    id?: number;
    nama?: string;
    nik?: string;
    email?: string;
    alamat?: string;
    noHp?: string;
    penghasilan?: number;
    jenisKlaim?: string;
    status?: boolean;
    
}
