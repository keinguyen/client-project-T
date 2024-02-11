import { ConnectionsStyled, ContentContainer, UserItem, UserList } from './Connections.styles';
import { useConnectionList } from './hooks/useConnectionsList';

export function Connections() {
  const { connectionList } = useConnectionList();

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
