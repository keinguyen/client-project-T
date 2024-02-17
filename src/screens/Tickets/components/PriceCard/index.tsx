import { useMemo } from 'react';
import { parsePrice } from '@/helpers/number';
import { priceRegex } from '../../Tickets.helpers';
import { Card, CardPrice, CardTitle, PriceCardStyled } from './PriceCard.styles';

interface Props {
  text: string;
}

export function PriceCard({ text }: Props) {
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
