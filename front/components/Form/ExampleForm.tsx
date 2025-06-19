import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Field, FieldType, Form } from './Form'; // <-- adapte le chemin selon ton projet

// Définition des champs du formulaire
const fields: Field[] = [
  { name: 'title', label: 'Title', type: FieldType.text, required: true },
  { name: 'description', label: 'Description', type: FieldType.textarea, required: true },
  {
    name: 'system',
    label: 'System',
    type: FieldType.select,
    required: true,
    value: [
      { label: 'D&D 5th Edition', value: 'dnd5' },
      { label: 'Pathfinder', value: 'pathfinder' },
      { label: 'Custom', value: 'custom' },
    ],
  },
  { name: 'public', label: 'Public Project', type: FieldType.checkbox },
  { name: 'image', label: 'Project Image', type: FieldType.image },
  { name: 'file', label: 'File', type: FieldType.file }
];

export default function ExampleFormScreen() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        system: '',
        public: false,
    });

    const [errors, setErrors] = useState<string[]>([]);

    type FormData = {
        title: string;
        description: string;
        system: string;
        public: boolean;
    };

    const handleSubmit = () => {
        Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
        <Form
            title="Create a New Project"
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onSubmit={handleSubmit}
            submitLabel="Create"
        />
        </View>
    );
}