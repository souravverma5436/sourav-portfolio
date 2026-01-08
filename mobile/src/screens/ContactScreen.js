import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const services = [
    'Logo Design',
    'Branding',
    'Social Media Creatives',
    'Posters & Ads',
    'Other'
  ];

  const contactMethods = [
    {
      title: 'Design Portfolio',
      subtitle: '@sv_desizns',
      description: 'Check out my latest design work',
      link: 'https://instagram.com/sv_desizns',
      icon: '🎨',
      colors: ['#6366f1', '#8b5cf6']
    },
    {
      title: 'Personal Profile',
      subtitle: '@its_sverma',
      description: 'Connect with me personally',
      link: 'https://instagram.com/its_sverma',
      icon: '👋',
      colors: ['#8b5cf6', '#06b6d4']
    },
    {
      title: 'Email Me',
      subtitle: 'souravverma5436@gmail.com',
      description: 'Send me a direct email',
      link: 'mailto:souravverma5436@gmail.com',
      icon: '📧',
      colors: ['#06b6d4', '#6366f1']
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // In a real app, you would send this to your backend
    Alert.alert(
      'Success', 
      'Message sent successfully! I\'ll get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({
              name: '',
              email: '',
              service: '',
              message: ''
            });
          }
        }
      ]
    );
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Let's Work Together</Text>
        <Text style={styles.subtitle}>
          Ready to bring your vision to life? Get in touch and let's create something amazing
        </Text>
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          style={styles.formGradient}
        >
          <Text style={styles.formTitle}>Send Me a Message</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Your full name"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="your.email@example.com"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Service Needed *</Text>
            <View style={styles.serviceButtons}>
              {services.map((service) => (
                <TouchableOpacity
                  key={service}
                  style={[
                    styles.serviceButton,
                    formData.service === service && styles.serviceButtonActive
                  ]}
                  onPress={() => handleInputChange('service', service)}
                >
                  <Text style={[
                    styles.serviceButtonText,
                    formData.service === service && styles.serviceButtonTextActive
                  ]}>
                    {service}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.message}
              onChangeText={(value) => handleInputChange('message', value)}
              placeholder="Tell me about your project..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.submitGradient}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Contact Methods */}
      <View style={styles.contactMethodsContainer}>
        <Text style={styles.sectionTitle}>Other Ways to Connect</Text>
        
        {contactMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactMethodCard}
            onPress={() => openLink(method.link)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.contactMethodGradient}
            >
              <View style={styles.contactMethodContent}>
                <LinearGradient
                  colors={method.colors}
                  style={styles.contactMethodIcon}
                >
                  <Text style={styles.contactMethodEmoji}>{method.icon}</Text>
                </LinearGradient>
                
                <View style={styles.contactMethodText}>
                  <Text style={styles.contactMethodTitle}>{method.title}</Text>
                  <Text style={styles.contactMethodSubtitle}>{method.subtitle}</Text>
                  <Text style={styles.contactMethodDescription}>{method.description}</Text>
                </View>
                
                <Text style={styles.contactMethodArrow}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Response Time */}
      <View style={styles.responseTimeContainer}>
        <Text style={styles.responseTimeText}>
          ⚡ I typically respond within 24 hours
        </Text>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formGradient: {
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  formTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 15,
    color: '#ffffff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  serviceButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  serviceButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  serviceButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  serviceButtonTextActive: {
    color: '#ffffff',
  },
  submitButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
  },
  submitGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  contactMethodsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactMethodCard: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  contactMethodGradient: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  contactMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  contactMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactMethodEmoji: {
    fontSize: 20,
  },
  contactMethodText: {
    flex: 1,
  },
  contactMethodTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  contactMethodSubtitle: {
    fontSize: 14,
    color: '#6366f1',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  contactMethodDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  contactMethodArrow: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
  },
  responseTimeContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  responseTimeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 120,
  },
});

export default ContactScreen;