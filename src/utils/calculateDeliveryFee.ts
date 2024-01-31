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

  // Throwing an error if the time is invalid
  if (isNaN(orderTimeDat.getTime())) {
    throw new Error("Invalid order time");
  }

  // if the cartValue is more or equal to 200, then return 0 fee
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

  // if the fee is more than 15, it sets it to 15, which is the max fee
  fee = Math.min(fee, 15);

  return fee;
};
