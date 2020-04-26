import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (b, transaction) => {
        const bp = b;

        if (transaction.type === 'income') bp.income += transaction.value;
        else bp.outcome = transaction.value;

        bp.total = bp.income - bp.outcome;

        return bp;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create(createTransactionDTO: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(createTransactionDTO);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
