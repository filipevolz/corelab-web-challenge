export interface NoteProps {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
}

export interface NotesProps {
  notes: NoteProps[]
}