import { Option, Select } from '@material-tailwind/react';
import { MONTH_IDS, MONTHS } from 'constants/month';
import { FC } from 'react';

interface SelectMonthProps {
  selectMonthId: number;
  setSelectMonthId: React.Dispatch<React.SetStateAction<number>>;
}

const SelectMonth: FC<SelectMonthProps> = ({ selectMonthId, setSelectMonthId }): JSX.Element => {
    return (
      <Select
        label='Месяц'
        value={MONTHS[selectMonthId]}>
        {
          MONTH_IDS.map(id => {
            return (
              <Option value={String(selectMonthId)}>
                {MONTHS[id]}
              </Option>
            );
          })
        }
      </Select>
    );
  }
;

export default SelectMonth;
