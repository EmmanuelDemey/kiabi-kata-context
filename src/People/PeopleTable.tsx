import { Person } from "../model";
import { PeopleItem } from "./PeopleItem";

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleTableProps) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Genre</th>
          <th>Année de naissance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {people.map((p, index) => {
          return <PeopleItem person={p} key={index} />;
        })}
      </tbody>
    </table>
  );
};
