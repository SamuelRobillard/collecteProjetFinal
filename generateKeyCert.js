import fs from "fs";
import { execSync } from "child_process";

const files = ["key.pem", "csr.pem", "cert.pem"];
const missing = files.filter((f) => !fs.existsSync(f));

if (missing.length > 0) {
  console.log("🔐 Certificats manquants, génération en cours...");

  try {
    // Génère une clé privée
    execSync(`openssl genrsa -out key.pem 2048`, { stdio: "inherit" });

    // Génère une requête de signature de certificat (CSR)
    execSync(`openssl req -new -key key.pem -out csr.pem -subj "/CN=localhost"`, { stdio: "inherit" });

    // Génère un certificat auto-signé valide 365 jours
    execSync(`openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`, { stdio: "inherit" });

    console.log("✅ Certificats générés avec succès !");
  } catch (err) {
    console.error("❌ Erreur lors de la génération des certificats :", err.message);
    process.exit(1);
  }
} else {
  console.log("✅ Certificats déjà présents, rien à faire.");
}
