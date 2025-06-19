import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  /*Platform,
  Picker,*/
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ImageUploadField } from './ImageUploadField';
import { FileUploadField } from './FileUploadField';
import { modalStyles } from '../../styles/modalStyles';
import { globalStyles } from '../../styles/globalStyle';

export enum FieldType {
    text = 'text',
    textarea = 'textarea',
    select = 'select',
    checkbox = 'checkbox',
    radio = 'radio',
    password = 'password',
    email = 'email',
    image = "image",
    file = "file"
}

export type Field = {
  id?: string;
  name: string;
  label: string;
  type: FieldType;
  value?: { value: string; label: string }[] | string[];
  required?: boolean;
  hide?: boolean;
};

type SwitchButton = {
  text: string;
  buttonLabel: string;
  onPress: () => void;
};

/*type FormProps<T extends Record<string, any>> = {
  title: string;
  fields: Field[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  errors?: string[];
  onSubmit: () => void;
  switchButtons?: SwitchButton[];
  submitLabel: string;
  children?: React.ReactNode;
};*/

type FormProps<T extends Record<string, any>> = {
  title: string;
  fields: Field[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  errors?: string[];
  onSubmit: () => void;
  onCancel?: () => void;           // <--- Ajoute ceci
  showClose?: boolean;             // <--- Affiche la croix
  showCancel?: boolean;            // <--- Affiche le bouton Cancel
  switchButtons?: SwitchButton[];
  submitLabel: string;
  children?: React.ReactNode;
};


export function Form<T extends Record<string, any>>({
  title,
  fields,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  showClose = false,
  showCancel = false,
  switchButtons = [],
  submitLabel,
  children,
}: FormProps<T>) {
  const [errors, setErrors] = useState<string[]>([]);

  function handleFormSubmit() {
    const missingFields = fields.filter(
      f =>
        f.required &&
        (
          formData[f.name] === undefined ||
          formData[f.name] === '' ||
          (f.type === FieldType.checkbox && !formData[f.name])
        )
    );
    if (missingFields.length > 0) {
      setErrors([`Please fill in: ${missingFields.map(f => f.label).join(', ')}`]);
      return;
    }
    setErrors([]);
    onSubmit();
  }

  function renderField(field: Field) {
    if (field.hide) return null;

    switch (field.type) {
      case FieldType.textarea:
        return (
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={formData[field.name]}
            onChangeText={text => setFormData(prev => ({ ...prev, [field.name]: text }))}
            placeholder={field.label}
            multiline
          />
        );
      case FieldType.select:
        return (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData[field.name]}
              onValueChange={value => setFormData(prev => ({ ...prev, [field.name]: value }))}
              style={styles.picker}
            >
              <Picker.Item label={`Select ${field.label}...`} value="" />
              {(field.value || []).map(option =>
                typeof option === 'string' ? (
                  <Picker.Item key={option} label={option} value={option} />
                ) : (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                )
              )}
            </Picker>
          </View>
        );
      case FieldType.checkbox:
        return (
          <View style={styles.checkboxRow}>
            <Switch
              value={!!formData[field.name]}
              onValueChange={val => setFormData(prev => ({ ...prev, [field.name]: val }))}
            />
            <Text style={styles.checkboxLabel}>{field.label}</Text>
          </View>
        );
      case FieldType.radio:
        return (
          <View style={styles.radioGroup}>
            <Text style={styles.label}>{field.label}</Text>
            {(field.value || []).map(option => (
              <TouchableOpacity
                key={typeof option === 'string' ? option : option.value}
                style={styles.radioOption}
                onPress={() =>
                  setFormData(prev => ({
                    ...prev,
                    [field.name]: typeof option === 'string' ? option : option.value,
                  }))
                }
              >
                <View style={[
                  styles.radioCircle,
                  {
                    borderColor: formData[field.name] === (typeof option === 'string' ? option : option.value)
                      ? '#6c47ff'
                      : '#ccc',
                  },
                ]}>
                  {formData[field.name] === (typeof option === 'string' ? option : option.value) && (
                    <View style={styles.radioCircleSelected} />
                  )}
                </View>
                <Text>
                  {typeof option === 'string' ? option : option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case FieldType.image:
        return (
            <ImageUploadField
            label={field.label}
            value={formData[field.name]}
            onChange={uri => setFormData(prev => ({ ...prev, [field.name]: uri }))}
            />
        );
      case FieldType.file:
        return (
             <FileUploadField
               label={field.label}
               value={formData[field.name]}
               onChange={file => setFormData(prev => ({ ...prev, [field.name]: file }))}
             />
            );
      default:
        // text, password, email
        return (
          <TextInput
            style={styles.input}
            value={formData[field.name]}
            onChangeText={text => setFormData(prev => ({ ...prev, [field.name]: text }))}
            placeholder={field.label}
            secureTextEntry={field.type === FieldType.password}
            keyboardType={field.type === FieldType.email ? 'email-address' : 'default'}
          />
        );
    }
  }

  return (
    <View style={modalStyles.overlay}>
    <View style={styles.card}>
      {/* CROIX DE FERMETURE */}
      {showClose && onCancel && (
        <TouchableOpacity style={styles.closeX} onPress={onCancel}>
          <Text style={{ fontSize: 22, color: '#b0b5c3' }}>×</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {errors && errors.length > 0 && (
        <View style={styles.errorBox}>
          {errors.map((err, idx) => (
            <Text key={idx} style={styles.errorText}>⚠️ {err}</Text>
          ))}
        </View>
      )}
      <View>
        {fields.map(field => (
          <View key={field.name} style={styles.formGroup}>
            {field.type !== FieldType.checkbox && field.type !== FieldType.radio && (
              <Text style={styles.label}>{field.label}</Text>
            )}
            {renderField(field)}
          </View>
        ))}
      </View>
      <View style={styles.actionsRow}>
        {/* BOUTON CANCEL */}
        {showCancel && onCancel && (
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={{ color: '#7a7f8c' }}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.submitBtn} onPress={handleFormSubmit}>
          <Text style={styles.submitBtnText}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>
      {children}
      {switchButtons.length > 0 && (
        <View style={styles.switchBox}>
          {switchButtons.map((btn, idx) => (
            <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Text>{btn.text} </Text>
              <TouchableOpacity onPress={btn.onPress}>
                <Text style={styles.switchBtn}>{btn.buttonLabel}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        ...globalStyles.card,
        margin: 16,
        alignSelf: 'center',
        width: '95%',
        maxWidth: 500,
        padding: 24,
    },
    closeX: {
        position: 'absolute',
        top: 12,
        right: 16,
        zIndex: 2,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 10,
    },
    cancelBtn: {
        ...globalStyles.buttonSecondary
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 18,
        textAlign: 'center',
    },
    errorBox: {
        backgroundColor: '#fee',
        borderRadius: 6,
        padding: 8,
        marginBottom: 12,
    },
    errorText: {
        color: '#b00020',
        fontSize: 14,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#f7f8fa',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 2,
    },
    submitBtn: {
        ...globalStyles.buttonPrimary
    },
    submitBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    switchBox: {
        marginTop: 12,
        alignItems: 'center',
    },
    switchBtn: {
        color: '#6c47ff',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 2,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 15,
    },
    pickerWrapper: {
        backgroundColor: '#f7f8fa',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 44,
        width: '100%',
    },
    radioGroup: {
        marginTop: 4,
        marginBottom: 8,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6c47ff',
    },
})