export const formatTime = (milliseconds: any) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const leftHours = hours % 24;
    return `${days}d ${leftHours}h ${minutes}m ${seconds}s`;
  }
  if (hours === 0) {
    return `${minutes}m ${seconds}s`;
  }
  if (hours === 0 && minutes === 0) {
    return `${seconds}s`;
  }
  return `${hours}h ${minutes}m ${seconds}s`;
};
export const timeLeft = (endDate: Date) => {
  return Math.max(0, new Date(endDate).getTime() - new Date().getTime());
};
export const formatMoney = (amount: number) => {
  if (amount >= 100000 && amount < 10000000) {
    return `${amount / 1000000}L`;
  } else if (amount >= 10000 && amount < 100000) {
    return `${amount / 1000}K`;
  } else if (amount >= 10000000) {
    return `${amount / 10000000}cr`;
  }
  return `${amount}`;
};
