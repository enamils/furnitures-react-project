-- Script SQL pour corriger le problème d'authentification
-- À exécuter dans Supabase Dashboard > SQL Editor

-- 1. Confirmer tous les utilisateurs non confirmés
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;

-- 2. Vérifier les utilisateurs
SELECT 
  id, 
  email, 
  email_confirmed_at, 
  created_at
FROM auth.users
ORDER BY created_at DESC;
