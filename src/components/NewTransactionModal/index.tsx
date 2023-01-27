import * as Dialog from "@radix-ui/react-dialog";
import {CloseButton, Content, Overlay, TransactionType, TransactionTypeButton} from "./styles";
import {ArrowCircleUp, X} from "phosphor-react";
import * as zod from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Api} from "../../libs/axios";

const searchFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(["income", "outcome"])
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

export function NewTransactionModal() {

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: {isSubmitting}
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    });

    async function handleNewTransaction(data: SearchFormInputs) {
        const { description, type, price, category } = data

        await Api.post('transactions',{
            description,
            price,
            category,
            type,
            createdAt: new Date()
        })

        reset()

    }

    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>
                <form action="" onSubmit={handleSubmit(handleNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register('description')}
                    />

                    <input
                        type="number"
                        placeholder="Preço"
                        required
                        {...register('price')}
                    />

                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register('category')}
                    />

                    <Controller
                        name="type"
                        control={control}
                        render={({field}) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24}/>
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleUp size={24}/>
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}


                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}
