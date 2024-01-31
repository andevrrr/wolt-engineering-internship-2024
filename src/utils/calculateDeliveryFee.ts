type DeliveryFeeParams = {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: string;
};

export const CalculateDeliveryFee = ({
  cartValue,
  deliveryDistance,
  numberOfItems,
  orderTime,
}: DeliveryFeeParams): number => {
  let fee = 2;

  const orderTimeDat = new Date(orderTime);

  if (isNaN(orderTimeDat.getTime())) {
    throw new Error("Invalid order time");
  }

  if (cartValue >= 200) {
    fee = 0;
    return fee;
  }

  if (deliveryDistance > 1000) {
    const extraDistance = deliveryDistance - 1000;
    const extraCharge = Math.ceil(extraDistance / 500);
    fee += extraCharge;
  }

  if (cartValue < 10) {
    fee += 10 - cartValue;
  }

  if (numberOfItems >= 5) {
    const bulkItems = numberOfItems - 4;
    fee += bulkItems * 0.5;
  }

  if (numberOfItems > 12) {
    fee += 1.2;
  }

  const orderHourUTC = new Date(orderTime).getHours();
  const orderTimeDate = new Date(orderTime);
  if (orderTimeDate.getDay() === 5 && orderHourUTC >= 15 && orderHourUTC < 19) {
    fee *= 1.2;
  }

  fee = Math.min(fee, 15);

  return fee;
};
