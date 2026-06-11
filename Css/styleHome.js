import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    width: '100%',
    height: 64,
    backgroundColor: '#5E22F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#5E22F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  burgerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },

  burgerLine: {
    width: 24,
    height: 3,
    backgroundColor: '#FFF',
    borderRadius: 2,
    marginVertical: 2.5,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitleText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,42,0.4)',
  },

  blurBackground: {
    position: 'absolute',
    width,
    height,
  },

  drawerContainer: {
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#5E22F3',
    paddingTop: 48,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
  },

  drawerBody: {
    flex: 1,
  },

  drawerItem: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },

  drawerItemActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderLeftWidth: 4,
    borderColor: '#FFF',
  },

  drawerItemText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontWeight: '600',
  },

  drawerItemTextActive: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  drawerFooter: {
    marginBottom: 40,
  },

  logoutBtn: {
    height: 48,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  mainWrapper: {
    justifyContent: 'space-between',
    gap: 16,
  },

  cardAnimatedContainer: {},

  cardTouch: {
    minHeight: 145,
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },

  cardDecorativeCircle: {
    position: 'absolute',
    right: -15,
    bottom: -15,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#9583FD',
    opacity: 0.04,
  },

  cardLeftContent: {
    flex: 1,
    paddingRight: 20,
  },

  cardTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  cardSubtitle: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 10,
    lineHeight: 18,
  },

  cardBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  cardBadgeText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});