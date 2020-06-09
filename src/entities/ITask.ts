export interface ITask {
  id: number | undefined,
  userId: number,
  description: string,
  state: string,
  created: Date,
  isEditing?: boolean
}
