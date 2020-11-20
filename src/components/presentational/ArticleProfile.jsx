import React from 'react';

import styled from '@emotion/styled';

import MoodIcon from '@material-ui/icons/Mood';

export default function ArticleProfile({ user, region }) {
  const { email, displayName } = user;

  return (
    <>
      <Profile>
        <ProfileLeft>
          <ProfilePhoto>
            <MoodIcon fontSize="large" />
          </ProfilePhoto>
          <ProfileDescription>
            <h2 className="nickname">{`${displayName}`}</h2>
            <p>{`${region}`}</p>
            <p className="profile-email">{`${email}`}</p>
          </ProfileDescription>
        </ProfileLeft>
        <ProfileRight>
          판매중
        </ProfileRight>
      </Profile>
    </>
  );
}

const Profile = styled.section({
  padding: '32px 0',
  width: '677px',
  margin: '0 auto',
  borderBottom: '1px solid #e9ecef',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ProfileLeft = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const ProfilePhoto = styled.div({
  '& svg': {
    fontSize: '4rem',
  },
});

const ProfileDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '8px',
  '& .nickname': {
    lineHeight: '1.5',
  },
  '& .profile-email': {
    color: '#929292',
  },
});

const ProfileRight = styled.div({
  fontSize: '2rem',
  fontWeight: 'bold',
});
