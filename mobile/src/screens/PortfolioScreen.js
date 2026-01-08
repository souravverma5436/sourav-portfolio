import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PortfolioScreen = () => {
  const projects = [
    {
      id: 1,
      title: 'Modern Tech Logo',
      category: 'Logo Design',
      description: 'Clean and modern logo design for a tech startup',
    },
    {
      id: 2,
      title: 'Restaurant Branding',
      category: 'Branding',
      description: 'Complete brand identity for a premium restaurant',
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      category: 'Social Media',
      description: 'Engaging social media graphics for fashion brand',
    },
    {
      id: 4,
      title: 'Fitness App Logo',
      category: 'Logo Design',
      description: 'Dynamic logo design for fitness application',
    },
    {
      id: 5,
      title: 'Coffee Shop Identity',
      category: 'Branding',
      description: 'Warm and inviting brand identity for coffee shop',
    },
    {
      id: 6,
      title: 'Instagram Stories',
      category: 'Social Media',
      description: 'Creative Instagram story templates',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Portfolio</Text>
        <Text style={styles.subtitle}>
          Explore my creative journey through various design projects
        </Text>
      </View>

      <View style={styles.projectsGrid}>
        {projects.map((project, index) => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#6366f1', '#8b5cf6', '#06b6d4']}
              style={styles.projectImage}
            >
              <Text style={styles.projectNumber}>{project.id}</Text>
            </LinearGradient>
            
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectCategory}>{project.category}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  projectsGrid: {
    paddingHorizontal: 20,
  },
  projectCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
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
  projectCategory: {
    fontSize: 14,
    color: '#6366f1',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 120,
  },
});

export default PortfolioScreen;