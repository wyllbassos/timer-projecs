import { DaysTasksProps } from './DayRegisters/index';

export const dataTest: DaysTasksProps[] = [
  {
    day: 'Hoje',
    tasks: [
      {
        id: 1,
        task:
          'ABC - limpar cookies numa coluna muito grande deve mostrar elipsis -  limpar cookies numa coluna muito grande deve mostrar elipsis -  limpar cookies numa coluna muito grande deve mostrar elipsis',
        link: 'http://wwww.wswork.com.br',
        project: {
          name: '15Pras2',
          color: 'orange',
          client: 'WS Work',
          clientColor: 'green',
        },
        date: '31/03/2021',
        timeBegin: '10:20',
        timeEnd: '11:15',
        duration: '00:55',
      },
      {
        id: 2,
        task: 'DEF - não recebe email',
        link: 'https://www.wswork.com.br',
        date: '31/03/2021',
        timeBegin: '09:20',
        timeEnd: '10:20',
        duration: '01:00',
      },
    ],
  },
  {
    day: '28 de Março - Domingo',
    tasks: [
      {
        id: 3,
        task: 'ABC - limpar cookies',
        link: 'https://www.wswork.com.br/market',
        project: {
          name: 'OnbomTomDom',
          color: 'purple',
          client: 'WS Work',
          clientColor: 'green',
        },
        date: '28/03/2021',
        timeBegin: '10:20',
        timeEnd: '11:15',
        duration: '00:55',
      },
      {
        id: 4,
        task: 'DEF - não recebe email',
        link: null,
        timeBegin: '09:20',
        date: '28/03/2021',
        timeEnd: null,
        duration: '01:00',
      },
    ],
  },
  {
    day: '27 de março - Sábado',
    tasks: [
      {
        id: 5,
        task: 'ABC - limpar cookies',
        link: 'https://www.wswork.com.br/market',
        date: '27/03/2021',
        timeBegin: '10:20',
        timeEnd: '11:15',
        duration: '00:55',
      },
      {
        id: 6,
        task: 'DEF - não recebe email',
        link: 'https://www.wswork.com.br',
        date: '27/03/2021',
        timeBegin: '09:20',
        timeEnd: '10:20',
        duration: '01:00',
      },
    ],
  },
];
