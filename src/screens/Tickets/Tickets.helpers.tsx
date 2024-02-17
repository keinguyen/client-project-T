import { MessageListProps, renderText } from 'stream-chat-react';
import { PriceCard } from './components/PriceCard';

export const priceRegex = /^\[price:(nego):([0-9]+)\]$/;

export const handleRenderText: MessageListProps['renderText'] = (text, ...rest) => {
  if (text && priceRegex.test(text)) {
    return <PriceCard text={text} />;
  }

  return renderText(text, ...rest);
};
