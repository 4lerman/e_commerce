export interface createUserRM {
	name?: string;
	email: string;
	password: string;
}

export interface authRM {
	email: string;
	password: string;
}

export interface updateUserRM {
    id: number;
    email?: string;
    name?: string;
}

export interface createProductRM {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    amount: number;
}

export interface updateProductRM {
    id: number;
    userId: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    amount: number;
}

export interface deleteProductRM {
    id: number;
    userId: number;
}
