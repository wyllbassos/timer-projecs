import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Row,
  Input,
  Select,
  DatePicker,
  Space,
  TimePicker,
  Button,
} from 'antd';
// import { isToday, format, parseISO, isAfter, startOfDay } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import moment, { Moment } from 'moment';
import { FiCheck } from 'react-icons/fi';
import {
  Container,
  TaskDescriptionContainer,
  TaskDateTimeContainer,
} from './styles';

const emptyTime = { m: null, s: null };
const emptyTask = {
  id: null,
  task: '',
  info: '',
  project: { name: '' },
  date: { m: moment(), s: moment().format('DD/MM/YYYY') },
  timeBegin: { m: moment(), s: moment().format('HH:mm') },
  timeEnd: emptyTime,
};

export interface TaskTimerProps {
  id: number | null;
  task: string;
  info: string;
  project: { name: string };
  date: DateTimeProps;
  timeBegin: DateTimeProps;
  timeEnd: DateTimeProps;
}

interface DateTimeProps {
  m: Moment | null;
  s: string | null;
}

interface TimerFormProps {
  taskTimer?: TaskTimerProps;
  isModal?: boolean;
}

const TimerForm: React.FC<TimerFormProps> = ({ taskTimer, isModal }) => {
  const { OptGroup, Option } = Select;

  const [task, setTask] = useState<TaskTimerProps>(emptyTask);

  useEffect(() => {
    setTask(taskTimer || emptyTask);
  }, [taskTimer]);

  // const handleChange = (
  //   name: 'task' | 'info' | 'project' | 'timeBegin',
  //   value?: string,
  //   dateTimeValue?: DateTimeProps,
  // ): void => {
  //   const newTask = { ...task };

  //   if (value) {
  //     if (name === 'task' || name === 'info') {
  //       newTask[name] = value;
  //     } else {
  //       newTask.project = { name: value };
  //     }
  //   } else if (dateTimeValue) {
  //     newTask.timeBegin = dateTimeValue;
  //   }

  //   setTask(newTask);
  // };

  const handleSave = useCallback((): void => {
    console.log('save: ');
    console.log('task: ', task.task);
    console.log('info: ', task.info);
    console.log('project: ', task.project);
    console.log('date: ', task.date.s);
    console.log('begin: ', task.timeBegin.s);
    console.log('end: ', task.timeEnd.s);

    // inputTask.current.clear();
    setTask(emptyTask);
  }, [task]);

  return (
    <Container>
      <TaskDescriptionContainer isModal={!!isModal}>
        <Input
          value={task.task}
          name="task"
          onChange={({ target }): void => {
            setTask(current => ({
              ...current,
              task: target.value,
            }));
          }}
          size="large"
          placeholder="O quê vocẽ fez?"
        />
        <Input
          value={task.info}
          name="info"
          onChange={({ target }): void => {
            setTask(current => ({
              ...current,
              info: target.value,
            }));
          }}
          size="large"
          placeholder="Mais informações, link da tarefa, etc"
        />
        <Select
          size="large"
          showSearch
          placeholder="Projeto"
          filterOption={(input, option): boolean => {
            return (
              (option &&
                option.label &&
                option.label
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0) ||
              (option &&
                option.options &&
                option.options.some(
                  (element: any): boolean =>
                    element.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0,
                ))
            );
          }}
          filterSort={(optionA, optionB): number => {
            // optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            return 0;
          }}
          value={task.project.name}
          onChange={(v): void => {
            setTask(current => ({
              ...current,
              project: { name: v.toString() },
            }));
          }}
        >
          <OptGroup label="Privacy" style={{ color: 'blue' }}>
            <Option value="Privacy" style={{ color: 'green' }}>
              Privacy
            </Option>
            <Option value="Copel" style={{ color: 'orange' }}>
              Copel
            </Option>
            <Option value="Data-Finder">Data-Finder</Option>
          </OptGroup>
          <OptGroup label="Maven">
            <Option value="Correio do Povo" style={{ color: 'green' }}>
              Correio do Povo
            </Option>
          </OptGroup>
        </Select>
      </TaskDescriptionContainer>
      <TaskDateTimeContainer>
        <DatePicker
          onChange={(m, s): void => {
            setTask(current => ({ ...current, date: { m, s } }));
          }}
          value={task.date.m}
          placeholder="Data"
          size="large"
          format="DD/MM/YYYY"
        />
        <TimePicker
          size="large"
          format="HH:mm"
          placeholder="Inicio"
          onChange={(m, s): void => {
            setTask(current => ({ ...current, timeBegin: { m, s } }));
          }}
          value={task.timeBegin.m}
        />
        <TimePicker
          size="large"
          format="HH:mm"
          placeholder="Fim"
          onChange={(m, s): void => {
            setTask(current => ({ ...current, timeEnd: { m, s } }));
          }}
          value={task.timeEnd.m}
        />
        {/* <TimePicker.RangePicker onChange={(p1, p2) => console.log("p2", p2)} placeholder={["Inicio", "Fim"]} size="large" format="HH:mm" /> */}
        <Button
          type="primary"
          shape="circle"
          icon={<FiCheck />}
          onClick={handleSave}
        />
      </TaskDateTimeContainer>
    </Container>
  );
};

export default TimerForm;
