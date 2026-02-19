import { db } from '../services/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { products } from '../data/products';

export const uploadProductsToFirebase = async () => {
  try {
    console.log("🚀 Début de la synchronisation Davantech...");
    
    const promises = products.map(product => {
      // On utilise l'ID du fichier products.js comme ID de document Firestore
      const productRef = doc(db, "products", product.id.toString());
      return setDoc(productRef, product);
    });

    await Promise.all(promises);
    
    alert("🔥 Bravo Mael ! Ton catalogue est maintenant sur Firebase.");
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    alert("C'est la sauce, ça n'a pas marché. Regarde la console.");
  }
};