import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Divider, Button, Avatar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { theme, themeMode, setThemeMode, isDark } = useTheme();

  const handleThemeChange = (mode: 'light' | 'dark' | 'auto') => {
    setThemeMode(mode);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.profileSection}>
        <Avatar.Image
          size={80}
          source={{ uri: user?.photoURL || 'https://via.placeholder.com/80' }}
        />
        <List.Item
          title={user?.displayName}
          description={user?.email}
          style={styles.profileInfo}
        />
      </View>

      <Divider />

      <List.Section>
        <List.Subheader>{t('settings.theme')}</List.Subheader>
        <List.Item
          title="Light"
          left={props => <List.Icon {...props} icon="white-balance-sunny" />}
          right={() => (
            <Switch value={themeMode === 'light'} onValueChange={() => handleThemeChange('light')} />
          )}
        />
        <List.Item
          title="Dark"
          left={props => <List.Icon {...props} icon="weather-night" />}
          right={() => (
            <Switch value={themeMode === 'dark'} onValueChange={() => handleThemeChange('dark')} />
          )}
        />
        <List.Item
          title="Auto"
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch value={themeMode === 'auto'} onValueChange={() => handleThemeChange('auto')} />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t('settings.language')}</List.Subheader>
        <List.Item
          title="English"
          left={props => <List.Icon {...props} icon="translate" />}
          right={() => (
            <Switch
              value={i18n.language === 'en'}
              onValueChange={() => handleLanguageChange('en')}
            />
          )}
        />
        <List.Item
          title="Română"
          left={props => <List.Icon {...props} icon="translate" />}
          right={() => (
            <Switch
              value={i18n.language === 'ro'}
              onValueChange={() => handleLanguageChange('ro')}
            />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t('settings.notifications')}</List.Subheader>
        <List.Item
          title="Task Reminders"
          description="Get notified about upcoming tasks"
          left={props => <List.Icon {...props} icon="bell" />}
          right={() => <Switch value={user?.preferences.notifications.taskReminders} />}
        />
        <List.Item
          title="Deadline Alerts"
          description="Receive alerts for approaching deadlines"
          left={props => <List.Icon {...props} icon="alarm" />}
          right={() => <Switch value={user?.preferences.notifications.deadlineAlerts} />}
        />
        <List.Item
          title="Team Updates"
          description="Stay updated on team activities"
          left={props => <List.Icon {...props} icon="account-group" />}
          right={() => <Switch value={user?.preferences.notifications.teamUpdates} />}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t('settings.security')}</List.Subheader>
        <List.Item
          title="Biometric Lock"
          description="Use fingerprint or face ID"
          left={props => <List.Icon {...props} icon="fingerprint" />}
          right={() => <Switch value={user?.preferences.biometricEnabled} />}
        />
        <List.Item
          title="Change Password"
          left={props => <List.Icon {...props} icon="lock" />}
          onPress={() => navigation.navigate('ChangePassword')}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>{t('settings.integrations')}</List.Subheader>
        <List.Item
          title="Google Calendar"
          description="Sync tasks with Google Calendar"
          left={props => <List.Icon {...props} icon="google" />}
          onPress={() => navigation.navigate('Integrations', { type: 'google_calendar' })}
        />
        <List.Item
          title="Discord"
          description="Connect with Discord"
          left={props => <List.Icon {...props} icon="discord" />}
          onPress={() => navigation.navigate('Integrations', { type: 'discord' })}
        />
      </List.Section>

      <Divider />

      <View style={styles.signOutSection}>
        <Button mode="outlined" onPress={handleSignOut} icon="logout" style={styles.signOutButton}>
          {t('auth.signOut')}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  signOutSection: {
    padding: 16,
    marginBottom: 32,
  },
  signOutButton: {
    borderColor: '#f44336',
  },
});
