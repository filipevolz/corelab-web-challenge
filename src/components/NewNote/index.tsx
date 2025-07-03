import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Star } from "phosphor-react";
import {
  FavoriteButton,
  InputContentNewNote,
  NewNoteContainer,
  NewNoteHeader,
} from "./style";
import { toast } from "react-toastify";

const newNoteFormSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  favorite: z.boolean(),
});

type NewNoteForm = z.infer<typeof newNoteFormSchema>;

export function NewNote() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewNoteForm>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      favorite: false,
    },
  });

  const favorite = watch("favorite");

  function toggleFavorite() {
    setValue("favorite", !favorite);
  }

  function handleCreateNewNote(data: NewNoteForm) {
    console.log(data);
    toast.success("Nota criada com sucesso!");
    setValue("title", "");
    setValue("description", "");
    setValue("favorite", false);
  }

  function handleInvalidForm() {
    if (errors.title) {
      toast.error(errors.title.message);
    }
    if (errors.description) {
      toast.error(errors.description.message);
    }
  }

  return (
    <NewNoteContainer
      onSubmit={handleSubmit(handleCreateNewNote, handleInvalidForm)}
    >
      <NewNoteHeader>
        <input type="text" placeholder="Título" {...register("title")} />
        <FavoriteButton
          type="button"
          onClick={toggleFavorite}
          aria-label="Favoritar nota"
        >
          <Star
            size={18}
            weight={favorite ? "duotone" : "regular"}
            color="#455A64"
            style={{ fill: favorite ? "#FFA000" : "#FFF" }}
          />
        </FavoriteButton>
      </NewNoteHeader>

      <InputContentNewNote
        placeholder="Criar nota..."
        {...register("description")}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(handleCreateNewNote, handleInvalidForm)();
          }
        }}
      />
    </NewNoteContainer>
  );
}
