import { useSQLiteContext } from "expo-sqlite"

export type TargetCreate = {
  name: string
  amount: number
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

  return {
    create
  }
}