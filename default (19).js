import React from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Colors from '@/constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          props.multiline ? styles.multiline : null,
        ]}
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: Colors.error,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;