export interface Note {
  id: number,
  title: string,
  description: string
}

export interface DeletedNote extends Note {
  deletedAt?: number
}