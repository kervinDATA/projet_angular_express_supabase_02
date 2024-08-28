require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const cors = require('cors');

// Utiliser les variables d'environnement avec dotenv
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Autoriser toutes les origines ou spécifiquement localhost:4200
app.use(cors({ origin: 'http://localhost:4200' }));

// Middleware pour parser les requêtes JSON
app.use(express.json());


// Route par défaut
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Route pour récupérer les données
app.get('/data', async (req, res) => {
    try {
      // Récupérer les paramètres de pagination depuis la requête (si fournis)
      const start = parseInt(req.query.start) || 0;  // Point de départ de la pagination (par défaut, 0)
      const end = parseInt(req.query.end) || 99;     // Fin de la plage (par défaut, 100 lignes)
      const name = req.query.name || '';             // Terme de recherche pour le nom
      const neighbourhood = req.query.area || '';    // Filtre par quartier
      const roomType = req.query.room_type || '';    // Filtre par type de chambre
      const min_price = req.query.min_price ? parseFloat(req.query.min_price) : null;
      const max_price = req.query.max_price ? parseFloat(req.query.max_price) : null;

      // Préparer la requête de base avec pagination
      let query = supabase
        .from('listings')
        .select('*')
        .range(start, end);  // Utiliser la plage pour récupérer les données paginées
      
      // Si un terme de recherche 'name' est fourni, ajouter un filtre
      if (name) {
        query = query.ilike('host_name', `%${name}%`);  // Filtrer par nom, insensible à la casse
      }

      // Si un quartier (area) est fourni, ajouter un filtre
      if (neighbourhood) {
        query = query.eq('area', neighbourhood);  // Filtrer par quartier
      }

      // Si un type de chambre (room_type) est fourni, ajouter un filtre
      if (roomType) {
        query = query.eq('room_type', roomType);  // Filtrer par room_type
      }

      // Appliquer le filtre de prix minimum
      if (min_price !== null) {
        query = query.gte('numeric_price', min_price);  // Filtrer les listings dont le prix est supérieur ou égal à min_price
      }

      // Appliquer le filtre de prix maximum
      if (max_price !== null) {
        query = query.lte('numeric_price', max_price);  // Filtrer les listings dont le prix est inférieur ou égal à max_price
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Erreur Supabase:', error); // Log l'erreur de Supabase
        return res.status(500).json({ message: 'Erreur lors de la récupération des données', error });
      }
  
      if (data.length === 0) {
        return res.status(404).send('Aucune donnée trouvée.');
      }
  
      res.json(data);
    } catch (err) {
      console.error('Erreur serveur:', err); // Log une erreur serveur générale
      res.status(500).json({ message: 'Erreur interne du serveur', error: err });
    }
  });

  // Route POST pour ajouter un nouveau listing
  app.post('/data', async (req, res) => {
    const newListing = req.body;
  
    try {
      // Insertion du nouveau listing
      const { data: insertData, error: insertError } = await supabase
        .from('listings')
        .insert([newListing], { returning: 'representation' });  // Utiliser 'representation' pour renvoyer les données insérées
  
      if (insertError) {
        console.error('Erreur lors de l\'ajout du listing:', insertError);
        return res.status(500).json({ message: 'Erreur lors de l\'ajout du listing.', error: insertError });
      }
  
      // Si 'data' est toujours null après insertion, récupérons-le manuellement via select()
      if (insertData === null) {
        const { data: selectData, error: selectError } = await supabase
          .from('listings')
          .select('*')
          .eq('listing_id', newListing.listing_id);  // Requête pour récupérer les données en utilisant l'ID du listing
  
        if (selectError) {
          console.error('Erreur lors de la récupération des données:', selectError);
          return res.status(500).json({ message: 'Erreur lors de la récupération des données.', error: selectError });
        }
  
        res.status(201).json({ message: 'Listing ajouté avec succès', data: selectData });
      } else {
        res.status(201).json({ message: 'Listing ajouté avec succès', data: insertData });
      }
    } catch (err) {
      console.error('Erreur serveur:', err);
      res.status(500).json({ message: 'Erreur interne du serveur', error: err });
    }
  });
  

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
