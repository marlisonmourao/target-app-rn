import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  target_id: number
  amount: number
  observation: string | null
}

export type TransactionResponse = {
  id: number
  target_id: number
  amount: number
  observation: string | null
  createdAt: Date
  updatedAt: Date
}

export function useTransactionsDb() {
  const db = useSQLiteContext()

  async function create(data: TransactionCreate) {
    const statement = await db.prepareAsync(`
      INSERT INTO transactions (target_id, amount, observation)
      VALUES ($target_id, $amount, $observation)
    `)

    await statement.executeAsync({
      $target_id: data.target_id,
      $amount: data.amount,
      $observation: data.observation
    })
  }

  function listByTargetId(id: number) {
    return db.getAllAsync<TransactionResponse>(`
        SELECT id, target_id, amount, observation, created_at, updated_at
        FROM transactions
        WHERE target_id = ${id}
        ORDER BY created_at DESC
      `)
  }

  async function remove(id: number) {
    const statement = await db.prepareAsync(`
      DELETE FROM transactions WHERE id = ${id}
    `)

    await statement.executeAsync()
  }

  return {
    create,
    listByTargetId,
    remove
  }
}