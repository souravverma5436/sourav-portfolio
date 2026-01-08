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

const ServicesScreen = () => {
  const services = [
    {
      id: 1,
      title: 'Logo Design',
      description: 'Create memorable and impactful logos that represent your brand identity perfectly',
      features: ['Custom Logo Design', 'Multiple Concepts', 'Vector Files', 'Brand Guidelines'],
      price: 'Starting at $299',
      icon: '🎨',
      colors: ['#6366f1', '#8b5cf6']
    },
    {
      id: 2,
      title: 'Branding',
      description: 'Complete brand identity solutions including logo, colors, typography, and guidelines',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Business Cards'],
      price: 'Starting at $799',
      icon: '🏢',
      colors: ['#8b5cf6', '#06b6d4']
    },
    {
      id: 3,
      title: 'Social Media Creatives',
      description: 'Eye-catching social media graphics that boost engagement and brand awareness',
      features: ['Instagram Posts', 'Story Templates', 'Facebook Covers', 'LinkedIn Graphics'],
      price: 'Starting at $199',
      icon: '📱',
      colors: ['#06b6d4', '#6366f1']
    },
    {
      id: 4,
      title: 'Posters & Ads',
      description: 'Compelling poster designs and advertisements that capture attention and drive action',
      features: ['Event Posters', 'Print Ads', 'Digital Banners', 'Promotional Materials'],
      price: 'Starting at $149',
      icon: '📢',
      colors: ['#6366f1', '#8b5cf6']
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Services</Text>
        <Text style={styles.subtitle}>
          Professional design services to elevate your brand
        </Text>
      </View>

      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <View key={service.id} style={styles.serviceCard}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.cardGradient}
            >
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              
              <View style={styles.featuresContainer}>
                {service.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <View style={styles.featureDot} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.serviceFooter}>
                <Text style={styles.servicePrice}>{service.price}</Text>
                <TouchableOpacity style={styles.getStartedButton} activeOpacity={0.8}>
                  <LinearGradient
                    colors={service.colors}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Get Started</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        ))}
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Start Your Project?</Text>
        <Text style={styles.ctaSubtitle}>
          Let's discuss your design needs and create something amazing together
        </Text>
        
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Start a Project</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  servicesContainer: {
    paddingHorizontal: 20,
  },
  serviceCard: {
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  serviceIcon: {
    fontSize: 40,
    marginBottom: 15,
    textAlign: 'center',
  },
  serviceTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    backgroundColor: '#6366f1',
    borderRadius: 3,
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
  },
  getStartedButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  ctaButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  bottomSpacing: {
    height: 120,
  },
});

export default ServicesScreen;