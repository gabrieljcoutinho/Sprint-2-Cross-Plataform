import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');
const isMobile = width < 900;

const columns = [
  { key: 'backlog', label: 'BACKLOG', color: '#7C3AED' },
  { key: 'fazer', label: 'FAZER', color: '#EF4444' },
  { key: 'doing', label: 'FAZENDO', color: '#F59E0B' },
  { key: 'completed', label: 'COMPLETO', color: '#10B981' },
];

const initialData = {
  backlog: [],
  fazer: [],
  doing: [],
  completed: [],
};

export default function KanbanContent() {
  const [board, setBoard] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columnLayouts = useRef({});

  const [modalData, setModalData] = useState({
    id: null,
    title: '',
    description: '',
    colKey: '',
  });

  const openModal = (colKey, card = null) => {
    if (card) {
      setModalData({
        id: card.id,
        title: card.title,
        description: card.description,
        colKey,
      });
    } else {
      setModalData({
        id: null,
        title: '',
        description: '',
        colKey,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!modalData.title.trim()) return;

    if (modalData.id) {
      setBoard((prev) => ({
        ...prev,
        [modalData.colKey]: prev[modalData.colKey].map((card) =>
          card.id === modalData.id
            ? {
                ...card,
                title: modalData.title,
                description: modalData.description,
              }
            : card
        ),
      }));
    } else {
      const newCard = {
        id: Date.now(),
        title: modalData.title.trim(),
        description: modalData.description,
      };

      setBoard((prev) => ({
        ...prev,
        [modalData.colKey]: [...prev[modalData.colKey], newCard],
      }));
    }
    setIsModalOpen(false);
  };

  const handleRemove = (colKey, cardId) => {
    setBoard((prev) => ({
      ...prev,
      [colKey]: prev[colKey].filter((c) => c.id !== cardId),
    }));
  };

  const moveCard = (from, to, card) => {
    if (from === to) return;

    setBoard((prev) => ({
      ...prev,
      [from]: prev[from].filter((c) => c.id !== card.id),
      [to]: [...prev[to], card],
    }));
  };

  const measureColumn = (key, node) => {
    if (node) {
      setTimeout(() => {
        node.measure((x, y, width, height, pageX, pageY) => {
          columnLayouts.current[key] = {
            left: pageX,
            right: pageX + width,
            top: pageY,
            bottom: pageY + height,
          };
        });
      }, 150);
    }
  };

  const DraggableCard = ({ card, columnKey, columnColor }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const [isDragging, setIsDragging] = useState(false);

    // Armazena persistente o valor atual do Pan para evitar resets ao reiniciar o arrasto
    const offsetRef = useRef({ x: 0, y: 0 });

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 2 || Math.abs(g.dy) > 2,

      onPanResponderGrant: () => {
        setIsDragging(true);
        pan.setOffset({
          x: offsetRef.current.x,
          y: offsetRef.current.y,
        });
        pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (evt, gestureState) => {
        // Salva os offsets acumulados antes do cálculo
        offsetRef.current.x += gestureState.dx;
        offsetRef.current.y += gestureState.dy;

        pan.flattenOffset();

        const dropX = gestureState.absoluteX || evt.nativeEvent.pageX;
        const dropY = gestureState.absoluteY || evt.nativeEvent.pageY;

        let targetColumn = columnKey;

        // Varredura de colisão precisa
        for (const key of Object.keys(columnLayouts.current)) {
          const layout = columnLayouts.current[key];
          if (layout) {
            if (isMobile) {
              const insideY = dropY >= layout.top && dropY <= layout.bottom;
              if (insideY) {
                targetColumn = key;
                break;
              }
            } else {
              const insideX = dropX >= layout.left && dropX <= layout.right;
              if (insideX) {
                targetColumn = key;
                break;
              }
            }
          }
        }

        // Reseta referências locais do card se ele trocar de coluna
        if (targetColumn !== columnKey) {
          offsetRef.current = { x: 0, y: 0 };
          pan.setValue({ x: 0, y: 0 });
          moveCard(columnKey, targetColumn, card);
          setIsDragging(false);
        } else {
          // Se soltar na mesma coluna, ele volta de forma suave para a vaga original
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            offsetRef.current = { x: 0, y: 0 };
            setIsDragging(false);
          });
        }
      },
    });

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            transform: pan.getTranslateTransform(),
            zIndex: isDragging ? 999999 : 1,
            elevation: isDragging ? 999999 : 1,
            opacity: isDragging ? 0.9 : 1,
          },
        ]}
      >
        <View style={styles.cardTop}>
          <View style={[styles.cardStatus, { backgroundColor: columnColor }]} />
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => openModal(columnKey, card)}>
              <Text style={styles.edit}>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemove(columnKey, card.id)}>
              <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.cardTitle}>{card.title}</Text>

        {!!card.description && (
          <Text style={styles.cardDesc}>{card.description}</Text>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>


      <ScrollView
        horizontal={!isMobile}
        contentContainerStyle={styles.board}
      >
        {columns.map((col) => (
          <View
            key={col.key}
            ref={(node) => measureColumn(col.key, node)}
            style={styles.column}
          >
            <View style={styles.columnHeader}>
              <Text style={styles.columnTitle}>{col.label}</Text>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: col.color }]}
                onPress={() => openModal(col.key)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
              {board[col.key].map((card) => (
                <DraggableCard
                  key={card.id}
                  card={card}
                  columnKey={col.key}
                  columnColor={col.color}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={isModalOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {modalData.id ? 'Editar' : 'Nova tarefa'}
            </Text>

            <TextInput
              placeholder="Título"
              value={modalData.title}
              onChangeText={(t) => setModalData({ ...modalData, title: t })}
              style={styles.input}
            />

            <TextInput
              placeholder="Descrição"
              value={modalData.description}
              onChangeText={(t) => setModalData({ ...modalData, description: t })}
              style={styles.textarea}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalOpen(false)}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={{ color: '#fff' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  mainTitle: { fontSize: 30, fontWeight: '900', paddingHorizontal: 20 },
  board: { padding: 20, gap: 20 },
  column: {
    width: isMobile ? width - 40 : 340,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 16,
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  columnTitle: { fontSize: 16, fontWeight: '800' },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 22 },
  cardsContainer: { minHeight: 120 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardStatus: { width: 10, height: 10, borderRadius: 999 },
  actions: { flexDirection: 'row', gap: 10 },
  edit: { color: '#6366F1', fontSize: 18 },
  delete: { color: '#EF4444', fontSize: 18 },
  cardTitle: { fontWeight: '800', marginTop: 8 },
  cardDesc: { color: '#6B7280', marginTop: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 10 },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  textarea: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    height: 100,
    marginBottom: 10,
  },
  modalButtons: { flexDirection: 'row', gap: 10 },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
  },
});