import { Person } from "../model";
import styles from "./PeopleItem.module.css";
import {useTranslation} from "react-i18next";

type PeopleItemProps = {
  person: Person;
};

export const PeopleItem = ({ person }: PeopleItemProps) => {
  const { t } = useTranslation()

  const isAlreadyLiked = false
  const like = () => {}
  const dislike = () => {}

  return (
    <tr>
      <td className={styles.personName}>{person.name}</td>
      <td>{person.gender}</td>
      <td>{person.birth_year}</td>
      <td>
        {!isAlreadyLiked && <button onClick={() => like()} type="button"> {t('LIKE')} </button>}  
        {isAlreadyLiked && <button onClick={() =>dislike()} type="button"> {t('DISLIKE')} </button>  }
      </td>
    </tr>
  );
};
