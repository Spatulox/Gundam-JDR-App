import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { ProjectCreate } from '../../screens/ProjectScreen';
import { modalStyles } from '../../styles/modalStyles';
import { FieldType, Form, Field } from '../Form/Form';

type Props = {
  visible: boolean,
  onClose: () => void,
  onCreate: (project: ProjectCreate) => void,
};

const fields: Field[] = [
  { name: 'title', label: 'Title', type: FieldType.text, required: true },
  { name: 'description', label: 'Description', type: FieldType.textarea, required: true },
  { name: 'type', label: 'Vous êtes', type: FieldType.select, value:[{value:"master", label:"MJ"}, {value:"player", label:"Joueur"}], required: true },
  { name: 'image', label: 'Project Image', type: FieldType.image },
];

type FormData = {
  title: string;
  description: string;
  image?: string;
};

export default function CreateProjectModal({ visible, onClose, onCreate }: Props) {
  const [formData, setFormData] = useState<FormData>({ title: '', description: '', image: undefined });

  const handleSubmit = () => {
    onCreate(formData); // image est déjà incluse dans formData
    setFormData({ title: '', description: '', image: undefined });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Form
        title="Create a New Project"
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={onClose}
        showClose={true}
        showCancel={true}
        submitLabel="Create"
      />
    </Modal>
  );
}