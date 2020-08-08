import React from 'react';
import styled from '@emotion/styled';

const Article = styled.article({

});

const ArticleImages = styled.section({

});

const ArticleProfile = styled.section({

});

const ArticleDescription = styled.section({

});

export default function ProductDetail({ product }) {
  const {
    title, thumbnailUrl, region, price,
  } = product;

  return (
    <Article>
      <ArticleImages>
        <img src={thumbnailUrl} alt={title} />
      </ArticleImages>
      <ArticleProfile />
      <ArticleDescription>
        <h1>{title}</h1>
        <div>{region}</div>
        <div>{price}</div>
      </ArticleDescription>
    </Article>
  );
}
