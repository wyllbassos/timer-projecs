import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderContent, Profile, Content } from './styles';

import logoImg from '../../assets/logo.jpg';
import TimerForm from './TimerForm';
import DayRegisters from './DayRegisters';
import { dataTest } from './dataTest';

const emptyTime = { m: null, s: null };

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Ben vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <TimerForm />
        {dataTest.map(data => (
          <DayRegisters key={data.day} registers={data} />
        ))}
      </Content>
    </Container>
  );
};

export default Dashboard;
