import {SumaryContainer, SumaryCard} from "./styles";
import {ArrowCircleDown, ArrowCircleUp, CurrencyDollar} from 'phosphor-react'
import {useContext} from "react";
import {TransactionsContext} from "../../contexts/TransactionsContext";
import {priceFormatter} from "../../utils/formatter";

export function Sumary(){

    const {transactions} = useContext(TransactionsContext);

    const summary = transactions.reduce(
        (acc, transaction) => {
            if(transaction.type === 'income'){
                acc.income += transaction.price;
                acc.total += transaction.price
            }else{
                acc.outcome += transaction.price;
                acc.total -= transaction.price;
            }
            return acc;
        },{
            income: 0,
            outcome: 0,
            total: 0
        })
    return(
        <SumaryContainer>
            <SumaryCard >
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e"></ArrowCircleUp>
                </header>
                <strong>{ priceFormatter.format(summary.income) }</strong>
            </SumaryCard>
            <SumaryCard >
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#AB222E"></ArrowCircleDown>
                </header>
                <strong>{ priceFormatter.format(summary.outcome) }</strong>
            </SumaryCard>
            <SumaryCard colorBgCard="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff"></CurrencyDollar>
                </header>
                <strong>{ priceFormatter.format(summary.total) }</strong>
            </SumaryCard>
        </SumaryContainer>
    )
}
