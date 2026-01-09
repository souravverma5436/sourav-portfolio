import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const CustomTabBar = () => {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);
  const currentRoute = state?.routes[state.index]?.name;

  const tabs = [
    { name: 'Home', icon: '🏠' },
    { name: 'About', icon: '👨‍💻' },
    { name: 'Portfolio', icon: '🎨' },
    { name: 'Services', icon: '⚡' },
    { name: 'Contact', icon: '📧' },
  ];

  return (
    <View style={styles.container}>
      <BlurView intensity={80} style={styles.blurContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          style={styles.gradient}
        >
          <View style={styles.tabContainer}>
            {tabs.map((tab, index) => {
              const isActive = currentRoute === tab.name;
              
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={[styles.tab, isActive && styles.activeTab]}
                  onPress={() => navigation.navigate(tab.name)}
                  activeOpacity={0.7}
                >
                  {isActive && (
                    <LinearGradient
                      colors={['#6366f1', '#8b5cf6']}
                      style={styles.activeBackground}
                    />
                  )}
                  <Text style={styles.icon}>{tab.icon}</Text>
                  <Text style={[styles.label, isActive && styles.activeLabel]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  blurContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 20,
    position: 'relative',
  },
  activeTab: {
    // Active styles handled by gradient background
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Inter-Medium',
  },
  activeLabel: {
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
  },
});

export default CustomTabBar;