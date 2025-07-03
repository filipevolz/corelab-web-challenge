import { createContext, useContext } from "react";
import type { NoteProps } from "../@types/note";

interface NoteContextType {
  notes: NoteProps[];
  addNote: (title: string, description: string, favorite: boolean) => Promise<void>;
  getAllNotes: () => Promise<void>;
  updateNote: (id: string, title: string, description: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  toggleColor: (id: string, color: string) => Promise<void>;
}

export const NotesContext = createContext<NoteContextType | undefined>(undefined);

export const useNote= () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error(
      "useNotePropss deve ser usado dentro de um NotePropsProvider"
    );
  }
  return context;
};