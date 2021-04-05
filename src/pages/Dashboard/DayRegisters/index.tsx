import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Tag, Space, Button, Dropdown, Menu, Modal } from 'antd';
// import { isToday, format, parseISO, isAfter, startOfDay } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
  FiLink,
  FiEdit3,
  FiCopy,
  FiDelete,
  FiChevronRight,
  FiPauseCircle,
  FiMoreVertical,
} from 'react-icons/fi';
import { Container, Title, TaskLine } from './styles';
import TimerForm from '../TimerForm';

const RegMenu = ({ handleEdit }: any) => (
  <Menu>
    <Menu.Item key="1" onClick={handleEdit}>
      <FiEdit3 /> Editar
    </Menu.Item>
    <Menu.Item key="2">
      <FiCopy /> Duplicar
    </Menu.Item>
    <Menu.Item key="3" style={{ color: 'red' }}>
      <FiDelete /> Excluir
    </Menu.Item>
  </Menu>
);

interface ProjectProps {
  name: string;
  color: string;
  client: string;
  clientColor: string;
}

interface TaskProps {
  id: number;
  task: string;
  link: string | null;
  project?: ProjectProps;
  date: string;
  timeBegin: string;
  timeEnd: string | null;
  duration: string;
}

interface DayRegistersProps {
  registers: {
    day: string;
    tasks: TaskProps[];
  };
}

const DayRegisters: React.FC<DayRegistersProps> = ({
  registers: { day, tasks },
}) => {
  const [modal, setModal] = useState(false);

  const handleEdit = (taskParam: any): void => {
    setModal(true);
    console.log(taskParam);
  };

  return (
    <Container>
      <Modal
        title="Editar"
        centered
        visible={!!modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        width={1000}
      >
        <TimerForm isModal />
      </Modal>

      <Title>{day}</Title>
      <TaskLine>
        <span>Tarefa</span>
        <span>Projeto</span>
        <span>Intervalo</span>
        <span>Duração</span>
        <span>Ações</span>
      </TaskLine>

      {tasks.length &&
        tasks.map(task => (
          <TaskLine key={task.id}>
            {task.link ? (
              <div>
                <a target="_blank" rel="noreferrer" href={task.link}>
                  {task.task}
                </a>{' '}
                <FiLink />
              </div>
            ) : (
              task.task
            )}

            {task.project ? (
              <Tag color={task.project.clientColor}>
                {task.project.client}
                <Tag style={{ margin: '5px' }} color={task.project.color}>
                  {task.project.name}
                </Tag>
              </Tag>
            ) : (
              <span>Sem projeto</span>
            )}

            <span style={!task.timeEnd ? { color: 'red' } : undefined}>
              {`${task.timeBegin} - ${task.timeEnd || ''}`}
            </span>

            <span>{task.duration}</span>

            <Space>
              {task.timeEnd ? (
                <Button type="primary" size="small" icon={<FiChevronRight />} />
              ) : (
                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<FiPauseCircle />}
                />
              )}
              {/* <Button type="primary" size="small" icon={<EditFilled />}>

                    </Button> */}
              <Dropdown
                overlay={<RegMenu handleEdit={() => handleEdit(task)} />}
              >
                <button
                  type="button"
                  className="ant-dropdown-link"
                  style={{
                    border: 'none',
                    background: 'none',
                    color: 'blue',
                    cursor: 'pointer',
                  }}
                  onClick={e => e.preventDefault()}
                >
                  <FiMoreVertical
                    style={{ fontSize: '22px', fontWeight: 'bolder' }}
                  />
                </button>
              </Dropdown>
            </Space>
          </TaskLine>
        ))}
    </Container>
  );
};

export default DayRegisters;
