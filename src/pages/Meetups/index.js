import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, subDays, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, DateNavigation, DateText } from './styles';

export default function Meetups() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: { date },
      });
      console.tron.log(response.data);
      setMeetups(response.data);
    }
    loadMeetups();
  }, [date]);

  function handlePreviousDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <DateNavigation>
        <Icon
          name="chevron-left"
          size={44}
          color="#fff"
          onPress={() => handlePreviousDay()}
        />
        <DateText>{format(date, "dd 'de' MMMM", { locale: ptBR })}</DateText>
        <Icon
          name="chevron-right"
          size={44}
          color="#fff"
          onPress={() => handleNextDay()}
        />
      </DateNavigation>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
