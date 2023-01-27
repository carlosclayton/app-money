import {PriceHighlight, TransactionContainer, TransactionTable} from "./styles";
import {Header} from "../Header";
import {Sumary} from "../Sumary";
import {SearchForm} from "../components/SearchForm";
import {TransactionsContext} from "../../contexts/TransactionsContext";
import {useContext} from "react";
import { priceFormatter, dateFormatter} from "../../utils/formatter";


export function Transactions() {
    const {transactions } = useContext(TransactionsContext);
    console.log(transactions)
    return (
        <>
            <Header/>
            <Sumary/>

            <TransactionContainer>
                <SearchForm />
                <TransactionTable>
                    <tbody>
                    {
                        transactions.map(transaction => {
                            return(
                                <tr>
                                    <td>{ transaction.description }</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            { priceFormatter.format(transaction.price) }
                                        </PriceHighlight>
                                    </td>
                                    <td>{ transaction.type }</td>
                                    <td>{ dateFormatter.format(new Date(transaction.createdAt)) }</td>
                                </tr>
                            )
                        })
                    }

                    </tbody>

                </TransactionTable>
            </TransactionContainer>
        </>
    )
}
