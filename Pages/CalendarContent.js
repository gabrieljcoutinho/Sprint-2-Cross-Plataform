import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CalendarContent() {

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

  const [selectedDay, setSelectedDay] = useState(null);

  const [tasks, setTasks] = useState({});

  const [editing, setEditing] = useState(false);

  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('low');

  const months = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ];

  const days = [
    'DOM',
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SÁB',
  ];

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const calendar = [];

  let week = [];

  for (let i = 0; i < firstDay; i++) {
    week.push('');
  }

  for (let day = 1; day <= daysInMonth; day++) {

    week.push(day);

    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  while (week.length < 7 && week.length !== 0) {
    week.push('');
  }

  if (week.length > 0) {
    calendar.push(week);
  }

  const handleSelectDay = (day) => {

    if (!day) return;

    setSelectedDay(day);

    setTaskText('');
    setPriority('low');

    setEditing(false);
  };

  const saveTask = () => {

    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      priority,
    };

    setTasks((prev) => ({
      ...prev,

      [selectedDay]: prev[selectedDay]
        ? [...prev[selectedDay], newTask]
        : [newTask],
    }));

    setTaskText('');
    setPriority('low');

    setEditing(false);
  };

  const getPriorityColor = (type) => {

    switch (type) {

      case 'low':
        return '#22C55E';

      case 'medium':
        return '#FACC15';

      case 'high':
        return '#EF4444';

      default:
        return '#22C55E';
    }
  };

  // PEGA A MAIOR PRIORIDADE DO DIA
  const getHighestPriority = (taskList) => {

    if (!taskList || taskList.length === 0) {
      return null;
    }

    const hasHigh = taskList.some(
      (task) => task.priority === 'high'
    );

    if (hasHigh) {
      return 'high';
    }

    const hasMedium = taskList.some(
      (task) => task.priority === 'medium'
    );

    if (hasMedium) {
      return 'medium';
    }

    return 'low';
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}
      contentContainerStyle={{
        paddingTop: 40,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}
      <View
        style={{
          paddingBottom: 25,
          paddingHorizontal: 22,
        }}
      >

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >

          <Text
            style={{
              color: '#111',
              fontSize: 34,
              fontWeight: '900',
            }}
          >
            {months[currentMonth]}
          </Text>

          <Text
            style={{
              color: '#777',
              fontSize: 24,
              fontWeight: '700',
              marginLeft: 10,
            }}
          >
            {currentYear}
          </Text>

        </View>
      </View>

      {/* CALENDÁRIO */}
      <View
        style={{
          marginHorizontal: 18,
          backgroundColor: '#FFF',
          borderRadius: 30,
          padding: 16,
        }}
      >

        {/* DIAS */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
          }}
        >

          {days.map((day, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >

              <Text
                style={{
                  color: '#999',
                  fontWeight: '700',
                  fontSize: width < 400 ? 10 : 11,
                }}
              >
                {day}
              </Text>

            </View>
          ))}
        </View>

        {/* SEMANAS */}
        {calendar.map((week, weekIndex) => (

          <View
            key={weekIndex}
            style={{
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >

            {week.map((day, dayIndex) => {

              const isToday = day === today;

              const taskList = tasks[day];

              const highestPriority =
                getHighestPriority(taskList);

              return (
                <TouchableOpacity
                  key={dayIndex}
                  activeOpacity={0.8}
                  onPress={() => handleSelectDay(day)}
                  style={{
                    flex: 1,
                    height: 62,
                    marginHorizontal: 3,
                    borderRadius: 16,

                    justifyContent: 'center',
                    alignItems: 'center',

                    backgroundColor:
                      day === ''
                        ? '#F3F3F3'
                        : isToday
                        ? '#6C2BFF'
                        : '#F7F7F7',
                  }}
                >

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',

                      color: isToday
                        ? '#FFF'
                        : '#222',
                    }}
                  >
                    {day}
                  </Text>

                  {/* BOLINHA PRIORIDADE */}
                  {taskList && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        marginTop: 5,

                        backgroundColor:
                          getPriorityColor(
                            highestPriority
                          ),
                      }}
                    />
                  )}

                </TouchableOpacity>
              );
            })}

          </View>
        ))}

      </View>

      {/* CARD DO DIA */}
      {selectedDay && (

        <View
          style={{
            marginHorizontal: 18,
            marginTop: 24,
          }}
        >

          <Text
            style={{
              fontSize: 34,
              fontWeight: '900',
              color: '#111',
              marginBottom: 16,
            }}
          >
            Dia {selectedDay}
          </Text>

          <View
            style={{
              backgroundColor: '#FFF',
              borderRadius: 25,
              padding: 20,
            }}
          >

            {/* SEM TAREFA */}
            {(!tasks[selectedDay] ||
              tasks[selectedDay].length === 0) &&
              !editing && (

              <TouchableOpacity
                onPress={() => setEditing(true)}
              >

                <Text
                  style={{
                    fontSize: 16,
                    color: '#666',
                  }}
                >
                  Clique aqui para escrever
                  alguma tarefa
                </Text>

              </TouchableOpacity>
            )}

            {/* LISTA DE TAREFAS */}
            {tasks[selectedDay] &&
              tasks[selectedDay].length > 0 && (

              <>
                {tasks[selectedDay].map((task) => (

                  <View
                    key={task.id}
                    style={{
                      backgroundColor: '#F8F8F8',

                      borderRadius: 18,

                      padding: 16,

                      marginBottom: 14,

                      borderLeftWidth: 6,

                      borderLeftColor:
                        getPriorityColor(
                          task.priority
                        ),
                    }}
                  >

                    <Text
                      style={{
                        fontSize: 16,
                        color: '#111',
                        lineHeight: 24,
                      }}
                    >
                      {task.text}
                    </Text>

                  </View>
                ))}

                <TouchableOpacity
                  onPress={() => setEditing(true)}
                  style={{
                    marginTop: 5,
                  }}
                >

                  <Text
                    style={{
                      color: '#6C2BFF',
                      fontWeight: '800',
                    }}
                  >
                    + Adicionar outra tarefa
                  </Text>

                </TouchableOpacity>
              </>
            )}

            {/* FORM */}
            {editing && (
              <>

                <TextInput
                  placeholder="Digite sua tarefa..."
                  value={taskText}
                  onChangeText={setTaskText}
                  multiline
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: 18,
                    padding: 18,
                    minHeight: 140,
                    textAlignVertical: 'top',
                  }}
                />

                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    fontWeight: '800',
                    fontSize: 16,
                  }}
                >
                  Prioridade
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}
                >

                  {[
                    {
                      label: 'Baixa',
                      value: 'low',
                      color: '#22C55E',
                    },

                    {
                      label: 'Média',
                      value: 'medium',
                      color: '#FACC15',
                    },

                    {
                      label: 'Máxima',
                      value: 'high',
                      color: '#EF4444',
                    },
                  ].map((item) => (

                    <TouchableOpacity
                      key={item.value}
                      onPress={() =>
                        setPriority(item.value)
                      }
                      style={{
                        flex: 1,

                        borderWidth: 2,

                        borderColor:
                          priority === item.value
                            ? item.color
                            : '#E5E5E5',

                        borderRadius: 18,

                        padding: 14,

                        alignItems: 'center',
                      }}
                    >

                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,

                          backgroundColor:
                            item.color,

                          marginBottom: 8,
                        }}
                      />

                      <Text>
                        {item.label}
                      </Text>

                    </TouchableOpacity>
                  ))}

                </View>

                <TouchableOpacity
                  onPress={saveTask}
                  style={{
                    backgroundColor: '#6C2BFF',

                    marginTop: 20,

                    borderRadius: 18,

                    paddingVertical: 16,

                    alignItems: 'center',
                  }}
                >

                  <Text
                    style={{
                      color: '#FFF',
                      fontWeight: '800',
                    }}
                  >
                    SALVAR TAREFA
                  </Text>

                </TouchableOpacity>

              </>
            )}

          </View>
        </View>
      )}

    </ScrollView>
  );
}