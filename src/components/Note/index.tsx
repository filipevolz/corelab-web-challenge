import { useState } from "react";
import { useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Pencil, Star, X } from "phosphor-react";
import {
  NoteContainer,
  NoteHeader,
  NoteTitle,
  NoteContent,
  NoteFooter,
  DeleteCard,
  EditCard,
  ColorsContent,
} from "./style";
import { RiPaintFill } from "react-icons/ri";
import { FavoriteButton } from "../NewNote/style";

interface NoteProps {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
}

export function Note({
  title,
  description,
  favorite: initialFavorite,
}: NoteProps) {
  const [color, setColor] = useState<string>("#FFFFFF");
  const [showPalette, setShowPalette] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [palettePosition, setPalettePosition] = useState({ top: 0, left: 0 });
  const [favorite, setFavorite] = useState(initialFavorite);

  useLayoutEffect(() => {
    if (showPalette && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPalettePosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showPalette]);

  function toggleFavorite() {
    setFavorite((prev) => !prev);
  }

  const colors = [
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    "#F99494",
    "#9DD6FF",
    "#ECA1FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
  ];

  return (
    <NoteContainer color={color} >
      <NoteHeader>
        <NoteTitle>{title}</NoteTitle>
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
      </NoteHeader>

      <NoteContent>{description}</NoteContent>

      <NoteFooter>
        <div
          ref={buttonRef}
          style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
        >
          <EditCard>
            <Pencil size={18} />
          </EditCard>
          <RiPaintFill
            size={18}
            onClick={() => setShowPalette((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <DeleteCard onClick={() => console.log("oi")}>
          <X size={14} />
        </DeleteCard>
      </NoteFooter>

      {showPalette &&
        createPortal(
          <ColorsContent style={{ top: `${palettePosition.top}px`, left: `${palettePosition.left}px` }}>
            {colors.map((c) => (
              <div
                key={c}
                onClick={() => {
                  setColor(c);
                  setShowPalette(false);
                }}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: "1px solid #999",
                  cursor: "pointer",
                }}
              />
            ))}
          </ColorsContent>,
          document.getElementById("root")!
        )}
    </NoteContainer>
  );
}
