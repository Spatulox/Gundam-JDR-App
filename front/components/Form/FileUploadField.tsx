import * as DocumentPicker from 'expo-document-picker';
import { View, TouchableOpacity, Text } from 'react-native';

type FileUploadFieldProps = {
  label: string;
  value?: { uri: string; name: string; mimeType: string } | null;
  onChange: (file: { uri: string; name: string; mimeType: string } | null) => void;
};

export function FileUploadField({ label, value, onChange }: FileUploadFieldProps) {
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      onChange({
        uri: asset.uri,
        name: asset.name,
        mimeType: asset.mimeType ?? '',
      });
    }

  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={pickFile} style={{ marginBottom: 6 }}>
        <Text style={{ color: '#6c47ff', fontWeight: 'bold' }}>
          {value ? 'Change file' : `Upload ${label}`}
        </Text>
      </TouchableOpacity>
      {value ? (
        <View style={{ backgroundColor: '#f3f4f7', borderRadius: 6, padding: 8 }}>
          <Text numberOfLines={1} style={{ color: '#23272f' }}>{value.name}</Text>
          <Text style={{ color: '#7a7f8c', fontSize: 12 }}>{value.mimeType}</Text>
        </View>
      ) : null}
    </View>
  );
}
