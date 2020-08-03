import facepaint from 'facepaint';

import styled from '@emotion/styled';

const mq = facepaint([
  '@media(min-width: 600px)',
  '@media(min-width: 1200px)',
], { literal: true });

const CardList = styled.ul(mq({
  display: ['flex'],
  flexWrap: ['wrap'],
  margin: ['0 -1rem'],
}));

const CardItem = styled.li(mq({
  display: 'flex',
  flexDirection: 'column',
  width: ['50%', '33.33333%'],
  padding: ['0 1rem'],
}));

const CardLink = styled.a({
  display: 'block',
  textDecoration: 'none',
});

const CardArticle = styled.article({
  border: '1px solid lightgray',
  borderRadius: '15px',
  marginBottom: '2rem',
  transition: 'box-shadow .3s',
  '&:hover': {
    boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.2)',
  },
});

const CardImage = styled.figure(({ url }) => ({
  height: 0,
  borderRadius: '15px',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  paddingBottom: '60%',
  // backgroundColor는 url 이미지가 들어오면 지울 것.
  backgroundColor: 'lightgray',
  backgroundImage: `url(${url})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  '& img': {
    display: 'none',
  },
}));

const CardDescription = styled.div({
  flex: '1 1 auto',
  padding: '1em',
  backgroundColor: 'white',
  borderRadius: '15px',
});

CardDescription.Title = styled.h2({
  fontSize: '17px',
  fontWeight: '600',
  letterSpacing: '-0.6px',
  color: '#212529',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: '6px',
  lineHeight: '1.2',
});

CardDescription.Region = styled.div({
  fontSize: '15px',
  color: '#868e96',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: '8px',
  lineHeight: '1.3',
});

CardDescription.Price = styled.div({
  fontSize: '15px',
  fontWeight: '600',
  paddingBottom: '8px',
  borderBottom: '1px solid #e9ecef',
  lineHeight: '1.3',
  color: '#ff8a3d',
});

export {
  CardList,
  CardItem,
  CardLink,
  CardArticle,
  CardImage,
  CardDescription,
};
