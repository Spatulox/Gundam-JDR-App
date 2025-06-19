import * as ImagePicker from 'expo-image-picker';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  onChange: (uri: string | null) => void;
};

export function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) onChange(result.assets[0].uri);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 6 }}>
        <Text style={{ color: '#6c47ff', fontWeight: 'bold' }}>
          {value ? 'Change image' : `Upload ${label}`}
        </Text>
      </TouchableOpacity>
      {value ? (
        <Image source={{ uri: value }} style={{ width: 90, height: 60, borderRadius: 8 }} />
      ) : null}
    </View>
  );
}