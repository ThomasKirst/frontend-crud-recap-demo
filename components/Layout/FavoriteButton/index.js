import Icon from "@/public/heart.svg";
import styled from "styled-components";

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <IconButton onClick={onClick}>
      <Icon width={25} height={25} fill={isFavorite ? "#f00" : "#ccc"} />
    </IconButton>
  );
}
