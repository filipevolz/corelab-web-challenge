export interface NoteProps {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
}

export interface NotesProps {
  notes: NoteProps[]
}