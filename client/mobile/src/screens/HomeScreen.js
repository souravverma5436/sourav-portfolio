import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const StatCard = ({ title, value, delay = 0 }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 800,
        delay,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.statCard,
          {
            opacity: cardAnim,
            transform: [
              {
                translateY: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          style={styles.statGradient}
        >
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Animated.View
          style={[
            styles.heroContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.greeting}>Hi, I'm</Text>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6', '#06b6d4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nameGradient}
          >
            <Text style={styles.name}>Sourav Verma</Text>
          </LinearGradient>
          <Text style={styles.tagline}>
            Creative Graphic Designer & Visual Storyteller
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Portfolio')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>View Portfolio</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Contact')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Contact Me</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <StatCard title="Projects Completed" value="150+" delay={200} />
          <StatCard title="Happy Clients" value="50+" delay={400} />
          <StatCard title="Years Experience" value="3+" delay={600} />
        </View>
      </View>

      {/* Featured Work Preview */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Work</Text>
        <Text style={styles.sectionSubtitle}>
          Explore some of my recent design projects
        </Text>

        <View style={styles.projectGrid}>
          {[1, 2, 3].map((item, index) => (
            <TouchableOpacity
              key={item}
              style={styles.projectCard}
              onPress={() => navigation.navigate('Portfolio')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.projectImage}
              >
                <Text style={styles.projectNumber}>{item}</Text>
              </LinearGradient>
              <View style={styles.projectInfo}>
                <Text style={styles.projectTitle}>Project {item}</Text>
                <Text style={styles.projectDescription}>
                  Creative design solution
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Portfolio')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>View All Projects</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing for Tab Bar */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  hero: {
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
  },
  nameGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    fontFamily: 'Inter-Regular',
    lineHeight: 26,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
  primaryButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  featuredSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Inter-Regular',
  },
  projectGrid: {
    gap: 20,
    marginBottom: 30,
  },
  projectCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  projectImage: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectNumber: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: 'rgba(255,255,255,0.8)',
  },
  projectInfo: {
    padding: 20,
  },
  projectTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Inter-Regular',
  },
  viewAllButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  bottomSpacing: {
    height: 120,
  },
});

export default HomeScreen;