import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom"
import {Person} from "../model";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useEffect} from "react";
import * as yup from 'yup'


const schema = yup.object({
  name: yup.string().required().matches(/^[a-zA-Z]{1}/),
  'hair_color': yup.string().required(),
  gender: yup.string().required(),
  'height': yup.string().required()
})

type PersonForm = Pick<Person, 'name' | 'hair_color' | 'gender' | 'height'>

const PersonPage = () => {
    const { id } = useParams();
    const { handleSubmit, register, setValue, formState } = useForm<PersonForm>({
      resolver: yupResolver(schema)
    });

    const { data, isLoading, isSuccess } = useQuery<Person>({
        queryKey: [id],
        queryFn: () => {
            return fetch(`https://swapi.dev/api/people/${id}/`).then(response => response.json())
        }
    })


    useEffect(() => {
      if(isSuccess){
        setValue('gender', data.gender);
        setValue('height', data.height);
        setValue('hair_color', data.hair_color);
        setValue('name', data.name);
      }
    }, [isSuccess, data, setValue]);

    if (isLoading) {
        return (
          <progress className="progress is-small is-primary" max="100"></progress>
        );
    }

    const onSubmit = (value: PersonForm) => console.log(value);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input {...register('name')} />
          { formState.errors.name && <p>Le champ est obligatoire </p>}
        </label>

        <label>
          Hair Color
          <select {...register('hair_color')}>
            <option value="blond">blond</option>
            <option value="dark">dark</option>
            <option value="pink">Pink</option>
          </select>
        </label>
        <label>
          Male:
          <input type="radio" value="male" {...register('gender')} />
        </label>
        <label>
          Female:
          <input type="radio" value="female" {...register('gender')} />
        </label>

        <label>
          height:
          <input type="number" {...register('height')} />
        </label>

        <button type="submit">Valider</button>
      </form>
    )
}

export default PersonPage