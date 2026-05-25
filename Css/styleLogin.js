import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  logoArea: {
    marginBottom: 56,
    alignItems: 'center',
  },

  logoImage: {
    width: 200,
    height: 60,
  },

  form: {
    width: '100%',
  },

  typeSelectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  typeButtonActive: {
    backgroundColor: '#7C3AED',
  },

  typeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },

  typeButtonTextActive: {
    color: '#FFFFFF',
  },

  inputWrapper: {
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    position: 'relative',
  },

  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
    minWidth: 52,
  },

  inputField: {
    flex: 1,
    color: '#111827',
    fontSize: 15,
    padding: 0,
  },

  eyeBtnContainer: {
    position: 'absolute',
    right: 14,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeBtn: {
    fontSize: 18,
    color: '#7C3AED',
  },

  loginBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 28,
  },

  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerText: {
    color: '#6B7280',
    fontSize: 14,
    marginRight: 4,
  },

  registerLink: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '700',
  },
});