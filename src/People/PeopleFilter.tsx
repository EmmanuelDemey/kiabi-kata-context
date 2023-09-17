import {PropsWithChildren} from "react";

type PeopleFilterProps = {
    onFilter: (filter: string) => void;
    value: string
}
export const PeopleFilter = ({ onFilter, children, value }: PeopleFilterProps & PropsWithChildren) => {
  return (
    <div className="field">
      <div className="control">
        { children}
        <input value={value} className="input is-info" type="text" onChange={e => onFilter(e.target.value)}/>
      </div>
    </div>
  );
};
