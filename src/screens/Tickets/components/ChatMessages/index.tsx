import { MessageList, MessageListProps, renderText } from 'stream-chat-react';
import { Card, CardPrice, CardTitle, PriceCardStyled } from './ChatMessages.styles';
import { useMemo } from 'react';
import { parsePrice } from '@/helpers/number';

const priceRegex = /^\[price:(nego):([0-9]+)\]$/;

interface Props {
  text: string;
}

function PriceCard({ text }: Props) {
  const parser = useMemo(() => {
    const [, type, cost] = text.match(priceRegex)!;
    const isNego = type === 'nego';
    const title = isNego ? 'Định giá' : 'Chấp nhận';

    return {
      title,
      price: parsePrice(cost),
    };
  }, [text]);

  return (
    <PriceCardStyled>
      <Card>
        <CardTitle>{parser.title}</CardTitle>
        <CardPrice>{`${parser.price} ₫`}</CardPrice>
      </Card>
    </PriceCardStyled>
  );
}

const handleRenderText: MessageListProps['renderText'] = (text, ...rest) => {
  if (text && priceRegex.test(text)) {
    return <PriceCard text={text} />;
  }

  return renderText(text, ...rest);
};

export function ChatMessages() {
  return <MessageList renderText={handleRenderText} />;
}
