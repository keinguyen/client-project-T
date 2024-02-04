import { useEffect } from 'react';
import styled from 'styled-components';
import { useSocket } from '../hooks/useSocket';
import { useConnectionList } from '../hooks/useConnectionsList';

export function Connections() {
  const { init, disconnect } = useSocket();
  const { connectionList } = useConnectionList();

  useEffect(() => {
    init('manager');

    return () => {
      disconnect()
    }
  }, [init, disconnect]);

  return (
    <ConnectionsStyled>
      <UserList>
        {connectionList.map((value) => (
          <UserItem key={value}>{value}</UserItem>
        ))}
      </UserList>
      <ContentContainer>

      </ContentContainer>
    </ConnectionsStyled>
  );
}

const ConnectionsStyled = styled.div`
  display: flex;
  gap: 8px;
  width: 100vw;
  height: 100vh;
  min-height: 600px;
`;

const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 200px;
  border: 1px solid green;
`;

const UserItem = styled.li`
  padding: 6px 12px;

  &:hover {
    background-color: rgba(0,0,0,.1);
  }
`;

const ContentContainer = styled.div`
  border: 1px solid red;
  flex: 1;
`;
