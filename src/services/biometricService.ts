import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

const rnBiometrics = new ReactNativeBiometrics();

export const isBiometricAvailable = async (): Promise<boolean> => {
  try {
    const { available } = await rnBiometrics.isSensorAvailable();
    return available;
  } catch (error) {
    console.error('Error checking biometric availability:', error);
    return false;
  }
};

export const authenticateWithBiometric = async (
  reason: string = 'Authenticate to access Task Manager Pro',
): Promise<boolean> => {
  try {
    const { success } = await rnBiometrics.simplePrompt({ promptMessage: reason });
    return success;
  } catch (error) {
    console.error('Biometric authentication error:', error);
    return false;
  }
};

export const setupBiometricAuth = async (): Promise<boolean> => {
  try {
    const available = await isBiometricAvailable();
    if (!available) {
      return false;
    }

    const { success } = await rnBiometrics.createKeys();
    return success;
  } catch (error) {
    console.error('Error setting up biometric auth:', error);
    return false;
  }
};

export const storeSecureData = async (key: string, value: string): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword(key, value);
    return true;
  } catch (error) {
    console.error('Error storing secure data:', error);
    return false;
  }
};

export const getSecureData = async (key: string): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username === key) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving secure data:', error);
    return null;
  }
};
