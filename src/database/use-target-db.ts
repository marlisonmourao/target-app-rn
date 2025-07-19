import { useSQLiteContext } from "expo-sqlite"

export type TargetCreate = {
  name: string
  amount: number
}

export type TargetResponse = {
  id: number
  name: string
  amount: number
  current: number
  percentage: number
  createdAt: Date
  updatedAt: Date
}

export type TargetUpdate = TargetCreate & {
  id: number
}

export function useTargetDb() {
  const db = useSQLiteContext()

  async function create(data: TargetCreate) {
    const statement = await db.prepareAsync(`
      INSERT INTO targets (name, amount) VALUES ($name, $amount)  
    `)

    await statement.executeAsync({
      $name: data.name,
      $amount: data.amount
    })
  }

  function listBySavedValue() {
    return db.getAllAsync<TargetResponse>(`
      SELECT 
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE(SUM(transactions.amount) / targets.amount * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount
      ORDER BY current DESC
    `)
  }

  function show(id: number) {
    return db.getFirstAsync<TargetResponse>(`
      SELECT 
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE(SUM(transactions.amount) / targets.amount * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      WHERE targets.id = ${id}
    `)
  }

  async function update(data: TargetUpdate) {
    const statement = await db.prepareAsync(`
      UPDATE targets SET 
        name = $name,
        amount = $amount,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $id
    `)

    await statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $amount: data.amount
    })
  }

  async function remove(id: number) {
    const statement = await db.prepareAsync(`
      DELETE FROM targets WHERE id = $id
    `)

    await statement.executeAsync({
      $id: id
    })
  }

  return {
    create,
    listBySavedValue,
    show,
    update,
    remove
  }
}