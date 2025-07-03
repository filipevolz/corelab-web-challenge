import data from "../../../../data.json";
import { useEffect, useState } from "react";
import { FavoriteNotes } from "../../components/FavoriteNotes";
import { NewNote } from "../../components/NewNote";
import { OthersNotes } from "../../components/OthersNotes";
import { DashboardContainer } from "./style";
import type { NoteProps } from "../../@types/note";

export function Dashboard() {
  const [favoriteNotes, setFavoriteNotes] = useState<NoteProps[]>([]);
  const [othersNotes, setOthersNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    // Salva os dados no localStorage (caso não estejam salvos ainda)
    if (!localStorage.getItem("corelab-notes")) {
      localStorage.setItem("corelab-notes", JSON.stringify(data.notes));
    }

    // Recupera e separa as notas
    const storedNotes: NoteProps[] = JSON.parse(
      localStorage.getItem("corelab-notes") || "[]"
    );

    const favorites = storedNotes.filter((note) => note.favorite);
    const others = storedNotes.filter((note) => !note.favorite);

    setFavoriteNotes(favorites);
    setOthersNotes(others);
  }, []);

  return (
    <DashboardContainer>
      <NewNote />

      <FavoriteNotes favoriteNotes={favoriteNotes} />
      <OthersNotes othersNotes={othersNotes} />
    </DashboardContainer>
  );
}
