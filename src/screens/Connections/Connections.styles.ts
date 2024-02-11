import styled from 'styled-components';

export const ConnectionsStyled = styled.div`
  display: flex;
  gap: 8px;
  width: 100vw;
  height: 100vh;
  min-height: 600px;
`;

export const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 200px;
  border: 1px solid green;
`;

export const UserItem = styled.li`
  padding: 6px 12px;

  &:hover {
    background-color: rgba(0,0,0,.1);
  }
`;

export const ContentContainer = styled.div`
  border: 1px solid red;
  flex: 1;
`;
