import { MagnifyingGlass, X } from "phosphor-react";
import logo from "../../assets/logo.svg";
import { HeaderContainer, HeaderContent, LogoContainer, SearchContainer, ButtonClose } from "./style";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <img src={logo} />
          <h1>CoreNotes</h1>
        </LogoContainer>

        <SearchContainer>
          <input type="text" placeholder="pesquisar notas" />

          <MagnifyingGlass size={12} />
        </SearchContainer>
      </HeaderContent>

      <ButtonClose>
        <X size={14} />
      </ButtonClose>
    </HeaderContainer>
  );
}
