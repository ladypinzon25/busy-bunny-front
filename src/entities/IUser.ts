export interface IUser {
  id: number | undefined,
  name: string,
  picture: string,
  created: Date,
  isEditing?: boolean
}
