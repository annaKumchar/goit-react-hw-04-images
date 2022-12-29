import PropTypes from 'prop-types';
import { ButtonWrap, Button } from './Button.styled';

export const LoadMore = ({ onClick }) => {
  return (
    <ButtonWrap>
      <Button onClick={onClick}>Load more</Button>
    </ButtonWrap>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
