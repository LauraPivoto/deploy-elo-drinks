import axios from 'axios';

const API_URL = 'https://elodrinks-api.onrender.com';

export async function getBudgets() {
    const response = await axios.get(`${API_URL}/budget`);
    return response.data;
}

export async function createBudget(data: {
    name: string;
    email: string;
    phone: string;
    budget: {
        description: string;
        type: string;
        date: string;
        num_barmans: number;
        num_guests: number;
        time: number;
        package: string;
        extras: string[];
    };
    status: string;
    value: number;
}) {
    const response = await axios.post(`${API_URL}/budget`, data);
    return response.data;
}

export async function updateBudgetStatus(data: {
    _id: string;
    new_status: string;
    value: number;
}) {
    const response = await axios.patch(`${API_URL}/budget/status`, data);
    return response.data;
}

export async function getPendingBudgets() {
    const response = await axios.get(`${API_URL}/budget/pending`);
    return response.data;
}

export async function getBudgetById(budget_id: string) {
    const response = await axios.get(`${API_URL}/budget/${budget_id}`);
    return response.data;
}

export async function sendBudgetEmail(_id: string) {
    const response = await axios.post(`${API_URL}/budget/email/send`, { _id });
    return response.data;
}

export async function callBudgetWebhook(payload: any) {
    const response = await axios.post(`${API_URL}/budget/webhook`, payload);
    return response.data;
}