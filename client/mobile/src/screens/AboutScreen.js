import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>About Me</Text>
        <Text style={styles.subtitle}>
          Passionate graphic designer with a love for creating visual stories
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.profileImage}
          >
            <Text style={styles.profileInitials}>SV</Text>
          </LinearGradient>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Creative Designer & Visual Storyteller</Text>
          
          <Text style={styles.paragraph}>
            Hello! I'm Sourav Verma, a passionate graphic designer with over 3 years of experience 
            in creating compelling visual narratives. I specialize in brand identity, logo design, 
            and social media creatives that help businesses stand out.
          </Text>

          <Text style={styles.paragraph}>
            My design philosophy centers around the belief that great design should not only look 
            beautiful but also communicate effectively. I work closely with clients to understand 
            their vision and translate it into impactful visual solutions.
          </Text>
        </View>

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          
          {[
            { name: 'Logo Design', level: 95 },
            { name: 'Branding', level: 90 },
            { name: 'Social Media Design', level: 88 },
            { name: 'Print Design', level: 85 },
          ].map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillLevel}>{skill.level}%</Text>
              </View>
              <View style={styles.skillBar}>
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6']}
                  style={[styles.skillProgress, { width: `${skill.level}%` }]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  textSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  skillsSection: {
    marginBottom: 30,
  },
  skillItem: {
    marginBottom: 20,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  skillLevel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366f1',
  },
  skillBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    borderRadius: 3,
  },
  bottomSpacing: {
    height: 120,
  },
});

export default AboutScreen;