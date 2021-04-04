import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';
import getValidationsErrors from '../../utils/getValidationsErrors';

interface ProfileFormData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          // .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Campo obrigatório')
            .min(6, 'Minimo 6 caracteres'),
          // password: Yup.string().when('old_password', {
          //   is: val => !!val.length,
          //   then: Yup.string()
          //     .required('Campo obrigatório')
          //     .min(6, 'Minimo 6 caracteres'),
          //   otherwise: Yup.string(),
          // }),
          // password_confirmation: Yup.string()
          //   .when('old_password', {
          //     is: val => !!val.length,
          //     then: Yup.string().required('Campo obrigatório'),
          //     otherwise: Yup.string(),
          //   })
          //   .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // const formData = data;

        // if (!formData.old_password) {
        //   delete formData.old_password;
        //   delete formData.password;
        //   delete formData.password_confirmation;
        // }

        const responseBody = {
          id: user.id,
          name: data.name,
          login: `${data.email}`,
          password: data.password,
        };

        console.log(responseBody);

        const response = await api.put(`/user`, responseBody);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'As informações do seu perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente',
        });
      }
    },
    [addToast, history, updateUser, user.id],
  );

  // const handleAvatarChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files) {
  //       const data = new FormData();

  //       data.append('avatar', e.target.files[0]);

  //       api.patch('/users/avatar', data).then(response => {
  //         updateUser(response.data);

  //         addToast({
  //           type: 'success',
  //           title: 'Avatar atualizado!',
  //         });
  //       });
  //     }
  //   },
  //   [addToast, updateUser],
  // );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input
                type="file"
                id="avatar"
                onChange={(): void => console.log('change avatar')}
              />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          {/* <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          /> */}

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
