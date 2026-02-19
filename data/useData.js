import { db } from '../services/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { products } from './products';

export const seedDatabase = async () => {
  try {
    const promises = products.map(product => {
      // On utilise l'id du JS comme ID du document Firestore
      return setDoc(doc(db, "products", product.id), product);
    });
    await Promise.all(promises);
    console.log("🔥 Catalogue Davantech synchronisé avec Firestore !");
  } catch (e) {
    console.error("Erreur synchro :", e);
  }
};