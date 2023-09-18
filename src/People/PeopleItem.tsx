import {usePeopleLike} from "../context";
import { Person } from "../model";
import styles from "./PeopleItem.module.css";
import {useTranslation} from "react-i18next";

type PeopleItemProps = {
  person: Person;
};

export const PeopleItem = ({ person }: PeopleItemProps) => {
  const { t } = useTranslation()

  const {isLiked, like, dislike } = usePeopleLike();

  return (
    <tr>
      <td className={styles.personName}>{person.name}</td>
      <td>{person.gender}</td>
      <td>{person.birth_year}</td>
      <td>
        {!isLiked(person.url) && <button onClick={() => like(person.url)} type="button"> {t('LIKE')} </button>}  
        {isLiked(person.url) && <button onClick={() =>dislike(person.url)} type="button"> {t('DISLIKE')} </button>  }
      </td>
    </tr>
  );
};
