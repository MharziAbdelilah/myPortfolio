import { db } from './config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'testimonials';

export const testimonialService = {
  // Get all testimonials from Firebase
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting testimonials:', error);
      return [];
    }
  },

  // Add new testimonial to Firebase
  async add(testimonial) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...testimonial,
        timestamp: new Date()
      });
      return {
        id: docRef.id,
        ...testimonial
      };
    } catch (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    }
  }
};
