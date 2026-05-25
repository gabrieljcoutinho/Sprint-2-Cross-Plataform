import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: 14,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#5B21F3',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
    fontSize: 13,
  },
  link: {
    color: '#00BFFF',
    fontSize: 13,
    marginLeft: 4,
  },
});