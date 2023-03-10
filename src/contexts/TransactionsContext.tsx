import {createContext, ReactNode, useEffect, useState} from "react";
import {Api} from "../libs/axios";

interface Transaction{
    id: number;
    description: string;
    type: 'income' | 'outcome'
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType{
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType );

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string ){
        const response = await Api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }
        })
        setTransactions(response.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}
