import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/status-order.enum';

export class StatusDto {
  // @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Valid status are ${Object.values(OrderStatus).join(', ')}`,
  })
  status: OrderStatus;
}
