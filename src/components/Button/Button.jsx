import { Button } from './Button.styled';

export const ButtonStyled = ({ onClickLoadMore }) => {
  return (
    <Button type="button" onClick={onClickLoadMore}>
      Load more
    </Button>
  );
};
