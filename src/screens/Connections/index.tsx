import { ConnectionsStyled, ContentContainer, UserItem, UserList } from './Connections.styles';
import { useConnectionList } from './hooks/useConnectionsList';

export function Connections() {
  const { connectionList } = useConnectionList();

  return (
    <ConnectionsStyled>
      <UserList>
        {connectionList.map((value, idx) => (
          <UserItem key={idx}>{JSON.stringify(value)}</UserItem>
        ))}
      </UserList>
      <ContentContainer>

      </ContentContainer>
    </ConnectionsStyled>
  );
}
