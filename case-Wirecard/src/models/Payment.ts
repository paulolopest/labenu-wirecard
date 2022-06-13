export type CreditPayment = {
    id: string,
    amount: number,
    payment: string,
    credit_card: string,
    payment_situation: string,
    user_id: string
}
export type TicketPayment = {
    id: string,
    amount: number,
    payment: string,
    payment_situation: string,
    id_ticket: string,
    user_id: string
}