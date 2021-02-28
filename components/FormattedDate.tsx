import { parseISO, format } from 'date-fns';

const FormattedDate: React.FC<{ dateString: string }> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'yyyy/LL/d')}</time>;
};

export default FormattedDate;
