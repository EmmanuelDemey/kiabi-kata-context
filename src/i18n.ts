import i18n from "i18next";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";


const englishDictionnary = {
    LIKE: "I like",
    DISLIKE: "I dislike",
    NBLIKEDPEOPLE: "{count, plural, =0 {no friend} =1 {one friend} other {# friends}}",
}
type Translation = typeof englishDictionnary;

type Resources = {
    en: {
        translation: Translation
    },
    fr: {
        translation: Translation
    }
};

const resources: Resources = {
  en: {
      translation: englishDictionnary,
  },
  fr: {
      translation: {
        LIKE: "J'aime",
        DISLIKE: "Je n'aime pas",
        NBLIKEDPEOPLE: "{count, plural, =0 {aucun ami} =1 {un ami} other {# amis}}",
      },
  },
};

i18n
  .use(initReactI18next)
  .use(new ICU())
  .init({
    resources,
    lng: "en",
  });

export default i18n;