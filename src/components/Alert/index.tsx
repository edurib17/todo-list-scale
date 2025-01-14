import { useEffect, useState } from 'react';
import { IAlertProps } from './types';
import { AlertWrapper } from './styles';

export default function Alert({ color, text, duration }: IAlertProps): JSX.Element | null {
  const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibleAlert(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisibleAlert) {
    return null;
  }

  return <AlertWrapper color={color}>{text}</AlertWrapper>;
}
