import { Option, Select } from '@material-tailwind/react';
import { MONTH_IDS, MONTHS } from 'constants/month';
import { FC } from 'react';

interface SelectMonthProps {
  selectMonthId: number;
  disabled?: boolean;
  setSelectMonthId?: React.Dispatch<React.SetStateAction<number>>;
}

const SelectMonth: FC<SelectMonthProps> = ({ selectMonthId, setSelectMonthId, disabled = false }): JSX.Element => {
  return (
    <Select
      label='Месяц'
      disabled={disabled}
      onChange={event => {
        setSelectMonthId && setSelectMonthId(Number(event));
      }}
      value={String(selectMonthId)}
    >
      {MONTH_IDS.map(id => {
        return (
          <Option value={String(id)} key={id}>
            {MONTHS[id]}
          </Option>
        );
      })}
    </Select>
  );
};
export default SelectMonth;
