import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    response.json({
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  try {
    const transaction = new CreateTransactionService(
      transactionsRepository,
    ).execute({ title, value, type });

    response.json(transaction);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
